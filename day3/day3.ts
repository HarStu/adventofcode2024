import { readFileSync } from 'fs'

const input = readFileSync("./day3_input.txt", "utf8")

const re = /mul\((\d{1,3}),(\d{1,3})\)/g

const muls = [...input.matchAll(re)].map(m => m[0])
const mulNumPairs = [...input.matchAll(re)].map(([, a, b]) => [Number(a!), Number(b!)])

console.log(muls)
console.log(mulNumPairs)

const mulRes = mulNumPairs.map(pair => pair[0]! * pair[1]!)
const total = mulRes.reduce((total, num) => total += num)

console.log(total)