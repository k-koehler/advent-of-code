const fs = require("fs");

id = 0;
class HeightMapPoint {
  constructor(value) {
    this.value = value;
    this.neighbours = [];
    this.id = id++;
  }

  addNeighbours(points) {
    this.neighbours.push(...points);
  }

  isLowPoint() {
    return this.neighbours.every((neighbour) => this.value < neighbour.value);
  }

  riskLevel() {
    return 1 + this.value;
  }

  static basinSize(point, lookup = new Set()) {
    if (point.value === 9) {
      return [0, ""];
    }
    lookup.add(point.id);
    for (const neighbour of point.neighbours.filter((n) => n.value !== 9)) {
      if (!lookup.has(neighbour.id)) {
        HeightMapPoint.basinSize(neighbour, lookup);
      }
    }
    return [lookup.size, Array.from(lookup).sort().join()];
  }
}

class HeightMap {
  #points;
  constructor() {
    this.#points = [];
    const lines = fs
      .readFileSync("puzzle.in")
      .toString()
      .split("\n")
      .map((line) => [...line].map(Number));
    // first pass, create the points
    for (let i = 0; i < lines.length; ++i) {
      for (let j = 0; j < lines[i].length; ++j) {
        const point = new HeightMapPoint(lines[i][j]);
        lines[i][j] = point;
        this.#points.push(point);
      }
    }
    // second pass, connect the points
    for (let i = 0; i < lines.length; ++i) {
      for (let j = 0; j < lines[i].length; ++j) {
        const neighbours = [
          lines[i - 1]?.[j],
          lines[i + 1]?.[j],
          lines[i][j - 1],
          lines[i][j + 1],
        ].filter(Boolean);
        lines[i][j].addNeighbours(neighbours);
      }
    }
  }

  solvePart1() {
    let sum = 0;
    for (const point of this.#points) {
      if (point.isLowPoint()) {
        sum += point.riskLevel();
      }
    }
    return sum;
  }

  solvePart2() {
    const basinSizes = [];
    const basinLookups = new Set();
    for (const point of this.#points) {
      const [size, hash] = HeightMapPoint.basinSize(point);
      if (!basinLookups.has(hash)) {
        basinLookups.add(hash);
        basinSizes.push(size);
      }
    }
    const [a, b, c] = basinSizes.sort((a, b) => b - a);
    return a * b * c;
  }
}

console.log("part1=", new HeightMap().solvePart1());
console.log("part2=", new HeightMap().solvePart2());
