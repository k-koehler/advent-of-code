import State from "./state.ts";
import Sym from "./sym.ts";

export default class Machine {
  private readonly firstState: State;
  private currentState: State;

  constructor(firstState: State) {
    this.firstState = firstState;
    this.currentState = firstState;
  }

  public eat(sym: Sym) {
    if (this.currentState.next !== null && this.currentState.next.eat(sym)) {
      this.currentState = this.currentState.next;
      return true;
    }
    return false;
  }

  public get done() {
    return !!this.currentState.next?.symbol.end;
  }

  private fail() {
    this.currentState = this.firstState;
  }
}
