#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char const *FILENAME = "input.in";
int const HALT = 99;

void exit_with_error(char const *err_msg) {
  printf(err_msg, stderr);
  exit(1);
}

typedef enum {
  ADD = 1,
  MUL,
} OPERATOR_TYPE;

typedef enum {
  OPERATOR = 0,
  L_OPERAND,
  R_OPERAND,
  STORE_RESULT,
} OPCODE_TYPE;

int get_opcode(char const *str_rep) {
  int opcode = strtol(str_rep, NULL, 10);
  return opcode;
}

int *get_registers(char *const text, int *size) {
  int *registers = malloc(256 * sizeof(int));
  int *counter = malloc(sizeof counter);
  for (char *cur = strtok((char *)text, ","); cur != NULL;
       cur = strtok(NULL, ",")) {
    registers[(*counter)++] = get_opcode(cur);
  }
  size = counter;
  return registers;
}

int increment_opcode_type(OPCODE_TYPE type) { return (++type) % 4; }

int eval(char *const text) {
  struct EvalState {
    OPCODE_TYPE current_type;
    OPERATOR_TYPE *operator_type;
    int *lreg_pos;
    int *rreg_pos;
    int *res_pos;
  } eval_state;
  eval_state.current_type = OPERATOR;
  int reg_size;
  int *registers = get_registers(text, &reg_size);
  for (int i = 0; i < reg_size; ++i) {
    if (registers[i] == HALT) {
      break;
    }
    switch (eval_state.current_type) {
    case OPERATOR:
      eval_state.operator_type = &registers[i];
      break;
    case L_OPERAND:
      eval_state.lreg_pos = &registers[i];
      break;
    case R_OPERAND:
      eval_state.rreg_pos = &registers[i];
      break;
    case STORE_RESULT:;
      int out_reg = registers[i];
      switch (*eval_state.operator_type) {
      case ADD:
        registers[out_reg] =
            registers[*eval_state.lreg_pos] + registers[*eval_state.rreg_pos];
        break;
      case MUL:
        registers[out_reg] =
            registers[*eval_state.lreg_pos] * registers[*eval_state.rreg_pos];
        break;
      }
      break;
    }
    eval_state.current_type = increment_opcode_type(eval_state.current_type);
  }
  int const result = registers[0];
  free(registers);
  return result;
}

char *read_file() {
  FILE *fp;
  if ((fp = fopen(FILENAME, "r")) == NULL) {
    exit_with_error("error opening file\n");
  }
  char *buf = malloc(sizeof(char) * 256);
  fscanf(fp, "%s", buf);
  return buf;
}

int main(void) {
  char *file_contents = read_file();
  printf("The value of the first register is: %d\n", eval(file_contents));
  free(file_contents);
  return EXIT_SUCCESS;
}
