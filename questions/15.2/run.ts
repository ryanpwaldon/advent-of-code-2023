let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (input: string) => {
  let sequences = input.split(',')
  let hashes = []
  for (let sequence of sequences) {
    let hash = 0
    let label = ''
    let lens = null
    if (sequence.includes('-')) label = sequence.split('-')[0]
    if (sequence.includes('=')) {
      label = sequence.split('=')[0]
      lens = parseInt(sequence.split('=')[1])
    }
    for (let char of label) {
      hash += char.charCodeAt(0)
      hash *= 17
      hash %= 256
    }
    hashes.push([label, hash, lens] as [string, number, number | null])
  }
  return hashes
}

// prettier-ignore
const solve = (input: string) => {
  let sequences = format(input)
  let boxes: [string, number][][] = Array(256).fill(null).map(() => [])
  for (let [label, hash, lens] of sequences) {
    if (!lens) {
      let labelIndex = boxes[hash].findIndex(([itemLabel]) => itemLabel === label)
      if (labelIndex === -1) continue
      boxes[hash].splice(labelIndex, 1)
    } else {
      let labelIndex = boxes[hash].findIndex(([itemLabel]) => itemLabel === label)
      if (labelIndex !== -1) {
        boxes[hash][labelIndex][1] = lens
      } else {
        boxes[hash].push([label, lens])
      }
    }
  }
  let total = 0
  for (let j = 0; j < boxes.length; j++) {
    let box = boxes[j]
    let boxNo = j + 1
    let val = 0
    for (let i = 0; i < box.length; i++) {
      let [label, lens] = box[i]
      let slotNo = i + 1
      val += boxNo * slotNo * lens
    }
    total += val
  }
  return total
}

const ans = solve(input)
console.log(ans)
