import { readFileSync } from 'fs'

const input = readFileSync('./day7_input.txt', 'utf8')
const rows = input.split('\n')

const problems = []
for (const i in rows) {
  const totalAndNums = rows[i].split(': ')
  problems.push([totalAndNums[0], ...totalAndNums[1].split(' ')])
}

//console.log(problems)

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

    console.log(pa)
    if (pa.length !== 2 ** (nums.length - 1)) {
      console.log("might not be seeing enough terms")
    }

    if (pa.includes(total)) {
      result += total
    }
  }
  return result
}

console.log(part1(problems))