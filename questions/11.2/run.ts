let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  return rows.map((row) => row.split(''))
}

const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let gapRows = new Set()
  let gapCols = new Set()
  for (let r = 0; r < rCount; r++) if (grid[r].every((cell) => cell === '.')) gapRows.add(r)
  for (let c = 0; c < cCount; c++) {
    let empty = true
    for (let r = 0; r < rCount; r++) {
      if (grid[r][c] === '#') {
        empty = false
        break
      }
    }
    if (empty) gapCols.add(c)
  }
  let points = []
  let gr = 0
  for (let r = 0; r < rCount; r++) {
    if (gapRows.has(r)) gr++
    let gc = 0
    for (let c = 0; c < cCount; c++) {
      if (gapCols.has(c)) gc++
      if (grid[r][c] === '#') {
        points.push([r + 1000000 * gr - gr, c + 1000000 * gc - gc])
      }
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
