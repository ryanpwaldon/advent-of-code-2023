let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let lines = text.split('\n')
  return lines
}

const solve = (input: string) => {
  let lines = format(input)
  return lines
}

const ans = solve(input)
console.log(ans)
