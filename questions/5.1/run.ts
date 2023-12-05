let file = Bun.file(Bun.resolveSync('./resources/document.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = [
  'seeds: 79 14 55 13',
  '',
  'seed-to-soil map:',
  '50 98 2',
  '52 50 48',
  '',
  'soil-to-fertilizer map:',
  '0 15 37',
  '37 52 2',
  '39 0 15',
  '',
  'fertilizer-to-water map:',
  '49 53 8',
  '0 11 42',
  '42 0 7',
  '57 7 4',
  '',
  'water-to-light map:',
  '88 18 7',
  '18 25 70',
  '',
  'light-to-temperature map:',
  '45 77 23',
  '81 45 19',
  '68 64 13',
  '',
  'temperature-to-humidity map:',
  '0 69 1',
  '1 0 69',
  '',
  'humidity-to-location map:',
  '60 56 37',
  '56 93 4',
]

const fn = (lines: string[]) => {
  let seeds = lines[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((n) => parseInt(n))
  lines = lines.splice(2)
  let rawMaps = []
  let currMap = []
  for (let line of lines) {
    if (/[0-9]/.test(line[0])) currMap.push(line.split(' ').map((n) => parseInt(n)))
    else if (currMap.length) {
      rawMaps.push(currMap)
      currMap = []
    }
  }
  if (currMap.length) rawMaps.push(currMap)

  let min = Infinity
  for (let num of seeds) {
    for (let rawMap of rawMaps) {
      for (let [dst, src, count] of rawMap) {
        if (num >= src && num < src + count) {
          num = dst + num - src
          break
        }
      }
    }
    min = Math.min(min, num)
  }

  return min
}

console.log(fn(input1))
