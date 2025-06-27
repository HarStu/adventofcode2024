import { readFileSync } from 'fs'

const input = readFileSync('./day7_test.txt', 'utf8')
const rows = input.split('\n')

const problems = []
for (const i in rows) {
  const totalAndNums = rows[i].split(': ')
  problems.push([totalAndNums[0], ...totalAndNums[1].split(' ')])
}

console.log(problems)

function part1(problems: any[]) {
  const results = []
  for (const problem of problems) {

    //console.log(problem)

    const total = Number(problem[0])
    const nums = Array.from(problem.slice(1)).map(str => Number(str))

    //console.log(nums)

    let pa: number[] = []
    //console.log(op1)
    //console.log(op2)
    pa.push(nums[0] + nums[1])
    pa.push(nums[0] * nums[1])

    console.log(`initial sum and product: ${pa}`)

    for (let i = 2; i < nums.length; i++) {
      const sums = []
      const products = []
      for (const val of pa) {
        sums.push(val + nums[i])
        products.push(val * nums[i])
      }
      pa = sums.concat(products)
    }

    console.log(pa)

    if (pa.includes(total)) {
      results.push(true)
    } else {
      results.push(false)
    }
  }
  return results
}

console.log(part1(problems))