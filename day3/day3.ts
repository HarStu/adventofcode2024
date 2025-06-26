import { readFileSync } from 'fs'

const input = readFileSync("./day3_input.txt", "utf8")

function part1() {
  const re = /mul\((\d{1,3}),(\d{1,3})\)/g

  const muls = [...input.matchAll(re)].map(m => m[0])
  const mulNumPairs = [...input.matchAll(re)].map(([, a, b]) => [Number(a!), Number(b!)])

  console.log(muls)
  console.log(mulNumPairs)

  const mulRes = mulNumPairs.map(pair => pair[0]! * pair[1]!)
  const total = mulRes.reduce((total, num) => total += num)

  console.log(total)
}

function part2() {
  const re = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
  const matches = [...input.matchAll(re)].map(m => [m[0], m[1], m[2]])

  console.log(matches)

  let total = 0
  let active = true
  for (const match of matches) {
    console.log(match)
    // check into enabling/disabling)
    if (match[1] == undefined && match[2] == undefined) {
      if (match[0]!.length == 4) {
        active = true
        console.log("\thit a do(), setting active")
      } else {
        active = false
        console.log("\thit a don't(), setting inactive")
      }
    } else if (active) {
      total += (Number(match[1]) * Number(match[2]))
      console.log(`\tAdding ${match[1]} * ${match[2]} to total`)
    } else {
      continue
    }
  }
  return total
}


console.log(part2())