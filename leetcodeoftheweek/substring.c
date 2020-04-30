#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct state {
  char accept;
  struct state *next;
} state;

struct state *build(char *S) {
  struct state *begin, *cur;
  begin = cur = malloc(sizeof(struct state *));
  for (int i = 0; i < strlen(S); ++i) {
    cur->accept = S[i];
    cur->next = malloc(sizeof(struct state *));
    cur = cur->next;
  }
  return begin;
}

bool eat(char *start_char, struct state *sm) {
  char *it = start_char;
  for (struct state *cur = sm; cur->next != NULL; cur = cur->next, ++it)
    if (cur->accept != *it)
      return false;
  return true;
}

bool substring(char *S, char *sub) {
  struct state *sm = build(sub);
  for (int i = 0; i < strlen(S); ++i)
    if (eat(S + i, sm))
      return true;
  return false;
}

int main(int argc, char **argv) {
  char *S = argv[1];
  char *sub = argv[2];
  if (substring(S, sub))
    printf("yes\n");
  else
    printf("no\n");
  return EXIT_SUCCESS;
}