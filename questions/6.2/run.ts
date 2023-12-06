let a = [71530, 940200]
let b = [53717880, 275118112151524]

const main = ([time, distance]: number[]) => {
  let left = 0
  let right = time
  for (let i = 0; i <= time; i++) {
    let timeLeft = time - i
    let dist = i * timeLeft
    if (dist > distance) {
      left = i
      break
    }
  }
  for (let i = time; i >= 0; i--) {
    let timeLeft = time - i
    let dist = i * timeLeft
    if (dist > distance) {
      right = i
      break
    }
  }
  return right - left + 1
}

console.log(main(b))
