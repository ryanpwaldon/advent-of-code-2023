import { MinPriorityQueue } from '@datastructures-js/priority-queue'
let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let grid = text.split('\n').map((row) => row.split('').map((str) => parseInt(str)))
  return grid
}

const coordToIndex = (r: number, c: number, grid: number[][]) => {
  let cCount = grid[0].length
  return r * cCount + c
}

// prettier-ignore
const solve = (input: string) => {
  let grid = format(input)
  let rCount = grid.length
  let cCount = grid[0].length
  let total = rCount * cCount
  let list: Record<string, [number, number, string][]> = {}
  for (let i = 0; i < total; i++) {
    let r = Math.floor(i / cCount)
    let c = i % cCount
    let right = grid[r][c + 1]
    let left = grid[r][c - 1]
    let up = grid[r - 1]?.[c]
    let down = grid[r + 1]?.[c]
    list[i] = []
    if (right) list[i].push([coordToIndex(r, c + 1, grid), right, 'right'])
    if (left) list[i].push([coordToIndex(r, c - 1, grid), left, 'left'])
    if (up) list[i].push([coordToIndex(r - 1, c, grid), up, 'up'])
    if (down) list[i].push([coordToIndex(r + 1, c, grid), down, 'down'])
  }
  let distances = Array(total).fill(Infinity)
  distances[0] = 0
  let queue = new MinPriorityQueue<[number, number]>(([_, cost]) => cost)
  queue.enqueue([0, 0])
  while (queue.size()) {
    let [id, cost] = queue.dequeue()
    if (cost > distances[id]) continue
    for (const [nid, ncost, d] of list[id]) {
      const dist = cost + ncost
      if (dist < distances[nid]) {
        distances[nid] = dist
        queue.enqueue([nid, dist])
      }
    }
  }
  return distances[distances.length - 1]
}

const ans = solve(input)
console.log(ans)
