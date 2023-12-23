let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((r) => r.split(''))
  let list = {}
  let c = grid[0].indexOf('.')
  return { grid, r: 0, c }
}

// prettier-ignore
const solve = (input: string) => {
  let { grid, r, c } = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let seen = Array(rCount).fill(undefined).map(() => Array(cCount).fill(false))
  const traverse = (r: number, c: number): number => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || seen[r][c] || grid[r][c] === '#') return -Infinity
    if (r === rCount - 1) return 0
    seen[r][c] = true
    let ans = Math.max(traverse(r + 1, c), traverse(r - 1, c), traverse(r, c + 1), traverse(r, c - 1)) + 1
    seen[r][c] = false
    return ans
  }
  return traverse(r, c)
}

const ans = solve(input)
console.log(ans)
