import State from "./state.ts";
import Sym from "./sym.ts";
import List from "./list.ts";

export default class Machine {
  private transitions: List<[State, State]>;
  private currentState: State;

  constructor() {
    this.currentState = new State(Sym.startSym());
    this.transitions = new List<[State, State]>();
  }

  public addTransition(transition: [State, State]) {
    this.transitions.add(transition);
  }

  public eat(state: State, fail: boolean = true) {
    for (const [s1, s2] of this.transitions)
      if (
        s1.symbol.char === this.currentState.symbol.char &&
        s2.eat(state.symbol)
      ) {
        return void (this.currentState = s2);
      }
    if (fail) return void this.fail();
  }

  public get done() {
    return this.eat(new State(Sym.endSym()), false);
  }

  private fail() {
    this.currentState = new State(Sym.startSym());
  }
}
