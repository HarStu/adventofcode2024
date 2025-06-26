import { readFileSync } from 'fs'

const input = readFileSync('./day4_input.txt', "utf8")

const xword = input.split('\n').map(row => row.split(''))

console.log(xword)

function checkXWord(xword: string[][], target: string) {
  const targetArr = genTarget(target)
  for (const target of targetArr) {

  }
}

function genTarget(s: string): string[][] {
  const t1 = []
  for (const char of s) {
    t1.push(char)
  }
  const t2 = t1.reverse()
  return [t1, t2]
}