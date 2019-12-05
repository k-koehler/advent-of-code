#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "input.h"

typedef struct {
  double x, y;
} Vertex;

typedef struct {
  Vertex *start;
  Vertex *end;
} LineSegment;

static inline double *new_double(double x) {
  double *double_p = malloc(sizeof(double));
  *double_p = x;
  return double_p;
}

static inline Vertex *new_vertex(double x, double y) {
  Vertex *vertex = malloc(sizeof(vertex));
  vertex->x = x;
  vertex->y = y;
  return vertex;
}

static inline LineSegment *new_line_segment(Vertex *start, Vertex *end) {
  LineSegment *line_segment = malloc(sizeof(line_segment));
  line_segment->start = start;
  line_segment->end = end;
  return line_segment;
}

LineSegment **read_vertices(Vertex *cur, char *const directions[],
                            size_t const num_directions,
                            size_t *num_line_segements) {
  LineSegment **lines = malloc(sizeof(LineSegment) * 256);
  *num_line_segements = 0;
  for (size_t i = 0; i < num_directions; ++i) {
    char direction = directions[i][0];
    char *const dir_amt_str = {&directions[i][1]};
    double direction_amount = strtod(dir_amt_str, NULL);
    Vertex *next;
    if (direction == 'U') {
      next = new_vertex(cur->x, cur->y + direction_amount);
    } else if (direction == 'D') {
      next = new_vertex(cur->x, cur->y - direction_amount);
    } else if (direction == 'R') {
      next = new_vertex(cur->x + direction_amount, cur->y);
    } else {
      next = new_vertex(cur->x - direction_amount, cur->y);
    }
    LineSegment *line = new_line_segment(cur, next);
    lines[(*num_line_segements)++] = line;
    cur = next;
  }
  return lines;
}

static inline double manhattan_distance(Vertex *const p, Vertex *const q) {
  return fabs(p->x - q->x) + fabs(p->y - q->y);
}

static inline double euclidean_distance(Vertex *const p, Vertex *const q) {
  return sqrt(pow((p->x - q->x), 2) + pow((p->y - q->y), 2));
}

static inline bool const lies_on_line(LineSegment *line, Vertex *vertex) {
  return euclidean_distance(line->start, vertex) +
             euclidean_distance(vertex, line->end) ==
         euclidean_distance(line->start, line->end);
}

static inline Vertex *const iterate_line(LineSegment *line, int current_index) {
  double const length = manhattan_distance(line->start, line->end);
  if (current_index >= length) {
    return NULL;
  }
  Vertex *next_vertex = malloc(sizeof(next_vertex));
  next_vertex->x = line->start->x;
  next_vertex->y = line->start->y;
  if (line->start->x < line->end->x) {
    next_vertex->x += current_index;
  } else if (line->start->x > line->end->x) {
    next_vertex->x -= current_index;
  } else if (line->start->y < line->end->y) {
    next_vertex->y += current_index;
  } else if (line->start->y > line->end->y) {
    next_vertex->y -= current_index;
  }
  return next_vertex;
}

Vertex *naive_find_intersect(LineSegment *line1, LineSegment *line2) {
  Vertex *cur;
  int current_index = 1;
  for (int current_index = 0;
       (cur = iterate_line(line1, current_index)) != NULL; ++current_index) {
    if (lies_on_line(line2, cur)) {
      return cur;
    }
    free(cur);
  }
  return NULL;
}

double *shortest_manhattan_distance_intersect(Vertex *start,
                                              LineSegment **wire1,
                                              size_t wire_1_size,
                                              LineSegment **wire2,
                                              size_t wire_2_size) {
  double *shortest_dist = NULL;
  for (size_t i = 0; i < wire_1_size; ++i) {
    for (size_t j = 0; j < wire_2_size; ++j) {
      LineSegment *const line1 = (wire1[i]);
      LineSegment *const line2 = (wire2[j]);
      if (line1->start->x == 0 || line2->start->x == 0 ||
          line1->start->y == 0 || line2->start->y == 0) {
        continue;
      }
      Vertex *const intersect = naive_find_intersect(line1, line2);
      if (intersect == NULL) {
        continue;
      }
      double intersect_start_dist = manhattan_distance(start, intersect);
      if (shortest_dist == NULL || intersect_start_dist < *shortest_dist) {
        shortest_dist = new_double(intersect_start_dist);
      }
    }
  }
  return shortest_dist;
}

int main() {
  Vertex *central_node = new_vertex(0, 0);
  size_t wire_1_size, wire_2_size;
  LineSegment **wire1 = read_vertices(central_node, d1, D_SIZE, &wire_1_size);
  LineSegment **wire2 = read_vertices(central_node, d2, D_SIZE, &wire_2_size);
  double *const shortest_dist = shortest_manhattan_distance_intersect(
      central_node, wire1, wire_1_size, wire2, wire_2_size);
  if (shortest_dist == NULL) {
    printf("No intersection!\n");
    goto cleanup;
  }
  printf("shortest distance=%d\n", (int)(*shortest_dist));
cleanup:
  free(wire1);
  free(wire2);
  free(shortest_dist);
  return EXIT_SUCCESS;
}