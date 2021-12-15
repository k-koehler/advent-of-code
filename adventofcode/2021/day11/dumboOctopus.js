const fs = require("fs");

class Octopus {
  powerLevel;
  neigbours = [];
  #flashed = false;

  constructor(powerLevel) {
    this.powerLevel = powerLevel;
  }

  addNeighours(octopi) {
    this.neigbours.push(...octopi);
  }

  flash() {
    this.#flashed = true;
    for (const neighbour of this.neigbours) {
      neighbour.step();
    }
  }

  step() {
    ++this.powerLevel;
    if (!this.#flashed && this.powerLevel > 9) {
      this.flash();
    }
  }

  normalize() {
    const flashed = this.#flashed;
    if (flashed) {
      this.powerLevel = 0;
      this.#flashed = false;
    }
    return flashed;
  }
}

class Simulator {
  #octopi = [];

  constructor() {
    const puzzle = fs
      .readFileSync("puzzle.in")
      .toString()
      .split("\n")
      .map((numStr) => [...numStr].map(Number));

    for (let i = 0; i < puzzle.length; ++i) {
      for (let j = 0; j < puzzle[i].length; ++j) {
        const octopus = new Octopus(puzzle[i][j]);
        puzzle[i][j] = octopus;
      }
    }
    for (let i = 0; i < puzzle.length; ++i) {
      for (let j = 0; j < puzzle[i].length; ++j) {
        puzzle[i][j].addNeighours(
          [
            puzzle[i][j - 1],
            puzzle[i][j + 1],
            puzzle[i - 1]?.[j],
            puzzle[i - 1]?.[j - 1],
            puzzle[i - 1]?.[j + 1],
            puzzle[i + 1]?.[j],
            puzzle[i + 1]?.[j - 1],
            puzzle[i + 1]?.[j + 1],
          ].filter(Boolean)
        );
        this.#octopi.push(puzzle[i][j]);
      }
    }
  }

  part1(n) {
    let num = 0;
    for (let i = 0; i < n; ++i) {
      for (const octopus of this.#octopi) {
        octopus.step();
      }
      for (const octopus of this.#octopi) {
        if (octopus.normalize()) {
          ++num;
        }
      }
    }
    return num;
  }

  part2() {
    for (let i = 0; ; ++i) {
      for (const octopus of this.#octopi) {
        octopus.step();
      }
      let num = 0;
      for (const octopus of this.#octopi) {
        if (octopus.normalize()) {
          ++num;
        }
      }
      if (num === 100) {
        return i + 1 + 100;
      }
    }
  }
}

const simulator = new Simulator();
console.log(simulator.part1(100));
console.log(simulator.part2());
