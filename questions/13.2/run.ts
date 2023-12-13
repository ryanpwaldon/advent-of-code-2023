let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let lines = text.split('\n')
  let sections: string[][] = []
  let section: string[] = []
  for (let line of lines) {
    if (!line) {
      sections.push([...section])
      section = []
    } else section.push(line)
  }
  sections.push([...section])
  return sections
}

const getDiff = (left: string, right: string) => {
  let diff = 0
  let i = 0
  while (i < left.length) {
    if (left[i] !== right[i]) diff++
    i++
  }
  return diff
}

const findHorzReflection = (section: string[]) => {
  let rCount = section.length
  let cCount = section[0].length
  for (let c = 0; c < cCount - 1; c++) {
    let mismatch = 0
    let l = c
    let r = c + 1
    while (l >= 0 && r < cCount) {
      let lCol = section.map((row) => row[l]).join('')
      let rCol = section.map((row) => row[r]).join('')
      mismatch += getDiff(lCol, rCol)
      l--
      r++
    }
    if (mismatch === 1) return c + 1
  }
  return null
}

const findVertReflection = (section: string[]) => {
  let rCount = section.length
  let cCount = section[0].length
  for (let row = 0; row < rCount - 1; row++) {
    let mismatch = 0
    let l = row
    let r = row + 1
    while (l >= 0 && r < rCount) {
      let lRow = section[l]
      let rRow = section[r]
      mismatch += getDiff(lRow, rRow)
      l--
      r++
    }
    if (mismatch === 1) return (row + 1) * 100
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
