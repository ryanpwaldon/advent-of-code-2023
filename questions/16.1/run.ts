let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  let grid = rows.map((row) => {
    row = row.replaceAll('\\', 'e')
    row = row.replaceAll('/', 'w')
    return row.split('')
  })
  return grid
}

const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let set = new Set()
  let seen = new Set()
  const traverse = (r = 0, c = 0, d = 'right'): void => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || seen.has([r, c, d].toString())) return
    set.add([r, c].toString())
    seen.add([r, c, d].toString())
    let tile = grid[r][c]
    if (d === 'right') {
      if (tile === 'e') traverse(r + 1, c, 'down')
      else if (tile === 'w') traverse(r - 1, c, 'up')
      else if (tile === '-' || tile === '.') traverse(r, c + 1, 'right')
      else if (tile === '|') {
        traverse(r - 1, c, 'up')
        traverse(r + 1, c, 'down')
      }
    } else if (d === 'left') {
      if (tile === 'e') traverse(r - 1, c, 'up')
      else if (tile === 'w') traverse(r + 1, c, 'down')
      else if (tile === '-' || tile === '.') traverse(r, c - 1, 'left')
      else if (tile === '|') {
        traverse(r - 1, c, 'up')
        traverse(r + 1, c, 'down')
      }
    } else if (d === 'up') {
      if (tile === 'e') traverse(r, c - 1, 'left')
      else if (tile === 'w') traverse(r, c + 1, 'right')
      else if (tile === '|' || tile === '.') traverse(r - 1, c, 'up')
      else if (tile === '-') {
        traverse(r, c + 1, 'right')
        traverse(r, c - 1, 'left')
      }
    } else if (d === 'down') {
      if (tile === 'e') traverse(r, c + 1, 'right')
      else if (tile === 'w') traverse(r, c - 1, 'left')
      else if (tile === '|' || tile === '.') traverse(r + 1, c, 'down')
      else if (tile === '-') {
        traverse(r, c + 1, 'right')
        traverse(r, c - 1, 'left')
      }
    }
  }
  traverse()
  return set.size
}

const ans = solve(input)
console.log(ans)
