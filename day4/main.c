
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>

static int const START = 240920;
static int const END = 789857;
static int const DIGIT_SIZE = 6;

static inline int int_pow(int base, int exp) {
  int result = 1;
  while (1) {
    if (exp & 1)
      result *= base;
    exp >>= 1;
    if (!exp)
      break;
    base *= base;
  }
  return result;
}

static inline int next_digit(int num, int i) {
  return (num % int_pow(10, i + 1)) / int_pow(10, i);
}

static inline bool check_num1(int num) {
  int prev = INFINITY, has_repeating_digits = false;
  for (int i = 0, cur = next_digit(num, i); i < DIGIT_SIZE;
       prev = cur, cur = next_digit(num, ++i)) {
    if (cur > prev) {
      return false;
    }
    if (cur == prev) {
      has_repeating_digits = true;
    }
  };
  return has_repeating_digits;
}

static inline bool check_num2(int num) {
  int prev = INFINITY, repeating_digits[] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
  for (int i = 0, cur = next_digit(num, i); i < DIGIT_SIZE;
       prev = cur, cur = next_digit(num, ++i)) {
    if (cur > prev) {
      return false;
    }
    if (cur == prev) {
      ++repeating_digits[cur];
    }
  };
  for (int i = 0; i < 10; ++i) {
    if (repeating_digits[i] == 1) {
      return true;
    }
  }
  return false;
}

int main() {
  int valid_words_counter1 = 0, valid_words_counter2 = 0;
  for (int i = START; i < END; ++i) {
    if (check_num1(i))
      ++valid_words_counter1;
    if (check_num2(i))
      ++valid_words_counter2;
  }
  printf("(part1) valid passwords=%d\n", valid_words_counter1);
  printf("(part2) valid passwords=%d\n", valid_words_counter2);
  return 0;
}