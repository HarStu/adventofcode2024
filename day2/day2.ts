import { readFileSync } from 'fs'

const input = readFileSync("./day2_input.txt", 'utf8')

const inputRows = input.split('\n')

function part1() {
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

  return safeCount
}

function part2() {
  let safeCount = 0
  let unsafeCount = 0
  const reports = []
  for (const row of inputRows) {
    reports.push(row.split(" ").map(str => +str))
  }
  for (const report of reports) {
    checkReport(report, true) ? safeCount++ : unsafeCount++
  }
  return safeCount
}

// da: "Dampener Available"
function checkReport(report: number[], da: boolean = false): boolean {
  const asc = report[0]! < report[1]! ? true : false
  for (let i = 1; i < report.length; i++) {
    // excessive value jump problem
    if (Math.abs(report[i - 1]! - report[i]!) > 3) {

      console.log(`${da ? '\t' : ''}Excessive value jump problem on ${report}`)
      if (!da) {
        console.log(`Re-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`Dampener already expended, return false\n`)
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }

    // identical value problem
    if (report[i - 1] === report[i]) {

      console.log(`${da ? '\t' : ''}Identical value problem on ${report}`)
      if (!da) {
        console.log(`Re-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`Dampener already expended, return false\n`)
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }

    // switch direction problem
    if ((asc && (report[i - 1]! > report[i]!)) || !asc && (report[i - 1]! < report[i]!)) {

      console.log(`${da ? '\t' : ''}Switch direction problem on ${report}`)
      if (!da) {
        console.log(`Re-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`Dampener already expended, return false\n`)
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }
  }
  return true
}

// remove index helper function
function rIdx(report: number[], index: number) {
  return [...report.slice(0, index), ...report.slice(index + 1)]
}

console.log(part2())