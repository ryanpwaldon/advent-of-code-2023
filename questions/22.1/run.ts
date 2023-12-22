let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  let points = rows.map((row) => row.split('~').map((point) => point.split(',').map((n) => parseInt(n))))
  let maxX = 0
  let maxY = 0
  let maxZ = 0
  for (let [[x1, y1, z1], [x2, y2, z2]] of points) {
    maxX = Math.max(maxX, x1, x2)
    maxY = Math.max(maxY, y1, y2)
    maxZ = Math.max(maxZ, z1, z2)
  }
  let grid = Array(maxX + 1).fill(undefined).map(() => Array(maxY + 1).fill(undefined).map(() => Array(maxZ + 1).fill(0))) // prettier-ignore
  let i = 0
  let allPoints: [number, number, number][][] = []
  for (let [[x1, y1, z1], [x2, y2, z2]] of points) {
    let orientation = z1 === z2 ? 'horz' : 'vert'
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          allPoints[i] = allPoints[i] ?? []
          allPoints[i].push([x, y, z])
          grid[x][y][z] = [i, orientation]
        }
      }
    }
    i++
  }
  allPoints.sort()

  return grid
}

const solve = (input: string) => {
  let grid = format(input)
  let xCount = grid.length
  let yCount = grid[0].length
  let zCount = grid[0][0].length
  for (let z = 0; z < zCount; z++) {}
  return grid
}

const ans = solve(input)
console.log(ans)
