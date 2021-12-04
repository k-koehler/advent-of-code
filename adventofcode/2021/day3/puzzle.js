const fs = require("fs");

const DIAGNOSTIC_REPORT_WIDTH = 12;

const disagnosticReport = fs.readFileSync("puzzle.in").toString().split("\n");

// part 1

class FrequencyCounter {
  #num0s;
  #num1s;

  constructor() {
    this.#num0s = 0;
    this.#num1s = 0;
  }

  accept(bit) {
    if (bit === "0") {
      ++this.#num0s;
    } else {
      ++this.#num1s;
    }
  }

  mostFrequent() {
    return this.#num0s > this.#num1s ? "0" : "1";
  }

  leastFrequent() {
    return this.#num0s > this.#num1s ? "1" : "0";
  }
}

const freqs = new Array(DIAGNOSTIC_REPORT_WIDTH)
  .fill(0)
  .map(() => new FrequencyCounter());

for (const report of disagnosticReport) {
  for (let i = 0; i < DIAGNOSTIC_REPORT_WIDTH; ++i) {
    freqs[i].accept(report[i]);
  }
}

const gamma = parseInt(freqs.map((freq) => freq.mostFrequent()).join(""), 2);
const epsilon = parseInt(freqs.map((freq) => freq.leastFrequent()).join(""), 2);

console.log("part1=", gamma * epsilon);

// part 2

class BitCriteriaHolder {
  #candidates;
  #type;

  constructor(candidates, type) {
    this.#candidates = candidates;
    this.#type = type;
  }

  #filter(bitIdx) {
    const zeros = [],
      ones = [];
    for (const candidate of this.#candidates) {
      if (candidate[bitIdx] === "0") {
        zeros.push(candidate);
      } else {
        ones.push(candidate);
      }
    }
    const more = zeros.length > ones.length ? zeros : ones;
    const less = zeros.length > ones.length ? ones : zeros;
    this.#candidates = this.#type === "more" ? more : less;
  }

  solve() {
    for (let i = 0; i < DIAGNOSTIC_REPORT_WIDTH; ++i) {
      this.#filter(i);
      if (this.#candidates.length === 1) {
        break;
      }
    }

    return parseInt(this.#candidates[0], 2);
  }
}

new BitCriteriaHolder(disagnosticReport, "less").solve();

console.log(
  "part2=",
  new BitCriteriaHolder(disagnosticReport, "more").solve() *
    new BitCriteriaHolder(disagnosticReport, "less").solve()
);
