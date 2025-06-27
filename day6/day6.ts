import { readFileSync } from 'fs'

const input = readFileSync('./day6_input.txt', 'utf8')

const rows = input.split('\n')
const map = rows.map(row => row.split(''))

type Direction = '^' | '>' | 'v' | '<'

type GuardState = {
  dir: Direction,
  x: number,
  y: number,
}

type WorldState = {
  map: string[][],
  guard: GuardState
}

function part1() {
  let world = {
    map: map,
    guard: getGuard(map)
  }

  let guardSteps = 0
  while (world.guard.x >= 0 && world.guard.x < world.map[0].length && world.guard.y >= 0 && world.guard.y < world.map.length) {
    world = updateWorld(world)
    guardSteps++
  }

  // when the guard has exited
  console.log(`Guard took ${guardSteps} steps`)
  let xCount = 0
  for (const y in map) {
    for (const x in map) {
      if (world.map[y][x] === 'X')
        xCount++
    }
  }
  return xCount
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

function updateWorld(world: WorldState): WorldState {
  // Update the current position of the guard to 'X'
  world.map[world.guard.y][world.guard.x] = "X"

  let validMove = false
  while (!validMove) {
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

    if (nextMove[0] < 0 || nextMove[0] >= world.map[0].length || nextMove[1] < 0 || nextMove[1] >= world.map.length) {
      // if the nextMove is taking the guard out-of-limits, update the 
      // guard position and immediately return the world
      world.guard.y = nextMove[0]
      world.guard.x = nextMove[1]
      return world
    } else if (world.map[nextMove[0]][nextMove[1]] !== '#') {
      // if the next move isn't blocked by a #, move is valid
      // update guard pos and set validMove to true to escape the
      // while loop
      world.guard.y = nextMove[0]
      world.guard.x = nextMove[1]
      validMove = true
    } else {
      // else, the guard is in-bounds and blocked
      // so long as we can't find a valid move, the guard 
      // will pivot 90 degrees at a time
      // guard turns
      switch (world.guard.dir) {
        case '^':
          world.guard.dir = '>'
          break
        case '>':
          world.guard.dir = 'v'
          break
        case 'v':
          world.guard.dir = '<'
          break
        case '<':
          world.guard.dir = '^'
          break
        default:
          throw new Error('Invalid guard dir')
      }
    }
  }

  return world
}

console.log(part1())