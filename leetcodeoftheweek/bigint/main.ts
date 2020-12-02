function add(x: string, y: string) {
  let digits: number[] = [],
    carry = false,
    maxLen = Math.max(x.length, y.length),
    i = maxLen - 1;
  x = x.padStart(maxLen, "0");
  y = y.padStart(maxLen, "0");
  for (; i !== -1; --i) {
    let digit: number = (+x[i] || 0) + (+y[i] || 0) + Number(carry);
    carry = digit > 9;
    digits.unshift(digit % 10);
  }
  let res = carry ? "1" : "";
  for (const digit of digits) {
    res += digit;
  }
  return res;
}

if (
  add(
    BigInt(Number.MAX_VALUE).toString(),
    BigInt(Number.MAX_VALUE).toString(),
  ) !==
    (BigInt(Number.MAX_VALUE) + BigInt(Number.MAX_VALUE)).toString()
) {
  throw new Error("add doesn't work");
}
