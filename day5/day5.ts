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

function part1(rules: string[][], production: string[][]) {
  let total = 0
  for (const row of production) {
    const unlockMap = new Map<string, string[]>()
    for (const num of row) {
      if (mainUnlockMap.get(num)) {
        unlockMap.set(num, mainUnlockMap.get(num)!.filter(val => row.includes(val)))
      }
    }

    console.log(unlockMap)
    console.log(row)

    let midVal = Number(row[Math.floor(row.length / 2)])
    const seen = new Set()
    for (let num of row) {
      // look up num on the unlockMap
      // if all of the values associated with it are in 'seen',
      // or it's not an entry in the map at all, 
      // add it to 'seen'
      // otherwise, kill the midVal
      const preReqs = unlockMap.get(num)
      console.log(`prereqs of ${num} are: ${preReqs}`)
      if (!preReqs || preReqs.length === 0) {
        seen.add(num)
        console.log(`empty prereqs for ${num}, so we add it to seen. seen is now ${seen}`)
      } else {
        // check if preReqs of num is a subset of seen
        // if it is, continue
        // if it's not, set midVal to zero
        if ([...preReqs].every(val => seen.has(val))) {
          seen.add(num)
        } else {
          midVal = 0
        }
      }
    }
    total += midVal
    console.log('\n\n\n\n')
  }
  return total
}

console.log(part1(rules!, production!))

/*
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
*/

/*
      if (unlockMap.has(num)) {
        for (const val of unlockMap.get(num)!) {
          lockedNums.delete(val)
        }
      }
        */