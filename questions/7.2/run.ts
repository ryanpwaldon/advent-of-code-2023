let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
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
  let five = 0
  let quad = 0
  let trip = 0
  let pair = 0
  let jokers = 0
  for (let [card, count] of Object.entries(counter)) {
    if (card === 'J') jokers = count
    else {
      if (count === 5) five++
      if (count === 4) quad++
      if (count === 3) trip++
      if (count === 2) pair++
    }
  }
  // five of kind
  if (
    five >= 1 ||
    quad >= 1 && jokers === 1 ||
    trip >= 1 && jokers === 2 ||
    pair >= 1 && jokers === 3 ||
    jokers >= 4
  ) return 0

  if (
    quad >= 1 ||
    trip >= 1 && jokers === 1 ||
    pair >= 1 && jokers === 2 ||
    jokers >= 3
  ) return 1

  if (
    trip >= 1 && pair >= 1 ||
    trip >= 1 && jokers === 2 ||
    pair >= 2 && jokers === 1
  ) return 2

  if (
    trip >= 1 ||
    pair >= 1 && jokers >= 1 ||
    jokers >= 2
  ) return 3

  if (
    pair >= 2 ||
    pair >= 1 && jokers >= 1
  ) return 4

  if (
    pair === 1 ||
    jokers >= 1
  ) return 5

  return 6
} // prettier-ignore

const getTop = ([[h1], [h2]]: string[][]) => {
  let map = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
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
