let inputMain = await Bun.file(Bun.resolveSync('./resources/main.txt', import.meta.dir)).text()
let inputTest = await Bun.file(Bun.resolveSync('./resources/test.txt', import.meta.dir)).text()

// Format
const format = (text: string) => {
  let lines = text.split('\n')
  return lines
}

// Solve
const solve = (input: string) => {
  let lines = format(input)
  return lines
}

// Run
const ans = solve(inputTest)
console.log(ans)
