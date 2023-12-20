let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

// prettier-ignore
const format = (text: string) => {
  let rows = text.split('\n')
  let broadcaster = rows.find(row => row.startsWith('broadcaster'))?.split('->')[1].split(',').map((node) => node.trim())!
  rows.splice(rows.findIndex(row => row.startsWith('broadcaster')), 1)
  let nodes: Record<string, { type: '%' | '&', on: boolean, inputs: string[], outputs: string[] }> = {}
  for (let row of rows) {
    let type = row[0] as "%" | "&"
    row = row.substring(1)
    let node = row.split('->')[0].trim()
    nodes[node] = { type, on: false, inputs: [], outputs: [] }
  }
  for (let row of rows) {
    row = row.substring(1)
    let node = row.split('->')[0].trim()
    let outputs = row.split('->')[1].split(',').map((name) => name.trim())
    nodes[node].outputs = outputs
    for (let neighbour of outputs) if (neighbour in nodes) nodes[neighbour].inputs.push(node)
  }
  return {broadcaster, nodes}
}

const solve = (input: string) => {
  let { broadcaster, nodes } = format(input)
  let done = false
  let presses = 0

  const traverse = (queue: [string, 'low' | 'high'][]) => {
    while (queue.length) {
      let [node, pulse] = queue.shift()!
      if (node === 'rx' && pulse === 'low') done = true
      if (node in nodes) {
        let type = nodes[node].type
        let inputs = nodes[node].inputs
        let outputs = nodes[node].outputs
        if (type === '%') {
          if (pulse === 'high') continue
          nodes[node].on = !nodes[node].on
          let nextPulse: 'low' | 'high' = nodes[node].on ? 'high' : 'low'
          for (let output of outputs) queue.push([output, nextPulse])
        } else {
          let nextPulse: 'low' | 'high' = inputs.every((input) => nodes[input].on) ? 'low' : 'high'
          nodes[node].on = nextPulse === 'high'
          for (let output of outputs) queue.push([output, nextPulse])
        }
      }
    }
  }

  while (!done) {
    presses++
    traverse(broadcaster.map((node) => [node, 'low']))
  }

  return presses
}

const ans = solve(input)
console.log(ans)
