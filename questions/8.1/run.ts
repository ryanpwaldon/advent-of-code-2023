let inputMain = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

// Format
const format = (text: string) => {
  let lines = text.split('\n')
  let instructions = lines[0]
  lines = lines.slice(2)
  let linesArr = lines.map((line) => {
    let node = line.split('=')[0].trim()
    let [left, right] = line
      .split('=')[1]
      .trim()
      .split(',')
      .map((node) => node.replaceAll(/[\(\)]/g, '').trim())
    return [node, left, right]
  })
  let list: Record<string, [string, string]> = {}
  for (let [node, left, right] of linesArr) list[node] = [left, right]
  return { instructions, list }
}

// Solve
const solve = (input: string) => {
  let { instructions, list } = format(input)
  let node = 'AAA'
  let steps = 0
  let i = 0
  while (node !== 'ZZZ') {
    let next = instructions[i] === 'L' ? 0 : 1
    node = list[node][next]
    i = i === instructions.length - 1 ? 0 : i + 1
    steps++
  }
  return steps
}

// Run
const ans = solve(inputMain)
console.log(ans)
