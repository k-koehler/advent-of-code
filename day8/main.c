#include <stdio.h>
#include <stdlib.h>

int const LAYER_WIDTH = 25;
int const LAYER_HEIGHT = 6;

typedef struct {
  int count_ones;
  int countes_twos;
} LayerCounter;

void read_file(char buf[]) {
  FILE *fp;
  if ((fp == fopen("input.in", "r")) == NULL) {
    printf("err opening file", stderr);
    exit(EXIT_FAILURE);
  }
  fscanf(fp, "%s", buf);
}

LayerCounter *count_next_layer(char picture[], int const layer,
                               LayerCounter *const layer_counter) {
  int current_index = LAYER_WIDTH * layer;
  int const LAST_INDEX = LAYER_WIDTH * (layer + 1);
  for (int i = current_index; i < last_index; ++i) {
    if(picture[
  }
}

int main(void) { char input_buf[14695]; }