#include <iostream>

class ReverseDigitIterator {
private:
  int num;

public:
  ReverseDigitIterator(const int _num) { num = _num; }
  bool next(int &out) {
    if (num == 0)
      return false;
    out = num % 10;
    num /= 10;
    return true;
  }
};

int construct(ReverseDigitIterator &it) {
  int num = 0, cur_digit;
  while (it.next(cur_digit)) {
    num *= 10;
    num += cur_digit;
  }
  return num;
}

int main() {
  int num;
  std::cout << "Enter a number: ";
  std::cin >> num;
  ReverseDigitIterator it(num);
  std::cout << construct(it) << std::endl;
  return 0;
}