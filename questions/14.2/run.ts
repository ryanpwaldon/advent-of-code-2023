let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let lines = text.split('\n').map((row) => row.split(''))
  return lines
}

const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length

  let rollNorth = (r: number, c: number) => {
    if (grid[r][c] !== 'O') return
    while (r > 0 && grid[r - 1][c] === '.') {
      grid[r][c] = '.'
      grid[r - 1][c] = 'O'
      r--
    }
  }

  let rollSouth = (r: number, c: number) => {
    if (grid[r][c] !== 'O') return
    while (r < rCount - 1 && grid[r + 1][c] === '.') {
      grid[r][c] = '.'
      grid[r + 1][c] = 'O'
      r++
    }
  }

  let rollWest = (r: number, c: number) => {
    if (grid[r][c] !== 'O') return
    while (c > 0 && grid[r][c - 1] === '.') {
      grid[r][c] = '.'
      grid[r][c - 1] = 'O'
      c--
    }
  }

  let rollEast = (r: number, c: number) => {
    if (grid[r][c] !== 'O') return
    while (c < cCount - 1 && grid[r][c + 1] === '.') {
      grid[r][c] = '.'
      grid[r][c + 1] = 'O'
      c++
    }
  }

  let roll = () => {
    for (let r = 0; r < rCount; r++) {
      for (let c = 0; c < cCount; c++) {
        rollNorth(r, c)
      }
    }

    for (let c = 0; c < cCount; c++) {
      for (let r = 0; r < rCount; r++) {
        rollWest(r, c)
      }
    }

    for (let r = rCount - 1; r >= 0; r--) {
      for (let c = 0; c < cCount; c++) {
        rollSouth(r, c)
      }
    }

    for (let c = cCount - 1; c >= 0; c--) {
      for (let r = 0; r < rCount; r++) {
        rollEast(r, c)
      }
    }
  }

  const getCount = () => {
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

  for (let i = 1; i <= 10000; i++) {
    roll()
    console.log(getCount())
  }

  return null
}

solve(input)

// cycle start: 137
// cycle size: 72
// answer = (1000000000 - 137) % 72
