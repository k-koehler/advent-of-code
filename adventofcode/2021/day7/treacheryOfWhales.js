const fs = require("fs");

const positions = fs
  .readFileSync("puzzle.in")
  .toString()
  .split(",")
  .map(Number);
const MIN = Math.min(...positions);
const MAX = Math.max(...positions);

function dist(a, b) {
  return Math.abs(a - b);
}

function triangularDist(a, b) {
  const n = dist(a, b);
  return (n * (n + 1)) / 2;
}

function solve(distanceFunction) {
  let min = Infinity;
  for (let i = MIN; i <= MAX; ++i) {
    let potentialMin = 0;
    for (const p of positions) {
      potentialMin += distanceFunction(i, p);
    }
    if (potentialMin < min) {
      min = potentialMin;
    }
  }
  return min;
}

console.log("part1", solve(dist));
console.log("part2", solve(triangularDist));
