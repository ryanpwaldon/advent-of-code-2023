let inputMain = await Bun.file(Bun.resolveSync('./resources/main.txt', import.meta.dir)).text()
let inputTest = await Bun.file(Bun.resolveSync('./resources/test.txt', import.meta.dir)).text()

// Format
const format = (text: string) => {
  let lines = text.split('\n')
  let handBids = []
  for (let line of lines) handBids.push(line.split(' '))
  return handBids
}

// Solve

const rankA = (hand: string) => {
  let counter: Record<string, number> = {}
  for (let card of hand) counter[card] = (counter[card] ?? 0) + 1
  let counts = Object.values(counter)
  if (counts.includes(5)) return 0
  if (counts.includes(4)) return 1
  if (counts.includes(3) && counts.includes(2)) return 2
  if (counts.includes(3)) return 3
  let pairs = counts.reduce((count, val) => (val === 2 ? count + 1 : count), 0)
  if (pairs === 2) return 4
  if (pairs === 1) return 5
  return 6
}

const rankB = (a: string, b: string) => {
  let map = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  let i = 0
  while (a[i] === b[i] && i < 4) i++
  return map.indexOf(a[i]) - map.indexOf(b[i])
}

const solve = (input: string) => {
  let hands = format(input)
  hands.sort((a, b) => rankA(a[0]) - rankA(b[0]) || rankB(a[0], b[0]))
  hands = hands.reverse()
  let points = 0
  for (let i = 0; i < hands.length; i++) points += parseInt(hands[i][1]) * (i + 1)
  return points
}

// Run
const ans = solve(inputTest)
console.log(ans)
