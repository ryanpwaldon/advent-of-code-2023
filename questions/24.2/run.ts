let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((r) => r.split(''))
  return grid
}

// prettier-ignore
const solve = (input: string) => {
  let grid = format(input)
  return grid
}

const ans = solve(input)
console.log(ans)
