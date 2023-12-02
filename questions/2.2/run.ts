let file = Bun.file(Bun.resolveSync('./resources/games.txt', import.meta.dir))
let text = await file.text()
let lines = text.split('\n')
let testCase = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
]

const determinePossibleGames = (games: string[]) => {
  let powerSets = []
  for (let line of games) {
    let sets = line
      .split(':')[1]
      .split(';')
      .map((set) => set.trim())
    let redRequired = 0
    let greenRequired = 0
    let blueRequired = 0
    for (let set of sets) {
      let counts = set.split(',').map((count) => count.trim())
      let redCount = parseInt(counts.find((count) => count.includes('red')) ?? '0')
      let greenCount = parseInt(counts.find((count) => count.includes('green')) ?? '0')
      let blueCount = parseInt(counts.find((count) => count.includes('blue')) ?? '0')
      redRequired = Math.max(redRequired, redCount)
      greenRequired = Math.max(greenRequired, greenCount)
      blueRequired = Math.max(blueRequired, blueCount)
    }
    powerSets.push(redRequired * greenRequired * blueRequired)
  }
  return powerSets.reduce((sum, val) => sum + val, 0)
}

console.log(determinePossibleGames(lines))
