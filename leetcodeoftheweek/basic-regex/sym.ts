import Char from "./char.ts";

let symId = 0;

export default class Sym {
  public c?: Char;
  public start: boolean;
  public end: boolean;
  private id: number;
  constructor({
    char,
    start,
    end,
  }: {
    char?: Char;
    start?: boolean;
    end?: boolean;
  }) {
    this.c = char;
    this.start = !!start;
    this.end = !!end;
    this.id = symId++;
  }

  public get char() {
    return this.c?.char;
  }

  public static startSym() {
    return new Sym({ start: true });
  }

  public static endSym() {
    return new Sym({ end: true });
  }

  public toString() {
    return this.start ? "START" : this.end ? "END" : this.char;
  }

  public equals(s: Sym) {
    return this.char === s.char;
  }
}
