import Sym from "./sym.ts";

export default class State {
  public symbol: Sym;
  public next: State | null;

  constructor(symbol: Sym, next: State | null = null) {
    this.symbol = symbol;
    this.next = next;
  }

  public eat(s: Sym | null) {
    if (s === null) return false;
    if (this.symbol.start) return true;
    if (this.symbol.char === ".") return true;
    if (this.symbol.char === "*") return true;
    return s.char === this.symbol.char;
  }

  public toString() {
    return this.symbol.toString();
  }
}
