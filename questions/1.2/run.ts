let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
let text = await file.text()
let lines = text.split('\n')
let map: [string, number][] = [
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
]
let sum = 0
for (let line of lines) {
  let digitA = ''
  let digitB = ''
  let isNum = /[0-9]/
  let l = 0
  while (l < line.length) {
    let segment = line.substring(l)
    if (isNum.test(line[l])) {
      digitA = line[l]
      break
    }
    let match = false
    for (let [num, val] of map) {
      if (segment.startsWith(num)) {
        digitA = val.toString()
        match = true
      }
    }
    if (match) break
    l++
  }
  let r = line.length - 1
  while (r >= 0) {
    let segment = line.substring(0, r + 1)
    if (isNum.test(line[r])) {
      digitB = line[r]
      break
    }
    let match = false
    for (let [num, val] of map) {
      if (segment.endsWith(num)) {
        digitB = val.toString()
        match = true
      }
    }
    if (match) break
    r--
  }
  sum += parseInt(digitA + digitB)
}

console.log(sum)
