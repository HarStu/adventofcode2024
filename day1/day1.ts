import { readFileSync } from 'fs'

const input = readFileSync("./day1_input.txt", "utf8")

const inputRows = input.split('\n')
const a = []
const b = []
for (const row of inputRows) {
  //console.log(row)
  const split = row.split(" ").filter(str => str !== "")
  console.log(split)
  a.push(split[0])
  b.push(split[1])
}

const aNums = a.sort().map(str => +str!)
const bNums = b.sort().map(str => +str!)

function part1() {
  let total = 0
  for (let i = a.length - 1; i >= 0; i--) {
    total += Math.abs(aNums.pop()! - bNums.pop()!)
  }
  return total
}

function part2() {
  const appearances = new Map<number, number>()
  for (const num of bNums) {
    appearances.set(num, (appearances.get(num) || 0) + 1)
  }

  const aSim = []
  for (const num of aNums) {
    aSim.push(num * (appearances.get(num) ?? 0))
  }

  const simScore = aSim.reduce((total, cur) => total + cur)
  return simScore
}

console.log(part2())
