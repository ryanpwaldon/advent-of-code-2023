let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  return rows.map((row) => row.split(''))
}

const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  for (let r = 0; r < rCount; r++) {
    if (grid[r].every((cell) => cell === '.')) {
      grid.splice(r, 0, [...grid[r]])
      rCount++
      r++
    }
  }
  for (let c = 0; c < cCount; c++) {
    let empty = true
    for (let r = 0; r < rCount; r++) {
      if (grid[r][c] === '#') {
        empty = false
        break
      }
    }
    if (empty) {
      for (let r = 0; r < rCount; r++) {
        grid[r].splice(c, 0, '.')
      }
      cCount++
      c++
    }
  }
  let points = []
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      if (grid[r][c] === '#') points.push([r, c])
    }
  }
  let dist = 0
  for (let i = 0; i < points.length - 1; i++) {
    let [x1, y1] = points[i]
    for (let j = i + 1; j < points.length; j++) {
      let [x2, y2] = points[j]
      dist += Math.abs(x1 - x2) + Math.abs(y1 - y2)
    }
  }
  return dist
}

const ans = solve(input)
console.log(ans)
