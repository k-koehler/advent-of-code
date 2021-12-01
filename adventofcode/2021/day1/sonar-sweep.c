#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define INPUT_SIZE 2000

void read_data(int *buf)
{
  char *line = NULL;
  size_t read, len = 0;
  FILE *fp = fopen("input.txt", "r");
  for (int i = 0; read = getline(&line, &len, fp) != -1; ++i)
  {
    buf[i] = atoi(line);
  }
}

int get_window_value(int *data, int i)
{
  return (i >= 0 && i < INPUT_SIZE) ? data[i] : 0;
}

int main()
{
  int increases = 0, prev_win = -1, data[INPUT_SIZE];
  read_data(data);
  for (int i = 1; i < INPUT_SIZE - 1; ++i)
  {
    int cur_win = get_window_value(data, i - 1) + get_window_value(data, i) + get_window_value(data, i + 1);
    if (prev_win == -1)
      goto next;
    if (cur_win > prev_win)
      ++increases;
  next:
    prev_win = cur_win;
  }
  printf("%d", increases);
}