import { readFileSync } from 'fs'

const input = readFileSync('./day7_input.txt', 'utf8')
const rows = input.split('\n')

const problems = []
for (const i in rows) {
  const totalAndNums = rows[i].split(': ')
  problems.push([totalAndNums[0], ...totalAndNums[1].split(' ')])
}

//console.log(problems)

function part2(problems: any[]) {

  let result = 0
  for (const problem of problems) {

    const total = Number(problem[0])
    const nums = Array.from(problem.slice(1)).map(str => Number(str))

    let pa: number[] = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
      const sums = []
      const products = []
      const concats = []
      for (const val of pa) {
        sums.push(val + nums[i])
        products.push(val * nums[i])
        concats.push(concatNum(val, nums[i]))
      }
      pa = [...sums, ...concats, ...products]
    }

    console.log(pa)

    if (pa.includes(total)) {
      result += total
    }
  }
  return result

}

function concatNum(num1, num2) {
  const num1Mult = Math.floor(Math.log10(num2)) + 1
  return (num1 * (10 ** num1Mult)) + num2
}

function part1(problems: any[]) {
  let result = 0
  for (const problem of problems) {

    const total = Number(problem[0])
    const nums = Array.from(problem.slice(1)).map(str => Number(str))

    let pa: number[] = [nums[0]]
    for (let i = 1; i < nums.length; i++) {
      const sums = []
      const products = []
      for (const val of pa) {
        sums.push(val + nums[i])
        products.push(val * nums[i])
      }
      pa = sums.concat(products)
    }

    if (pa.includes(total)) {
      result += total
    }
  }
  return result
}

console.log(concatNum(10, 12))
console.log(concatNum(1231, 43))

console.log(part2(problems))