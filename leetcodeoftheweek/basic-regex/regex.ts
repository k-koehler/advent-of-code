import State, { StateTester } from "./state.ts";
import StringIterator from "./string-iterator.ts";

export default class Regex {
  private pattern: string;
  private beginningState: State;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.beginningState = this.compile();
  }

  private compile() {
    let cur, begin;
    begin = cur = new State();
    for (const strchar of this.pattern) {
      const next = new State([]);
      cur.test = State.getTester(strchar);
      console.log(cur.transitions);
      cur.transitions.push(next);
      console.log(cur.transitions);
      cur = next;
    }
    return begin;
  }

  public test(testString: string): boolean {
    for (let i = 0; i < testString.length; ++i) {
      const it = new StringIterator(testString.slice(i));
      let state: State | null = this.beginningState;
      while ((state = state.eat(it.next()))) if (state.done) return true;
    }
    return false;
  }
}
