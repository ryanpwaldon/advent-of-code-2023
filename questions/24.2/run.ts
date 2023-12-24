let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  return rows
}

// prettier-ignore
const solve = (input: string) => {
  let rows = format(input)
  return rows
}

const ans = solve(input)
console.log(ans)
