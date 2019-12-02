#include <stdio.h>
#include <stdlib.h>

const char **FILENAME = "input.in";
const unsigned int INPUT_SIZE = 100;

unsigned int *read_file() {
  FILE *fp;
  if ((fp = fopen(FILENAME, "r")) == NULL) {
    printf("err opening file", stderr);
    return EXIT_FAILURE;
  }
  unsigned int module_masses[INPUT_SIZE];
  char line[256];
  size_t counter = 0;
  while (fgets(line, sizeof(line), fp)) {
    module_masses[counter++] = strtoul(line, NULL, 10);
  }
  fclose(fp);
  return module_masses;
}

unsigned int calculate_mass(unsigned int mass) { return (mass / 3) - 2; }

int main() {
  int *masses = read_file();
  unsigned int total_fuel = 0;
  for (size_t i = 0; i < INPUT_SIZE; ++i) {
    total_fuel += calculate_mass(masses[i]);
  }
  printf("The total fuel requirement is: %d!", total_fuel);
  return EXIT_SUCCESS;
}