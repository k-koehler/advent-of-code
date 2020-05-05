class Node<T> {
  public data: T;
  public next: null | Node<T>;
  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

export default class List<T> {
  private hd: null | Node<T>;
  private tl: null | Node<T>;

  public constructor() {
    this.hd = null;
    this.tl = null;
  }

  public add(val: T) {
    if (!this.tl) {
      this.hd = new Node(val);
      this.tl = this.hd;
      return this;
    }
    this.tl.next = new Node(val);
    this.tl = this.tl.next;
  }

  public get front() {
    if (!this.hd) {
      throw new Error("empty list");
    }
    return this.hd.data;
  }

  public get back() {
    if (!this.tl) {
      throw new Error("empty list");
    }
    return this.tl.data;
  }

  *[Symbol.iterator]() {
    let cur = this.hd;
    while (cur !== null) {
      yield cur.data;
      cur = cur.next;
    }
  }
}
