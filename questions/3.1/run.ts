let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = ['467..114..', '...*......', '..35..633.', '......#...', '617*......', '.....+.58.', '..592.....', '......755.', '...$.*....', '.664.598..']

const fn = (grid: string[]) => {
  let rCount = grid.length
  let cCount = grid[0].length
  let seen = Array(rCount)
    .fill(false)
    .map(() => Array(cCount).fill(false))
  let isNum = /[0-9]/
  let total = 0
  const traverse = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || seen[r][c] || !isNum.test(grid[r][c])) return null
    seen[r][c] = true
    let left = c
    while (left > 0 && isNum.test(grid[r][left - 1])) {
      seen[r][left - 1] = true
      left--
    }
    let right = c
    while (right < cCount - 1 && isNum.test(grid[r][right + 1])) {
      seen[r][right + 1] = true
      right++
    }
    let num = parseInt(grid[r].substring(left, right + 1))
    return num
  }
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      if (isNum.test(grid[r][c]) || grid[r][c] === '.') continue
      let sum = [
        traverse(r - 1, c),
        traverse(r + 1, c),
        traverse(r, c - 1),
        traverse(r, c + 1),
        traverse(r + 1, c + 1),
        traverse(r + 1, c - 1),
        traverse(r - 1, c - 1),
        traverse(r - 1, c + 1),
      ].reduce((sum: number, val) => (val ?? 0) + sum, 0)
      total += sum
    }
  }
  return total
}

console.log(fn(input1))
