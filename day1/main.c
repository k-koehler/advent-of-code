#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef int64_t i64;

const char *FILENAME = "input.in";
const i64 INPUT_SIZE = 100;

i64 *read_file() {
  FILE *fp;
  if ((fp = fopen(FILENAME, "r")) == NULL) {
    printf("err opening file", stderr);
    exit(EXIT_FAILURE);
  }
  i64 *module_masses = (i64 *)malloc(sizeof(i64) * INPUT_SIZE);
  char line[256];
  size_t counter = 0;
  while (fgets(line, sizeof(line), fp)) {
    module_masses[counter++] = strtoul(line, NULL, 10);
  }
  fclose(fp);
  return module_masses;
}

i64 sgn(i64 x) { return x >= 0 ? x : 0u; }

i64 calculate_mass(i64 mass) { return (mass / 3) - 2; }

i64 part1(i64 *masses) {
  i64 total_fuel = 0;
  for (size_t i = 0; i < INPUT_SIZE; ++i) {
    total_fuel += sgn(calculate_mass(masses[i]));
  }
  return total_fuel;
}

i64 part2(i64 *masses) {
  i64 total_fuel = 0;
  for (size_t i = 0; i < INPUT_SIZE; ++i) {
    i64 fuel = sgn(calculate_mass(masses[i]));
    while (fuel != 0) {
      total_fuel += fuel;
      fuel = sgn(calculate_mass(fuel));
    }
  }
  return total_fuel;
}

int main() {
  i64 *masses = read_file();
  printf("The total fuel requirement for part 1 is: %d!", part1(masses));
  putc('\n', stdout);
  printf("The total fuel requirement for part 2 is: %d!", part2(masses));
  free(masses);
  return EXIT_SUCCESS;
}