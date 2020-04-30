#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

int const LAYER_WIDTH = 25;
int const LAYER_HEIGHT = 6;

typedef struct {
  int count_zeroes, count_ones, count_twos;
} LayerCounter;

void read_file(char buf[]) {
  FILE *fp;
  if ((fp = fopen("input.in", "r")) == NULL) {
    printf("err opening file", stderr);
    exit(EXIT_FAILURE);
  }
  fscanf(fp, "%s", buf);
}

int main(void) {
  char input_buf[14695];
  LayerCounter min = {.count_zeroes = 0, .count_ones = 0, .count_twos = 0};
  for(
  return EXIT_SUCCESS;
}