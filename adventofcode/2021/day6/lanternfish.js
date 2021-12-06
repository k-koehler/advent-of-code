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
    this.#state = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    for (const fish of state) {
      this.#state[fish]++;
    }
  }

  next() {
    const newState = {};
    for (const [key, value] of Object.entries(this.#state)) {
      if (key == 0) {
        continue;
      }
      newState[key - 1] = value;
    }
    newState[LANTERNFISH_TIME_TO_SPAWN] += this.#state[0];
    newState[LANTERNFISH_NEWLY_BORN_TIME_TO_SPAWN] = this.#state[0];
    this.#state = newState;
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
