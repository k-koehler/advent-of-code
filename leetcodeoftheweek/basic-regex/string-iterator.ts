import Char from "./char.ts";

export default class StringIterator {
  private string: string;
  private idx: number;
  constructor(string: string) {
    this.string = string;
    this.idx = 0;
  }
  next(): Char | null {
    let i;
    if (this.string[(i = this.idx++)]) return new Char(this.string[i]);
    return null;
  }
}
