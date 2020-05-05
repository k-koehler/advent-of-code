import State from "./state.ts";
import Sym from "./sym.ts";

export default class Machine {
  private transitions: [State, State][];
  private currentState: State;

  constructor() {
    this.currentState = new State(Sym.startSym());
    this.transitions = [];
  }

  public addTransition(transition: [State, State]) {
    this.transitions.push(transition);
  }

  public eat(state: State) {
    for (const [s1, s2] of this.transitions)
      if (
        s1.symbol.char === this.currentState.symbol.char &&
        s2.eat(state.symbol)
      ) {
        return void (this.currentState = s2);
      }
    return void this.fail();
  }

  public get done() {
    for (const [s1, s2] of this.transitions) {
      if (this.currentState.symbol.equals(s1.symbol) && s2.symbol.end) {
        return true;
      }
    }
    return false;
  }

  private fail() {
    this.currentState = new State(Sym.startSym());
  }
}
