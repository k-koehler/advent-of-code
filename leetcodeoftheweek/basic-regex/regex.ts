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
    const machine = new Machine();
    const it = new StringIterator<State>(
      this.pattern,
      (c) => new State(new Sym({ char: c }))
    );
    let prev = new State(Sym.startSym());
    let cur: State | null = null;
    while (prev && (cur = it.next())) {
      machine.addTransition([prev, cur]);
      prev = cur;
    }
    machine.addTransition([prev, new State(Sym.endSym())]);
    return machine;
  }

  public test(testString: string): boolean {
    const it = new StringIterator<State>(
      testString,
      (c) => new State(new Sym({ char: c }))
    );
    for (let s = it.next(); s !== null; s = it.next()) {
      this.machine.eat(s);
      if (this.machine.done) return true;
    }
    return false;
  }
}
