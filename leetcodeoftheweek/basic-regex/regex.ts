import StringIterator from "./string-iterator.ts";
import Machine from "./machine.ts";
import State from "./state.ts";
import Sym from "./sym.ts";

export default class Regex {
  private pattern: string;
  private machine: Machine;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.machine = this.compile();
  }

  private compile() {
    const firstState = new State(Sym.startSym());
    const it = new StringIterator(this.pattern, (c) => new Sym({ char: c }));
    let cur = firstState;
    for (let s = it.next(); s !== null; s = it.next()) {
      cur = cur.next = new State(s);
    }
    cur.next = new State(Sym.endSym());
    return new Machine(firstState);
  }

  public test(testString: string): boolean {
    const it = new StringIterator(testString, (c) => new Sym({ char: c }));
    for (let s = it.next(); s !== null; s = it.next()) {
      this.machine.eat(s);
      if (this.machine.done) {
        return true;
      }
    }
    return false;
  }
}
