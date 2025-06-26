import { readFileSync } from 'fs'

const input = readFileSync('./day4_input.txt', "utf8")

const xword = input.split('\n').map(row => row.split(''))

function checkXWord(xword: string[][], target: string) {
  const targetArr = genTarget(target)
  let matches = 0
  // check both targets (forward and reversed)
  for (const target of targetArr) {

    // check horizontal
    for (const row of xword) {
      //console.log(`ROW: ${row}`)
      for (let i = 0; i <= row.length - target.length; i++) {
        console.log(`SLICE ${i}: ${row.slice(i, i + target.length)} vs TARGET: ${target}`)
        if (arrEq(target, row.slice(i, i + target.length))) {
          matches++
          console.log(`SLICE ${i}: ${row.slice(i, i + target.length)} vs TARGET: ${target} AT ${i}`)
        }
      }
    }
  }
  return matches;
}

function genTarget(s: string): string[][] {
  s = s.toUpperCase()
  const t1 = []
  for (const char of s) {
    t1.push(char)
  }
  const t2 = structuredClone(t1).reverse()
  return [t1, t2]
}

function arrEq(arr1: string[], arr2: string[]): boolean {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

console.log(checkXWord(xword, 'xmas'))