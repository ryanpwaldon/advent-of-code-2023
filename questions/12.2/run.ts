// Incomplete

let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  let data = []
  for (let row of rows) {
    let [code, numString] = row.split(' ')
    let nums = numString.split(',').map((num) => parseInt(num))
    data.push([code, nums])
  }
  return data
}

const isValid = (code: string, nums: number[]) => {
  let parts = code.split(/\.+/)
  parts = parts.filter(Boolean)
  if (parts.length !== nums.length) return false
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i].length
    let num = nums[i]
    if (part !== num) return false
  }
  return true
}

const getPossibilities = (codeStr: string, nums: number[]) => {
  let codeArr = codeStr.split('')
  let indices: number[] = []
  for (let i = 0; i < codeArr.length; i++) if (codeArr[i] === '?') indices.push(i)
  let possibilities: Set<string> = new Set()
  const traverse = (start: number = 0) => {
    if (start === indices.length) return possibilities.add(codeArr.join(''))
    codeArr[indices[start]] = '.'
    traverse(start + 1)
    codeArr[indices[start]] = '#'
    traverse(start + 1)
  }
  traverse()
  let filtered = [...possibilities].filter((str) => isValid(str, [...nums]))
  return filtered.length
}

const solve = (input: string) => {
  let rows = format(input)
  let count = 0
  for (let row of rows) {
    let code = row[0] as string
    let nums = row[1] as number[]
    count += getPossibilities(code, nums)
  }
  return count
}

const ans = solve(input)
console.log(ans)
