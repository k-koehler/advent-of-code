const fs = require("fs");

const LANTERNFISH_TIME_TO_SPAWN = 6;
const LANTERNFISH_NEWLY_BORN_TIME_TO_SPAWN = 8;

const initialState = fs
  .readFileSync("puzzle.in")
  .toString()
  .split(",")
  .map(Number);

class Simulator {
  #state;

  constructor(state) {
    this.#state = new Array(LANTERNFISH_NEWLY_BORN_TIME_TO_SPAWN + 1).fill(0);
    for (const fish of state) {
      this.#state[fish]++;
    }
  }

  next() {
    const spawningFish = this.#state[0];
    this.#state.shift();
    this.#state.push(spawningFish);
    this.#state[LANTERNFISH_TIME_TO_SPAWN] += spawningFish;
  }

  simulateDays(n) {
    for (let i = 0; i < n; ++i) {
      this.next();
    }
  }

  solution() {
    return Object.values(this.#state).reduce((acc, cur) => acc + cur, 0);
  }
}

{
  const simuator = new Simulator(initialState);
  simuator.simulateDays(80);
  console.log("part1=", simuator.solution());
}

{
  const simuator = new Simulator(initialState);
  simuator.simulateDays(256);
  console.log("part2=", simuator.solution());
}
