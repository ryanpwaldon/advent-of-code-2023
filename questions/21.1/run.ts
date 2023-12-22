let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((r) => r.split(''))
  let r = grid.findIndex((r) => r.includes('S'))
  let c = grid[r].indexOf('S')
  return { grid, r, c }
}

const solve = (input: string) => {
  let { grid, r, c } = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let dist = Array(rCount).fill(undefined).map(() => Array(cCount).fill(Infinity)) // prettier-ignore
  let plots = new Set()
  const traverse = (r: number, c: number, steps: number, limit = 6) => {
    let key = [r, c].toString()
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || grid[r][c] === '#' || steps >= dist[r][c]) return
    dist[r][c] = steps
    if (steps % 2 === 0) plots.add(key)
    if (steps === limit) return
    traverse(r + 1, c, steps + 1, limit)
    traverse(r - 1, c, steps + 1, limit)
    traverse(r, c + 1, steps + 1, limit)
    traverse(r, c - 1, steps + 1, limit)
  }
  traverse(r, c, 0)
  return plots.size
}

const ans = solve(input)
console.log(ans)
