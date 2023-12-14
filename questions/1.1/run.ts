let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
let text = await file.text()
let lines = text.split('\n')
let sum = 0
for (let line of lines) {
  let isNum = /[0-9]/
  let l = 0
  let r = line.length - 1
  while (l < line.length && !isNum.test(line[l])) l++
  while (r >= 0 && !isNum.test(line[r])) r--
  sum += parseInt(line[l] + line[r])
}
console.log(sum)
