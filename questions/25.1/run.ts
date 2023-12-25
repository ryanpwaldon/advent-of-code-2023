let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

const format = (text: string) => {
  let groups = text.split('\n').map((line) => {
    let [left, right] = line.split(':').map((n) => n.trim())
    return [left, right.split(' ')] as [string, string[]]
  })
  let list: Record<string, string[]> = {}
  for (let [key, nodes] of groups) {
    list[key] = list[key] ?? []
    for (let node of nodes) {
      if (list[key].includes(node)) continue
      list[key].push(node)
    }
    for (let node of nodes) {
      list[node] = list[node] ?? []
      if (list[node].includes(key)) continue
      list[node].push(key)
    }
  }
  return list
}

type Graph = Record<string, string[]>

function findSplittingPairs(graph: Graph): [string, string][] | null {
  function DFS(node: string, visited: Set<string>, graph: Graph): void {
    visited.add(node)
    ;(graph[node] || []).forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        DFS(neighbor, visited, graph)
      }
    })
  }

  function isConnected(graph: Graph): boolean {
    const visited = new Set<string>()
    const startNode = Object.keys(graph)[0]
    DFS(startNode, visited, graph)
    return visited.size === Object.keys(graph).length
  }

  function isConnectedAfterRemoval(graph: Graph, node1: string, node2: string): boolean {
    // Temporarily modify the graph
    const tempGraph = { ...graph }
    tempGraph[node1] = tempGraph[node1].filter((n) => n !== node2)
    tempGraph[node2] = tempGraph[node2].filter((n) => n !== node1)

    return isConnected(tempGraph)
  }

  function findCombinations(graph: Graph): [string, string][] | null {
    const nodes = Object.keys(graph)
    // Iterate through all possible combinations of three pairs of nodes
    for (let i = 0; i < nodes.length - 5; i++) {
      for (let j = i + 1; j < nodes.length - 4; j++) {
        for (let k = j + 1; k < nodes.length - 3; k++) {
          for (let l = k + 1; l < nodes.length - 2; l++) {
            for (let m = l + 1; m < nodes.length - 1; m++) {
              for (let n = m + 1; n < nodes.length; n++) {
                const pairs: [string, string][] = [
                  [nodes[i], nodes[j]],
                  [nodes[k], nodes[l]],
                  [nodes[m], nodes[n]],
                ]
                const allDisconnected = pairs.every((pair) => !isConnectedAfterRemoval(graph, pair[0], pair[1]))
                if (allDisconnected && !isConnected(graph)) {
                  return pairs
                }
              }
            }
          }
        }
      }
    }
    return null
  }

  // Main execution starts here
  return findCombinations(graph)
}

const graph = format(input)
console.log(JSON.stringify(graph))
const splittingPairs = findSplittingPairs(graph)
console.log(splittingPairs)
