import { readFileSync } from 'fs'

const input = readFileSync('./day5_test.txt', "utf8")

const [rulesText, productionText] = input.split('\n\n')

const rules = rulesText?.split('\n').map(rule => rule.split('|'))
const production = productionText?.split('\n').map(row => row.split(','))

// Build a map of unlocks
const mainUnlockMap = new Map<string, string[]>()
for (let rule of rules!) {
  mainUnlockMap.set(rule[1]!, (mainUnlockMap.get(rule[1]!) || []).concat(rule[0]!))
}

console.log(mainUnlockMap)

function part1(production: string[][]) {
  let validTotal = 0
  let correctedTotal = 0

  for (const row of production) {
    // build local update map
    const unlockMap = new Map<string, string[]>()
    for (const num of row) {
      if (mainUnlockMap.get(num)) {
        unlockMap.set(num, mainUnlockMap.get(num)!.filter(val => row.includes(val)))
      }
    }

    // check if rule is valid
    let midVal = Number(row[Math.floor(row.length / 2)])
    const seen = new Set()
    for (let num of row) {
      const preReqs = unlockMap.get(num)
      if (!preReqs) {
        seen.add(num)
      } else if ([...preReqs].every(val => seen.has(val))) {
        seen.add(num)
      } else {
        midVal = 0
        correctedTotal += part2(row, unlockMap)
        break;
      }
    }
    validTotal += midVal
  }
  return [validTotal, correctedTotal]
}


function part2(errRow: string[], unlockMap: Map<string, string[]>): number {
  const newRow = []
  const errSet = new Set(errRow)
  const seen = new Set()
  while (errSet.size !== 0) {
    for (let num of errSet) {
      const preReqs = unlockMap.get(num)
      if (!preReqs || [...preReqs].every(val => seen.has(val))) {
        seen.add(num)
        errSet.delete(num)
        newRow.push(num)
      }
    }
  }
  console.log(`our newRow is ${newRow}`)
  return Number(newRow[Math.floor(newRow.length / 2)])
}

console.log(part1(production!))
