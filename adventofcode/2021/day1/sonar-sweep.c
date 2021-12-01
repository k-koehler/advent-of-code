#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(){
  char* line = NULL; 
  size_t read, len = 0;
  int prev = - 1, increases = 0;
  FILE* fp = fopen("input.txt", "r");
  while ((read = getline(&line, &len, fp)) != -1) {
    int cur = atoi(line);
    if(prev == -1)
      goto next;
    if(cur > prev)
      ++increases;
next:
    prev = cur;
  }
  printf("%d", increases);
}