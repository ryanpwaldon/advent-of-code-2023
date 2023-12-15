let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let sequences = text.split(',')
  return sequences
}

const solve = (input: string) => {
  let sequences = format(input)
  let total = 0

  for (let sequence of sequences) {
    let value = 0
    for (let char of sequence) {
      value += char.charCodeAt(0)
      value *= 17
      value %= 256
    }
    total += value
  }

  return total
}

const ans = solve(input)
console.log(ans)
