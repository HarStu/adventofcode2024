import { readFileSync } from 'fs'

const input = readFileSync('./day5_test.txt', "utf8")

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
  mainUnlockMap.set(rule[0]!, (mainUnlockMap.get(rule[0]!) || []).concat(rule[1]!))
}

console.log(mainUnlockMap)

function part1(rules: string[][], production: string[][]) {
  let total = 0
  for (const row of production) {
    // Build the ruleSet, lockedSet, unlockedSet, and unlockMap
    const unlockMap = new Map<string, string[]>()
    const lockedNums = new Set()
    for (const rule of rules) {
      if (row.includes(rule[0]!) && row.includes(rule[1]!)) {
        unlockMap.set(rule[0]!, (unlockMap.get(rule[0]!) || []).concat(rule[1]!))
        lockedNums.add(rule[1]!)
      }
    }
    console.log(`For production: ${row}, unlockmap is:`)
    console.log(unlockMap)
    console.log(lockedNums)

    let midVal = Number(row[Math.floor(row.length / 2)])
    for (let num of row) {
      if (lockedNums.has(num)) {
        midVal = 0
      } else if (unlockMap.has(num)) {
        for (const val of unlockMap.get(num)!) {
          lockedNums.delete(val)
        }
      }
    }
    total += midVal
  }
  return total
}

console.log(part1(rules!, production!))