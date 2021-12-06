const fs = require("fs");

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  hash() {
    return `${this.x},${this.y}`;
  }
}

class LineSegment {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  #verticalPoints() {
    if (this.a.x != this.b.x) {
      return [];
    }
    let [start, end] = [this.a.y, this.b.y].sort();
    const vertices = [this.a, this.b];
    while (++start < end) {
      vertices.push(new Vertex(this.a.x, start));
    }
    return vertices;
  }

  #horizontalPoints() {
    if (this.a.y != this.b.y) {
      return [];
    }
    let [start, end] = [this.a.x, this.b.x].sort();
    const vertices = [this.a, this.b];
    while (++start < end) {
      vertices.push(new Vertex(start, this.a.y));
    }
    return vertices;
  }

  points() {
    return [...this.#horizontalPoints(), ...this.#verticalPoints()];
  }
}

class OceanFloor {
  #map = {};

  accept(line) {
    for (const point of line.points()) {
      const newValue = (this.#map[point.hash()] || 0) + 1;
      this.#map[point.hash()] = newValue;
    }
  }

  solve() {
    let counter = 0;
    for (const value of Object.values(this.#map)) {
      if (value > 1) {
        counter++;
      }
    }
    return counter;
  }
}

function readPuzzle() {
  function readCoord(coord) {
    const [x, y] = coord.split(",");
    return new Vertex(+x, +y);
  }
  const lineSegments = [];
  for (const line of fs.readFileSync("puzzle.in").toString().split("\n")) {
    const [a, b] = line.replace(/\s/g, "").split("->");
    lineSegments.push(new LineSegment(readCoord(a), readCoord(b)));
  }
  return lineSegments;
}

const lines = readPuzzle();
const oceanFloor = new OceanFloor();
for (const line of lines) {
  oceanFloor.accept(line);
}
console.log(oceanFloor.solve());
