import Sym from "./sym.ts";

export default class State {
  public symbol: Sym;

  constructor(symbol: Sym) {
    this.symbol = symbol;
  }

  public eat(s: Sym | null) {
    if (s === null) return false;
    if (this.symbol.char === ".") return true;
    switch (s.char) {
      default:
        return s.char === this.symbol.char;
    }
  }

  public toString() {
    return this.symbol.toString();
  }
}
