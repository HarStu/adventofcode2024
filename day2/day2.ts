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

  const brokenList: number[][] = []
  const workingList = []

  const reports = []
  for (const row of inputRows) {
    reports.push(row.split(" ").map(str => +str))
  }
  for (const report of reports) {
    checkReport(report, true) && workingList.push(report)
    checkReport2num(report, true) && brokenList.push(report)
  }

  const errors = workingList.filter((report) => !brokenList.includes(report))
  console.log("\n\n\nCASES WHERE THE BROKEN LIST IS ALL FUCKED UP\n")
  for (const errorReport of errors) {
    checkReport2num(errorReport, true)
  }
  console.log(errors.length)

  // ok so the issue with checkReport2num -- my original approach which aimed to be more elegent --
  // occurs where the first direction is wrong such that removing the first value would solve the
  // problem, but because the 2nd and 3rd entries are picked up as the issue (for violating the 
  // direction established by the first), neither removal actually fixes the issue

  return safeCount
}

function checkReport(report: number[], da: boolean = false): boolean {
  const asc = report[0]! < report[1]! ? true : false

  //console.log(`\n${!da ? '\t2ND-TRY' : '1ST-TRY'} REPORT: ${report}`)

  for (let i = 1; i < report.length; i++) {

    // excessive value jump problem
    const diff = Math.abs(report[i - 1]! - report[i]!)
    if (diff > 3 || diff < 1) {

      console.log(`${!da ? '\t\t' : ''}Bad diff problem on ${report} at ${report[i - 1]},${report[i]}`)
      if (da) {
        console.log(`\tRe-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`\t\tDampener unavailable, return false\n`)
      }

      if (da) {
        let flag = false
        for (let ri = 0; ri < report.length; ri++) {
          if (checkReport(rIdx(report, ri))) {
            return true
          }
        }
        return false
      } else {
        return false
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }

    // switch direction problem
    if ((asc && (report[i - 1]! > report[i]!)) || !asc && (report[i - 1]! < report[i]!)) {

      console.log(`${!da ? '\t\t' : ''}Switch direction problem on ${report} at ${report[i - 1]},${report[i]}`)
      if (da) {
        console.log(`\tRe-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`\t\tDampener unavailable, return false\n`)
      }

      if (da) {
        let flag = false
        for (let ri = 0; ri < report.length; ri++) {
          if (checkReport(rIdx(report, ri))) {
            return true
          }
        }
        return false
      } else {
        return false
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }
  }
  !da && console.log(`\t\t${report} Looks good, return true\n`)
  return true
}

// da: "Dampener Available"
function checkReport2num(report: number[], da: boolean = false): boolean {
  const asc = report[0]! < report[1]! ? true : false

  //console.log(`\n${!da ? '\t2ND-TRY' : '1ST-TRY'} REPORT: ${report}`)

  for (let i = 1; i < report.length; i++) {

    // excessive value jump problem
    const diff = Math.abs(report[i - 1]! - report[i]!)
    if (diff > 3 || diff < 1) {

      console.log(`${!da ? '\t\t' : ''}Bad diff problem on ${report} at ${report[i - 1]},${report[i]}`)
      if (da) {
        console.log(`\tRe-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`\t\tDampener unavailable, return false\n`)
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }

    // switch direction problem
    if ((asc && (report[i - 1]! > report[i]!)) || !asc && (report[i - 1]! < report[i]!)) {

      console.log(`${!da ? '\t\t' : ''}Switch direction problem on ${report} at ${report[i - 1]},${report[i]}`)
      if (da) {
        console.log(`\tRe-running with:`)
        console.log(`\t${rIdx(report, i - 1)}`)
        console.log(`\t${rIdx(report, i)}`)
      } else {
        console.log(`\t\tDampener unavailable, return false\n`)
      }

      // see if we can fix this by expending our dampener to remove i-1 or i
      return da ? (checkReport(rIdx(report, i - 1)) || checkReport(rIdx(report, i))) : false
    }
  }
  !da && console.log(`\t\t${report} Looks good, return true\n`)
  return true
}

// remove index helper function
function rIdx(report: number[], index: number) {
  return [...report.slice(0, index), ...report.slice(index + 1)]
}

console.log(part2())