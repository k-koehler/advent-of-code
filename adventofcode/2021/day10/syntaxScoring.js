const fs = require("fs");

class Stack {
  #arr = [];
  push(x) {
    this.#arr.push(x);
  }
  pop() {
    return this.#arr.pop();
  }
  peek() {
    return this.#arr[this.#arr.length - 1];
  }
}

const OperandType = {
  Left: 1,
  Right: -1,
};

const TokenType = {
  Parens: 0,
  Brackets: 1,
  Braces: 2,
  Carets: 3,
};

const tokenTypePointsSynaxErrorPoints = {
  [TokenType.Parens]: 3,
  [TokenType.Brackets]: 57,
  [TokenType.Braces]: 1197,
  [TokenType.Carets]: 25137,
};

const tokenTypePointsAutocompleteScores = {
  [TokenType.Parens]: 1,
  [TokenType.Brackets]: 2,
  [TokenType.Braces]: 3,
  [TokenType.Carets]: 4,
};

class Token {
  constructor(char) {
    this.char = char;
    switch (char) {
      case "(":
      case ")":
        this.type = TokenType.Parens;
        this.operandType = char === "(" ? OperandType.Left : OperandType.Right;
        break;
      case "[":
      case "]":
        this.type = TokenType.Brackets;
        this.operandType = char === "[" ? OperandType.Left : OperandType.Right;
        break;
      case "{":
      case "}":
        this.type = TokenType.Braces;
        this.operandType = char === "{" ? OperandType.Left : OperandType.Right;
        break;
      case "<":
      case ">":
        this.type = TokenType.Carets;
        this.operandType = char === "<" ? OperandType.Left : OperandType.Right;
        break;
    }
  }
}

class TokenReader {
  #stack = new Stack();

  ok(token) {
    if (token.operandType === OperandType.Left) {
      return true;
    } else {
      const last = this.#stack.peek();
      return last.type === token.type;
    }
  }

  accept(token) {
    if (token.operandType === OperandType.Left) {
      this.#stack.push(token);
    } else {
      this.#stack.pop();
    }
  }

  autoCompleteScore() {
    let cur;
    let points = 0;
    while ((cur = this.#stack.pop())) {
      points = points * 5 + tokenTypePointsAutocompleteScores[cur.type];
    }
    return points;
  }
}

// part 1
const lines = fs.readFileSync("puzzle.in").toString().split("\n");
const readers = [];
let points = 0;
for (const line of lines) {
  const reader = new TokenReader();
  let lineIsComplete = true;
  for (const char of line) {
    const token = new Token(char);
    if (reader.ok(token)) {
      reader.accept(token);
    } else {
      lineIsComplete = false;
      points += tokenTypePointsSynaxErrorPoints[token.type];
      break;
    }
  }
  if (lineIsComplete) {
    readers.push(reader);
  }
}
console.log("part1=", points);

// part 2
const autoCompleteScores = readers
  .map((reader) => reader.autoCompleteScore())
  .sort((a, b) => a - b);
console.log(
  "part2=",
  autoCompleteScores[Math.trunc(autoCompleteScores.length / 2)]
);
