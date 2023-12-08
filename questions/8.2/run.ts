let input = await Bun.file(Bun.resolveSync('./resources/main.txt', import.meta.dir)).text()

// Format
const format = (text: string) => {
  let lines = text.split('\n')
  let instructions = lines[0]
  lines = lines.slice(2)
  let linesArr = lines.map((line) => {
    let node = line.split('=')[0].trim()
    let [left, right] = line.split('=')[1].trim().split(',').map((node) => node.replaceAll(/[\(\)]/g, '').trim()) // prettier-ignore
    return [node, left, right]
  })
  let starts = []
  let list: Record<string, [string, string]> = {}
  for (let [node, left, right] of linesArr) {
    list[node] = [left, right]
    if (node.endsWith('A')) starts.push(node)
  }
  return { starts, instructions, list }
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

function findLCM(numbers: number[]): number {
  return numbers.reduce((acc, val) => lcm(acc, val), 1)
}

// Solve
const solve = (input: string) => {
  let { starts, instructions, list } = format(input)
  let nodes = [...starts]
  let factors: number[] = []
  for (let node of nodes) {
    let steps = 0
    let i = 0
    while (!node.endsWith('Z')) {
      let next = instructions[i] === 'L' ? 0 : 1
      node = list[node][next]
      i = i === instructions.length - 1 ? 0 : i + 1
      steps++
    }
    factors.push(steps)
  }
  return findLCM(factors)
}

// Run
const ans = solve(input)
console.log(ans)
