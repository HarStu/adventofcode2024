import { readFileSync } from 'fs'

const input = readFileSync('./day5_input.txt', "utf8")

const [rulesText, productionText] = input.split('\n\n')

const rules = rulesText?.split('\n').map(rule => rule.split('|'))
const production = productionText?.split('\n').map(row => row.split(','))

const xRulePages = rules?.map((page) => page[0])
const yRulePages = rules?.map((page) => page[1])

// Build a list of immediately-legal pages for production
const legalPages = new Set(xRulePages?.filter((page) => yRulePages?.includes(page)))

// Build a map of unlocks
const mainUnlockMap = new Map<string, string[]>()
for (let rule of rules!) {
  mainUnlockMap.set(rule[1]!, (mainUnlockMap.get(rule[1]!) || []).concat(rule[0]!))
}

console.log(mainUnlockMap)

function part1(production: string[][]) {
  let total = 0

  // build local update map
  for (const row of production) {
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
      if (!preReqs || preReqs.length === 0) {
        seen.add(num)
      } else if ([...preReqs].every(val => seen.has(val))) {
        seen.add(num)
      } else {
        midVal = 0
      }
    }
    total += midVal
  }
  return total
}

console.log(part1(production!))
