let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let lines = text.split('\n').map((row) => row.split(''))
  return lines
}

const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length

  let roll = (r: number, c: number) => {
    if (grid[r][c] !== 'O') return
    while (r > 0 && grid[r - 1][c] === '.') {
      grid[r][c] = '.'
      grid[r - 1][c] = 'O'
      r--
    }
  }

  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      roll(r, c)
    }
  }

  let count = 0
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      if (grid[r][c] === 'O') {
        count += rCount - r
      }
    }
  }

  return count
}

const ans = solve(input)
console.log(ans)
