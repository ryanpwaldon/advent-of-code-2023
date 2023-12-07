let file = Bun.file(Bun.resolveSync('./resources/document.txt', import.meta.dir))
let text = await file.text()

let input1 = text.split('\n')
let input2 = []

const main = (lines: string[]) => {}

console.log(main(input1))
