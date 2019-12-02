#include <stdio.h>
#include <stdlib.h>

const char *FILENAME = "input.in";
const int INPUT_SIZE = 100;

int *read_file() {
  FILE *fp;
  if ((fp = fopen(FILENAME, "r")) == NULL) {
    printf("err opening file", stderr);
    exit(EXIT_FAILURE);
  }
  int *module_masses = (int *)malloc(sizeof(int) * INPUT_SIZE);
  char line[256];
  size_t counter = 0;
  while (fgets(line, sizeof(line), fp)) {
    module_masses[counter++] = strtoul(line, NULL, 10);
  }
  fclose(fp);
  return module_masses;
}

int sgn(int x) { return x >= 0 ? x : 0u; }

int calculate_mass(int mass) { return (mass / 3) - 2; }

int part1(int *masses) {
  int total_fuel = 0;
  for (size_t i = 0; i < INPUT_SIZE; ++i) {
    total_fuel += calculate_mass(masses[i]);
  }
  return total_fuel;
}

int part2(int *masses) {
  int total_fuel = 0;
  for (size_t i = 0; i < INPUT_SIZE; ++i) {
    int fuel = sgn(calculate_mass(masses[i]));
    while (fuel != 0) {
      total_fuel += fuel;
      fuel = sgn(calculate_mass(fuel));
    }
  }
  return total_fuel;
}

int main() {
  int *masses = read_file();
  printf("The total fuel requirement for part 1 is: %d!", part1(masses));
  putc('\n', stdout);
  printf("The total fuel requirement for part 2 is: %d!", part2(masses));
  free(masses);
  return EXIT_SUCCESS;
}
