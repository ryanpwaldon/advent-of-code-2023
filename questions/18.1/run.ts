let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const start = [1, 152]

const format = (text: string) => {
  let rows = text.split('\n')
  let instructions: [string, number, string][] = rows.map((row) => {
    let [direction, count, color] = row.split(' ')
    color = color.substring(1, color.length - 1)
    return [direction, parseInt(count), color]
  })
  return instructions
}

const solve = (input: string) => {
  let instructions = format(input)
  let points: number[][] = [[0, 0]]
  let minX = 0
  let minY = 0
  let maxX = 0
  let maxY = 0
  for (let [dir, count, color] of instructions) {
    let [x, y] = points[points.length - 1]
    if (dir === 'R') points.push([x + count, y])
    else if (dir === 'L') points.push([x - count, y])
    else if (dir === 'U') points.push([x, y - count])
    else if (dir === 'D') points.push([x, y + count])
    else throw new Error()
    minX = Math.min(minX, points[points.length - 1][0])
    minY = Math.min(minY, points[points.length - 1][1])
    maxX = Math.max(maxX, points[points.length - 1][0])
    maxY = Math.max(maxY, points[points.length - 1][1])
  }
  let diffX = 0 - minX
  let diffY = 0 - minY
  maxX = maxX + diffX
  maxY = maxY + diffY
  for (let i = 0; i < points.length; i++) {
    let [x, y] = points[i]
    points[i] = [x + diffX, y + diffY]
  }
  let grid = Array(maxY + 1)
    .fill(undefined)
    .map(() => Array(maxX + 1).fill('.'))
  let rCount = grid.length
  let cCount = grid[0].length

  for (let i = 0; i < instructions.length; i++) {
    let [dir] = instructions[i]
    let [x1, y1] = points[i]
    let [x2, y2] = points[i + 1] ?? points[0]
    if (dir === 'R') for (let i = x1; i <= x2; i++) grid[y1][i] = '#'
    else if (dir === 'L') for (let i = x2; i <= x1; i++) grid[y1][i] = '#'
    else if (dir === 'D') for (let i = y1; i <= y2; i++) grid[i][x1] = '#'
    else if (dir === 'U') for (let i = y2; i <= y1; i++) grid[i][x1] = '#'
    else throw new Error()
  }

  const traverse = (r = 1, c = 152) => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || grid[r][c] === '#') return
    grid[r][c] = '#'
    traverse(r + 1, c)
    traverse(r - 1, c)
    traverse(r, c + 1)
    traverse(r, c - 1)
  }

  traverse()

  let count = 0
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      if (grid[r][c] === '#') count++
    }
  }

  return count
}

const ans = solve(input)
console.log(ans)
