let file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir))
let text = await file.text()
let lines = text.split('\n')

const determinePossibleGames = (games: string[], red: number, green: number, blue: number) => {
  let possibleGames = []
  for (let line of games) {
    let gameId = parseInt(line.split(':')[0].substring(5))
    let isPossible = true
    let sets = line
      .split(':')[1]
      .split(';')
      .map((set) => set.trim())
    for (let set of sets) {
      let counts = set.split(',').map((count) => count.trim())
      let redCount = parseInt(counts.find((count) => count.includes('red')) ?? '0')
      let greenCount = parseInt(counts.find((count) => count.includes('green')) ?? '0')
      let blueCount = parseInt(counts.find((count) => count.includes('blue')) ?? '0')
      if (redCount > red || greenCount > green || blueCount > blue) {
        isPossible = false
        break
      }
    }
    if (isPossible) possibleGames.push(gameId)
  }
  return possibleGames.reduce((sum, id) => sum + id, 0)
}

console.log(determinePossibleGames(lines, 12, 13, 14))
