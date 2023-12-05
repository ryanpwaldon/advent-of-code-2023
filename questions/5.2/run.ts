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

const mapsToRanges = (maps: number[][][]) => {
  let arr = []
  for (let map of maps) {
    let ranges = []
    let start = 0
    for (let [dst, src, count] of map) {
      if (start < src) ranges.push([start, src - 1, start, src - 1])
      ranges.push([src, src + count - 1, dst, dst + count - 1])
      start = src + count
    }
    ranges.push([start, Infinity, start, Infinity])
    arr.push(ranges)
  }
  return arr
}

const fn = (lines: string[]) => {
  let seedVals = lines[0].split(':')[1].trim().split(' ').map((n) => parseInt(n)) // prettier-ignore
  let seeds = []
  for (let i = 0; i < seedVals.length; i += 2) seeds.push([seedVals[i], seedVals[i] + seedVals[i + 1] - 1])
  lines = lines.splice(2)
  let maps: number[][][] = []
  let currMap = []
  for (let line of lines) {
    if (/[0-9]/.test(line[0])) currMap.push(line.split(' ').map((n) => parseInt(n)))
    else if (currMap.length) {
      maps.push(currMap)
      currMap = []
    }
  }
  if (currMap.length) maps.push(currMap)
  for (let map of maps) map.sort((a, b) => a[1] - b[1])
  const ranges = mapsToRanges(maps)
  for (let range of ranges) range.sort((a, b) => a[0] - b[0])

  const rangeToRanges = ([min, max]: number[], index = 0) => {
    if (index > ranges.length - 1) return min
    let next = []
    for (let [s1, e1, s2, e2] of ranges[index]) {
      if ((min >= s1 && min <= e1) || (max >= s1 && max <= e1)) {
        let start = Math.max(min, s1)
        let end = Math.min(max, e1)
        let fromStart = start - s1
        let fromEnd = e1 - end
        next.push([s2 + fromStart, e2 === Infinity ? end : e2 - fromEnd])
      }
    }
    let res = Infinity
    for (let range of next) res = Math.min(res, rangeToRanges(range, index + 1))
    return res
  }

  let min = Infinity
  for (let seed of seeds) {
    min = Math.min(min, rangeToRanges(seed))
  }

  return min
}

console.log(fn(input1))
