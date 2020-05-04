import Char from "./char.ts";

export type StateTester = (c: Char) => boolean;

export default class State {
  public transitions: State[];
  public test: (c: Char) => boolean;

  constructor(transitions: State[] = [], test?: StateTester) {
    this.transitions = transitions;
    this.test = test || (() => true);
  }

  public eat(c: Char | null) {
    if (c === null) return null;
    for (const transition of this.transitions)
      if (transition.test(c)) return transition;
    return null;
  }

  public get done() {
    return this.transitions.length === 0;
  }

  public static getTester(strchar: string): StateTester {
    switch (strchar) {
      case ".":
        return () => true;
      default:
        return ({ char }) => char === strchar;
    }
  }
}
