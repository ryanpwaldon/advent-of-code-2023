let file = Bun.file(Bun.resolveSync('./resources/document.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = ['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483']

const format = (lines: string[]) => {
  let formatted = []
  for (let line of lines) {
    formatted.push(line.split(' '))
  }
  return formatted
}

let hands = format(input1)

const getRank = ([hand]: string[]) => {
  let counter: Record<string, number> = {}
  for (let c of hand) counter[c] = (counter[c] ?? 0) + 1
  let counts = Object.values(counter)
  if (counts.includes(5)) return 0
  if (counts.includes(4)) return 1
  if (counts.includes(3) && counts.includes(2)) return 2
  if (counts.includes(3)) return 3
  let pairs = 0
  for (let num of counts) if (num === 2) pairs++
  if (pairs === 2) return 4
  if (pairs === 1) return 5
  return 6
}

const getTop = ([[h1], [h2]]: string[][]) => {
  let map = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  let l = 0
  let r = 0
  while (h1[l] === h2[r] && l < h1.length - 1) {
    l++
    r++
  }
  return map.indexOf(h1[l]) - map.indexOf(h2[r])
}

const main = (hands: string[][]) => {
  hands.sort((a, b) => getTop([a, b]))
  hands.sort((a, b) => getRank(a) - getRank(b))
  hands = hands.reverse()
  let points = 0
  for (let i = 0; i < hands.length; i++) {
    let [hand, bid] = hands[i]
    points += parseInt(bid) * (i + 1)
  }
  return points
}

console.log(main(hands))
