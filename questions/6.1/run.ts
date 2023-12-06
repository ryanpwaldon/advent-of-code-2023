let a = [
  [7, 9],
  [15, 40],
  [30, 200],
]

let b = [
  [53, 275],
  [71, 1181],
  [78, 1215],
  [80, 1524],
]

const main = (results: number[][]) => {
  let possibilities = []
  for (let [time, distance] of results) {
    let count = 0
    for (let i = 0; i <= time; i++) {
      let timeLeft = time - i
      let dist = i * timeLeft
      if (dist > distance) count++
    }
    possibilities.push(count)
  }
  return possibilities.reduce((p, val) => p * val, 1)
}

console.log(main(b))

// time allowed for each race
// best distance ever recorded in that race
// go farther
