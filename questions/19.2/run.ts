let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let rows = text.split('\n')
  let divider = rows.findIndex((row) => row === '')
  let warr = rows.slice(0, divider)
  let parr = rows.slice(divider + 1)
  let workflows: Record<string, Array<string | [string, string, number, string]>> = warr.reduce((workflows, string) => {
    let [name, rest] = string.split('{')
    rest = rest.substring(0, rest.length - 1)
    let conditions = rest.split(',')
    let processedConditions = conditions.map((cond) => {
      let hasCondition = cond.includes(':')
      if (hasCondition) {
        let [left, right] = cond.split(':')
        let a = left.substring(0, 1)
        let b = left.substring(1, 2)
        let c = parseInt(left.substring(2))
        return [a, b, c, right]
      } else return cond
    })
    return {
      [name]: processedConditions,
      ...workflows,
    }
  }, {})
  let parts = parr.map((string) => {
    string = string.substring(1, string.length - 1)
    let parts = string.split(',').map((i) => i.split('='))
    return Object.fromEntries(parts.map((part) => [part[0], parseInt(part[1])]))
  })
  return { workflows, parts }
}

let oppositeSign: Record<string, string> = {
  '>': '<',
  '<': '>',
}

const solve = (input: string) => {
  let { workflows } = format(input)
  let coms: [string, string, number][][] = []
  const traverse = (i = 0, name: string = 'in', com: [string, string, number][] = []): void => {
    let condition = workflows[name][i]
    if (!condition || condition === 'R') return
    else if (condition === 'A') {
      coms.push([...com])
      return
    } else if (typeof condition === 'string') {
      traverse(0, condition, com)
    } else {
      let [key, sign, num, res] = condition
      if (res === 'A') {
        com.push([key, sign, num])
        coms.push([...com])
        com.pop()
        com.push([key, sign === '<' ? '>' : '<', sign === '<' ? num - 1 : num + 1])
        traverse(i + 1, name, com)
        com.pop()
      } else if (res === 'R') {
        com.push([key, sign === '<' ? '>' : '<', sign === '<' ? num - 1 : num + 1])
        traverse(i + 1, name, com)
        com.pop()
      } else {
        com.push([key, sign, num])
        traverse(0, res, com)
        com.pop()
        com.push([key, sign === '<' ? '>' : '<', sign === '<' ? num - 1 : num + 1])
        traverse(i + 1, name, com)
        com.pop()
      }
    }
  }
  traverse()
  let ranges: Record<string, { min: number; max: number }>[] = []
  for (let com of coms) {
    let range: Record<string, { min: number; max: number }> = {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    }
    for (let [key, sign, num] of com) {
      if (sign === '<') range[key].max = num - 1
      else range[key].min = num + 1
    }
    ranges.push(range)
  }
  let combinations = 0
  for (let range of ranges) {
    let xVals = range.x.max - range.x.min + 1
    let mVals = range.m.max - range.m.min + 1
    let aVals = range.a.max - range.a.min + 1
    let sVals = range.s.max - range.s.min + 1
    combinations += xVals * mVals * aVals * sVals
  }
  return combinations
}

const ans = solve(input)
console.log(ans)
