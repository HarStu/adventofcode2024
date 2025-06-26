import { readFileSync } from 'fs'

const input = readFileSync('./day4_input.txt', "utf8")

const xword = input.split('\n').map(row => row.split(''))

function checkXMas(xword: string[][]) {
  let matches = 0
  const validStrs = ['MMSS', 'SSMM', 'MSMS', 'SMSM']
  for (let x = 1; x < xword[0]!.length - 1; x++) {
    for (let y = 1; y < xword.length - 1; y++) {
      if (xword[y]![x]! == 'A') {
        // build an 'observation string
        const obvStr = "".concat(xword[y - 1]![x - 1]!).concat(xword[y - 1]![x + 1]!).concat(xword[y + 1]![x - 1]!).concat(xword[y + 1]![x + 1]!)
        if (validStrs.includes(obvStr)) {
          console.log(`AT [${y}][${x}], we have observation string: ${obvStr}`)
          matches++
        }
      }
    }
  }
  return matches
}

function checkXWord(xword: string[][], target: string) {
  const targetArr = genTarget(target)
  let matches = 0
  // check both targets (forward and reversed)
  for (const target of targetArr) {
    // check horizontal
    for (const row of xword) {
      //console.log(`ROW: ${row}`)
      for (let i = 0; i <= row.length - target.length; i++) {
        if (arrEq(target, row.slice(i, i + target.length))) {
          matches++
        }
      }
    }
    // check vertical
    let counter = 1
    for (let x = 0; x < xword[0]!.length; x++) {
      for (let y = 0; y <= xword.length - target.length; y++) {
        // construct the word
        const word = []
        for (let i = 0; i < target.length; i++) {
          word.push(xword[i + y]![x]!)
        }
        console.log(`WORD: ${word} TARGET: ${target} COUNTER: ${counter}, MATCH: ${arrEq(target, word)}`)
        if (arrEq(target, word)) {
          matches++
        }
        counter++
      }
    }
    console.log(`counter: ${counter}`)

    // check diagonal negative-slope
    for (let x = 0; x <= xword[0]!.length - target.length; x++) {
      for (let y = 0; y <= xword.length - target.length; y++) {
        // construct the word
        const word = []
        for (let i = 0; i < target.length; i++) {
          word.push(xword[i + y]![i + x]!)
        }
        console.log(`WORD: ${word} TARGET: ${target}`)
        if (arrEq(target, word)) {
          matches++
        }
      }
    }

    // check diagonal positive-slope
    for (let x = 0; x <= xword[0]!.length - target.length; x++) {
      for (let y = target.length - 1; y < xword.length; y++) {
        // construct the word
        const word = []
        for (let i = 0; i < target.length; i++) {
          word.push(xword[y - i]![i + x]!)
        }
        console.log(`WORD: ${word} TARGET: ${target}`)
        if (arrEq(target, word)) {
          matches++
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

console.log(checkXMas(xword))