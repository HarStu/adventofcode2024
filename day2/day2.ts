import { readFileSync } from 'fs'

const input = readFileSync("./day2_input.txt", 'utf8')

const inputRows = input.split('\n')
let safeCount = 0
for (const row of inputRows) {
  const report = row.split(" ").map(str => +str)

  // if the second report is greater than the first, we're ascending
  // if the second report is less than the first, we're descending 
  // checking the dif moving forward, we'll assuming descending -- 
  // we want the r1-r2 >= 3
  // so if ascending, we want to multiply the diff we find by -1
  const difMul = report[0]! < report[1]! ? -1 : 1
  let unsafeFlag = false
  for (let i = 1; i < report.length; i++) {
    const diff = (report[i - 1]! - (report[i]!)) * difMul
    if (![1, 2, 3].includes(diff)) {
      unsafeFlag = true
    }
  }
  if (!unsafeFlag) {
    safeCount += 1
  }
}

console.log(safeCount)