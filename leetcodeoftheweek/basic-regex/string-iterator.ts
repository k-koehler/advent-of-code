import Char from "./char.ts";

export default class StringIterator<T> {
  private string: string;
  private idx: number;
  private mapper?: (c: Char) => T;
  constructor(string: string, mapper: (c: Char) => T) {
    this.string = string;
    this.idx = 0;
    this.mapper = mapper;
  }
  nextChar(): Char | null {
    let i;
    if (this.string[(i = this.idx++)]) return new Char(this.string[i]);
    return null;
  }

  next(): T | null {
    if (!this.mapper) throw new Error("no mapper");
    const c = this.nextChar();
    return c ? this.mapper(c) : null;
  }
}
