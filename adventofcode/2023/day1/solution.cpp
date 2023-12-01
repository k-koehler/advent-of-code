#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <map>

using std::cout;
using std::map;
using std::string;
using std::vector;

bool starts_with(string a, string b)
{
  if (a.size() < b.size())
  {
    return false;
  }
  for (std::size_t i = 0; i < b.size(); i++)
  {
    if (a[i] != b[i])
    {
      return false;
    }
  }
  return true;
}

vector<string> read_input()
{
  std::ifstream input("input.txt");
  vector<string> lines;
  string line;
  while (std::getline(input, line))
  {
    lines.push_back(line);
  }
  return lines;
}

int get_digit_part1(string line)
{
  string digit_string = "";
  for (auto c : line)
  {
    if (isdigit(c))
    {
      digit_string += c;
    }
  }
  auto first = digit_string[0];
  auto last = digit_string[digit_string.size() - 1];
  auto digit_string_first_last = string(1, first) + string(1, last);
  return std::stoi(digit_string_first_last);
}

int get_digit_part2(string line)
{
  map<string, char> digit_map;
  digit_map["one"] = '1';
  digit_map["two"] = '2';
  digit_map["three"] = '3';
  digit_map["four"] = '4';
  digit_map["five"] = '5';
  digit_map["six"] = '6';
  digit_map["seven"] = '7';
  digit_map["eight"] = '8';
  digit_map["nine"] = '9';
  vector<char> digits;
  for (std::size_t i = 0; i < line.size(); i++)
  {
    auto ch = line[i];
    if (isdigit(ch))
    {
      digits.push_back(ch);
      continue;
    }
    auto remaining = line.substr(i);
    if (remaining.size() < 3)
    {
      continue;
    }
    map<string, char>::iterator it;
    for (it = digit_map.begin(); it != digit_map.end(); it++)
    {
      auto key = it->first;
      auto value = it->second;
      if (starts_with(remaining, key))
      {
        digits.push_back(value);
        i += key.size() - 2;
        break;
      }
    }
  }
  auto first = digits[0];
  auto last = digits[digits.size() - 1];
  auto digit_string_first_last = string(1, first) + string(1, last);
  return std::stoi(digit_string_first_last);
}

int part1(
    vector<string> lines)
{
  int sum = 0;
  for (auto line : lines)
  {
    sum += get_digit_part1(line);
  }
  return sum;
}

int part2(
    vector<string> lines)
{
  int sum = 0;
  for (auto line : lines)
  {
    sum += get_digit_part2(line);
  }
  return sum;
}

int main()
{
  auto lines = read_input();
  cout << part1(lines) << "\n";
  cout << part2(lines) << "\n";
  return 0;
}
