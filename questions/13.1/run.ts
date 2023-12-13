let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let lines = text.split('\n')
  let sections: string[][] = []
  let section: string[] = []
  for (let line of lines) {
    if (!line) {
      sections.push([...section])
      section = []
    } else {
      section.push(line)
    }
  }
  sections.push([...section])
  return sections
}

const findHorzReflection = (section: string[]) => {
  let cCount = section[0].length
  for (let col = 0; col < cCount - 1; col++) {
    let valid = true
    let l = col
    let r = col + 1
    while (l >= 0 && r < cCount) {
      let lCol = section.map((row) => row[l]).join('')
      let rCol = section.map((row) => row[r]).join('')
      if (lCol !== rCol) {
        valid = false
        break
      }
      l--
      r++
    }
    if (valid) return col + 1
  }
  return null
}

const findVertReflection = (section: string[]) => {
  let rCount = section.length
  for (let row = 0; row < rCount - 1; row++) {
    let valid = true
    let l = row
    let r = row + 1
    while (l >= 0 && r < rCount) {
      let lRow = section[l]
      let rRow = section[r]
      if (lRow !== rRow) {
        valid = false
        break
      }
      l--
      r++
    }
    if (valid) return (row + 1) * 100
  }
  return null
}

const solve = (input: string) => {
  let sections = format(input)
  let count = 0
  for (let section of sections) {
    let horz = findHorzReflection(section)
    let vert = findVertReflection(section)
    count += horz ?? vert ?? 0
  }
  return count
}

const ans = solve(input)
console.log(ans)
