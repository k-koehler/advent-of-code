import Regex from "./regex.ts";

const {
  args: [pattern, test],
} = Deno;

console.log(new Regex(pattern).test(test));
