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

const solve = (input: string) => {
  let { workflows, parts } = format(input)

  const traverse = (part: Record<string, number>, workflow: string = 'in'): boolean => {
    for (let condition of workflows[workflow]) {
      if (typeof condition === 'string') {
        if (condition === 'R') return false
        else if (condition === 'A') return true
        else return traverse(part, condition)
      } else {
        let [key, sign, val, res] = condition
        if (sign === '<') {
          if (part[key] < val) {
            if (res === 'R') return false
            else if (res === 'A') return true
            else return traverse(part, res)
          }
        } else if (sign === '>') {
          if (part[key] > val) {
            if (res === 'R') return false
            else if (res === 'A') return true
            else return traverse(part, res)
          }
        } else throw new Error()
      }
    }
    throw new Error()
  }

  let sum = 0
  for (let part of parts) {
    if (traverse(part)) sum += part.x + part.m + part.a + part.s
  }
  return sum
}

const ans = solve(input)
console.log(ans)
