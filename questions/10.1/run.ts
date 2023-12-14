let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  return rows.map((row) => row.split(''))
}

const solve = (input: string) => {
  const grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let seen = new Set()
  let sr = grid.findIndex((r) => r.includes('S'))
  let sc = grid[sr].indexOf('S')

  const traverse = (grid: string[][], r: number, c: number, dir: string): number => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || seen.has([r, c].toString())) return 0
    if (dir === 'left' && grid[r][c] !== '-' && grid[r][c] !== 'F' && grid[r][c] !== 'L') return 0
    if (dir === 'right' && grid[r][c] !== '-' && grid[r][c] !== '7' && grid[r][c] !== 'J') return 0
    if (dir === 'up' && grid[r][c] !== '|' && grid[r][c] !== 'F' && grid[r][c] !== '7') return 0
    if (dir === 'down' && grid[r][c] !== '|' && grid[r][c] !== 'L' && grid[r][c] !== 'J') return 0
    seen.add([r, c].toString())
    return Math.max(
      traverse(grid, r, c - 1, 'left') + 1,
      traverse(grid, r, c + 1, 'right') + 1,
      traverse(grid, r - 1, c, 'up') + 1,
      traverse(grid, r + 1, c, 'down') + 1,
    ) // prettier-ignore
  }

  let count = traverse(grid, sr, sc, '')
  return Math.ceil(count / 2)
}

const ans = solve(input)
console.log(ans)

// ceil
