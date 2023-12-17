let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((row) => row.split('').map((str) => parseInt(str)))
  return grid
}

// prettier-ignore
const solve = (input: string) => {
  let grid = format(input)

  grid.forEach(row => row.reverse())
  grid.reverse()

  let rCount = grid.length
  let cCount = grid[0].length
  let seen = Array(rCount).fill(undefined).map(() => Array(cCount).fill(false))
  let cache = new Map()

  // prettier-ignore
  const traverse = (r = 0, c = 0, blocks = 0, d = 'right'): number => {
    if (r === rCount - 1 && c === cCount - 1) return grid[r][c]
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || blocks > 3 || seen[r][c]) return Infinity
    let key = [r, c, d, blocks].toString()
    if (cache.has(key)) return cache.get(key)
    let cost = grid[r][c]
    seen[r][c] = true
    let ans = null
    if (d === 'right') {
      ans = Math.min(
        traverse(r - 1, c, 1, 'up') + cost,
        traverse(r + 1, c, 1, 'down') + cost,
        traverse(r, c + 1, blocks + 1, 'right') + cost,
      )
    } else if (d === 'left') {
      ans = Math.min(
        traverse(r - 1, c, 1, 'up') + cost,
        traverse(r + 1, c, 1, 'down') + cost,
        traverse(r, c - 1, blocks + 1, 'left') + cost,
      )
    } else if (d === 'up') {
      ans = Math.min(
        traverse(r, c + 1, 1, 'right') + cost,
        traverse(r, c - 1, 1, 'left') + cost,
        traverse(r - 1, c, blocks + 1, 'up') + cost,
      )
    } else {
      ans = Math.min(
        traverse(r, c + 1, 1, 'right') + cost,
        traverse(r, c - 1, 1, 'left') + cost,
        traverse(r + 1, c, blocks + 1, 'down') + cost,
      )
    }
    seen[r][c] = false
    cache.set(key, ans)
    return ans
  }

  return traverse() - grid[rCount - 1][cCount - 1]
}

const ans = solve(input)
console.log(ans)
