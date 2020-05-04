export default class Char {
  private c: string;
  constructor(char: string) {
    if (char.length !== 1) throw new Error("invalid use of char");
    this.c = char;
  }

  public get char() {
    return this.c;
  }
}
