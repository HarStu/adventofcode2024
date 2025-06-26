import { readFileSync } from 'fs'

const input = readFileSync('./day4_input.txt', "utf8")

const xword = input.split('\n').map(row => row.split(''))

console.log(xword)