import { readFileSync } from 'fs'

const input = readFileSync('./day6_input.txt', 'utf8')

const rows = input.split('\n')
const map = rows.map(row => row.split(''))

type Direction = '^' | '>' | 'v' | '<'

type Outcome = 'running' | 'looped' | 'exited'

type GuardState = {
  dir: Direction,
  x: number,
  y: number,
}

type WorldState = {
  map: string[][],
  guard: GuardState,
  status: Outcome,
  prevMoves: Set<string>,
  blockSpots: Set<string>,
}

const nextDir = new Map<Direction, Direction>()
nextDir.set('^', '>')
nextDir.set('>', 'v')
nextDir.set('v', '<')
nextDir.set('<', '^')

function main() {
  // setup the initial state of the world
  const moveHis: Direction[][][] = []
  for (let y = 0; y < map.length; y++) {
    moveHis[y] = []
    for (let x = 0; x < map[0].length; x++) {
      moveHis[y][x] = []
    }
  }

  let world = {
    map: map,
    guard: getGuard(map),
    status: 'running',
    prevMoves: new Set<string>(),
    blockSpots: new Set<string>(),
  } as WorldState

  const finalWorld = runSim(world, true)
  console.log(finalWorld)

}

function runSim(world: WorldState, simulateBlockers: boolean) {

  // world = backFillHistory(world)

  while (world.status === 'running') {
    world = updateWorld(world, simulateBlockers)
  }

  return world
}



function updateWorld(world: WorldState, simulateBlockers: boolean): WorldState {
  // Update the current position of the guard to 'X'
  world.map[world.guard.y][world.guard.x] = "X"

  let moved = false
  while (!moved) {
    // [y, x]
    let nextMove: number[] = []

    switch (world.guard.dir) {
      case '^':
        nextMove = [world.guard.y - 1, world.guard.x]
        break
      case '>':
        nextMove = [world.guard.y, world.guard.x + 1]
        break
      case 'v':
        nextMove = [world.guard.y + 1, world.guard.x]
        break
      case '<':
        nextMove = [world.guard.y, world.guard.x - 1]
        break
      default:
        throw new Error('Invalid guard dir')
    }

    const moveStr = `${nextMove[0]},${nextMove[1]}${world.guard.dir}`

    if (nextMove[0] < 0 || nextMove[0] >= world.map[0].length || nextMove[1] < 0 || nextMove[1] >= world.map.length) {
      // Exit case
      world.guard.y = nextMove[0]
      world.guard.x = nextMove[1]
      world.status = 'exited'
      return world
    } else if (world.map[nextMove[0]][nextMove[1]] === '#') {
      // Blocked case
      world.guard.dir = nextDir.get(world.guard.dir)
    } else if (world.prevMoves.has(moveStr)) {
      // Loop case
      //console.log(`At y:${world.guard.y}, x:${world.guard.x}, dir:${world.guard.dir}, history is ${world.moveHis[world.guard.y][world.guard.x]}`)
      world.status = 'looped'
      return world
    } else {
      // Standard case
      // If we're not already in an extra-blocker sim, see if adding a blocker to our next move causes a halt.
      //  - If so, make the nextMove spot a 'blockspot'
      if (simulateBlockers) {
        const cloneWorld = structuredClone(world)
        cloneWorld.map[nextMove[0]][nextMove[1]] = '#'
        const simWorld = runSim(cloneWorld, false)
        if (simWorld.status === 'looped') {
          world.blockSpots.add(`${nextMove[0]},${nextMove[1]}`)
        }
      }
      // Update the move history of the current tile
      world.prevMoves.add(moveStr)
      // Do normal movement 
      world.guard.y = nextMove[0]
      world.guard.x = nextMove[1]
      moved = true
    }
  }
  return world
}


// find initial location of guard
function getGuard(map: string[][]) {
  for (const y in map) {
    for (const x in map) {
      if (['^', '>', 'v', '<'].includes(map[y][x])) {
        return {
          dir: map[y][x],
          x: Number(x),
          y: Number(y),
        } as GuardState
      }
    }
  }
}

console.log(main())