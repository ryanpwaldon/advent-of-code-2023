let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((row) => row.split(''))
  return grid
}

const solve = (input: string) => {
  let grid = format(input)
  return grid
}

const ans = solve(input)
console.log(ans)
