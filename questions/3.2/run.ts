let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = ['467..114..', '...*......', '..35..633.', '......#...', '617*......', '.....+.58.', '..592.....', '......755.', '...$.*....', '.664.598..']

const fn = (grid: string[]) => {
  let rCount = grid.length
  let cCount = grid[0].length
  let isNum = /[0-9]/
  let total = 0
  let seen = new Set()
  const traverse = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= rCount || c >= cCount || !isNum.test(grid[r][c])) return null
    let left = c
    while (left > 0 && isNum.test(grid[r][left - 1])) left--
    let right = c
    while (right < cCount - 1 && isNum.test(grid[r][right + 1])) right++
    if (seen.has([r, left, right].toString())) return null
    seen.add([r, left, right].toString())
    let num = parseInt(grid[r].substring(left, right + 1))
    return num
  }
  for (let r = 0; r < rCount; r++) {
    for (let c = 0; c < cCount; c++) {
      if (grid[r][c] === '*') {
        let nums = [
          traverse(r - 1, c),
          traverse(r + 1, c),
          traverse(r, c - 1),
          traverse(r, c + 1),
          traverse(r + 1, c + 1),
          traverse(r + 1, c - 1),
          traverse(r - 1, c - 1),
          traverse(r - 1, c + 1),
        ].filter((val) => val !== null) as number[]
        if (nums.length === 2) {
          let product = nums.reduce((product, val) => val * product, 1)
          total += product
        }
        seen.clear()
      }
    }
  }
  return total
}

console.log(fn(input1))
