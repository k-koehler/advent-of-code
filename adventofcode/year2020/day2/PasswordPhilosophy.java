package adventofcode.year2020.day2;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class PasswordPhilosophy {
  private static ArrayList<Password> readFile(final String filename) throws FileNotFoundException {
    var file = new File(filename);
    var list = new ArrayList<Password>();
    var scanner = new Scanner(file);
    while (scanner.hasNextLine()) {
      list.add(Password.fromInputString(scanner.nextLine()));
    }
    scanner.close();
    return list;
  }

  private static void part1(final ArrayList<Password> passwords) {
    var count = 0;
    for (final var pw : passwords) {
      if (pw.isValidPart1()) {
        ++count;
      }
    }
    System.out.print("(part1) valid passwords=");
    System.out.println(count);
  }

  private static void part2(final ArrayList<Password> passwords) {
    var count = 0;
    for (final var pw : passwords) {
      if (pw.isValidPart2()) {
        ++count;
      }
    }
    System.out.print("(part2) valid passwords=");
    System.out.println(count);
  }

  public static void main(String[] args) throws Exception {
    var passwords = readFile("puzzle.in");
    part1(passwords);
    part2(passwords);
  }
}

class Password {
  final char requiredChar;
  final int a;
  final int b;
  final String password;

  public Password(final char requiredChar, final int min, final int max, final String password) {
    this.requiredChar = requiredChar;
    this.a = min;
    this.b = max;
    this.password = password;
  }

  public boolean isValidPart1() {
    int count = 0;
    for (final var ch : password.toCharArray()) {
      if (ch == requiredChar) {
        count++;
      }
    }
    return count >= a && count <= b;
  }

  public boolean isValidPart2() {
    int count = 0;
    if (password.charAt(a - 1) == requiredChar) {
      ++count;
    }
    if (password.charAt(b - 1) == requiredChar) {
      ++count;
    }
    return count == 1;
  }

  public static Password fromInputString(final String inputString) {
    int cursor = 0;
    char cur;

    String minStr = "";
    while ((cur = inputString.charAt(cursor++)) != '-') {
      minStr += cur;
    }
    int min = Integer.parseInt(minStr);

    String maxStr = "";
    while ((cur = inputString.charAt(cursor++)) != ' ') {
      maxStr += cur;
    }
    int max = Integer.parseInt(maxStr);

    char requiredChar = (cur = inputString.charAt(cursor++));
    String password = inputString.substring(cursor + 2);

    return new Password(requiredChar, min, max, password);
  }

  public String toString() {
    return password;
  }
}
