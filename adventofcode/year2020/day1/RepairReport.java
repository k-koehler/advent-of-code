package adventofcode.year2020.day1;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class RepairReport {

  private static ArrayList<Integer> readFile(final String filename) throws FileNotFoundException {
    var file = new File(filename);
    var list = new ArrayList<Integer>();
    var scanner = new Scanner(file);
    while (scanner.hasNextLine()) {
      list.add(Integer.parseInt(scanner.nextLine()));
    }
    scanner.close();
    return list;
  }

  private static void part1(final ArrayList<Integer> entries) {
    for (final var i : entries) {
      for (final var j : entries) {
        if (i + j == 2020) {
          System.out.println(i * j);
          return;
        }
      }
    }
  }

  private static void part2(final ArrayList<Integer> entries) {
    for (final var i : entries) {
      for (final var j : entries) {
        for (final var k : entries) {
          if (i + j + k == 2020) {
            System.out.println(i * j * k);
            return;
          }
        }
      }
    }
  }

  public static void main(String[] args) throws Exception {
    var entries = readFile("puzzle.in");
    part1(entries);
    part2(entries);
  }
}