let inputMain = await Bun.file(Bun.resolveSync('./resources/main.txt', import.meta.dir)).text()

// Format
const format = (text: string) => {
  let lines = text.split('\n').map((line) => line.split(' ').map((val) => parseInt(val)))
  return lines
}

// Traverse
const traverse = (nums: number[]): number => {
  if (nums.every((num) => num === 0)) return 0
  let next: number[] = []
  for (let i = 0; i < nums.length - 1; i++) next.push(nums[i + 1] - nums[i])
  let ans = traverse(next) + nums[nums.length - 1]
  return ans
}

// Solve
const solve = (input: string) => {
  const histories = format(input)
  let sum = 0
  for (let h of histories) sum += traverse(h.reverse())
  return sum
}

// Run
const ans = solve(inputMain)
console.log(ans)
