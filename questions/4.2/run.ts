let file = Bun.file(Bun.resolveSync('./resources/schematic.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = ['467..114..', '...*......', '..35..633.', '......#...', '617*......', '.....+.58.', '..592.....', '......755.', '...$.*....', '.664.598..']

const fn = (grid: string[]) => {}

console.log(fn(input2))
