let input = await Bun.file(Bun.resolveSync('./input.txt', import.meta.dir)).text()

type Vector = [[number, number, number], [number, number, number]]

const format = (text: string) => {
  let rows = text.split('\n').map((row) => row.split('@').map((vector) => vector.split(',').map((n) => parseInt(n)))) as Vector[]
  return rows
}

const intersection = ([[x1, y1], [vx1, vy1]]: Vector, [[x2, y2], [vx2, vy2]]: Vector) => {
  // Calculate the coefficients of the equations
  const a = vx1
  const b = -vx2
  const c = vy1
  const d = -vy2

  // Calculate the constant terms
  const e = x2 - x1
  const f = y2 - y1

  // Calculate the determinants
  const det = a * d - b * c
  const det_t = e * d - b * f
  const det_s = a * f - e * c

  // Check if the vectors are parallel or identical (det == 0 means no unique solution)
  if (det === 0) {
    return null
  } else {
    // Calculate the time of intersection for both vectors
    const t = det_t / det // time for vector A
    const s = det_s / det // time for vector B

    // Calculate the intersection point using time t
    const intersectionX = x1 + t * vx1
    const intersectionY = y1 + t * vy1

    return [intersectionX, intersectionY, t, s]
  }
}

// prettier-ignore
const solve = (input: string) => {
  let vectors = format(input)
  let count = 0
  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      let intersect = intersection(vectors[i], vectors[j])
      if (!intersect) continue
      let [x, y, t, s] = intersect
      if (x >= 200000000000000 && x <= 400000000000000 && y >= 200000000000000 && y <= 400000000000000 && t >= 0 && s >= 0) count++
    }
  }
  return count
}

const ans = solve(input)
console.log(ans)
