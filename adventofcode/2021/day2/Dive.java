import java.nio.file.*;
import java.util.*;

enum CommandType {
  Forward,
  Down,
  Up
}

class Command {
  final public CommandType type;
  final public int magnitude;

  Command(final CommandType type, final int magnitude){
    this.type = type;
    this.magnitude = magnitude;
  }
}

class Commands implements Iterable<Command> {
  final Iterator<Command> it;

  Commands() throws Exception {
    it = Files.readAllLines(Paths.get("puzzle.in")).stream().map(stringCommand -> {
      var commandParts = stringCommand.split(" ");
      var type = commandParts[0];
      var magnitude = commandParts[1];
      return new Command(
        type.equals("forward") ? CommandType.Forward : type.equals("down") ? CommandType.Down : CommandType.Up,
        Integer.parseInt(magnitude)
      );
    }).iterator();
  }

  public Iterator<Command> iterator(){
    return it;
  }
}

abstract class Submarine {
  protected int forwardPosition = 0;
  protected int depth = 0;
  protected int aim = 0;

  public abstract void receiveCommand(final Command Command);
  
  public int solution(){
    return forwardPosition * depth;
  }
}

class SubmarinePart1 extends Submarine {
  @Override
  public void receiveCommand(final Command command){
    switch(command.type){
      case Forward:
        forwardPosition += command.magnitude;
        return;
      case Down:
        depth += command.magnitude;
        return;
      case Up:
        depth -= command.magnitude;
        return;
    }
  }
}

class SubmarinePart2 extends Submarine {
  @Override
  public void receiveCommand(final Command command){
    switch(command.type){
      case Forward:
        forwardPosition += command.magnitude;
        depth += aim * command.magnitude;
        return;
      case Down:
        aim += command.magnitude;
        return;
      case Up:
        aim -= command.magnitude;
        return;
    }
  }
}

public class Dive {
  public static void main(String[] args) throws Exception {
    {
      // p1
      var commands = new Commands();
      var submarine = new SubmarinePart1();
      for(var command: commands){
        submarine.receiveCommand(command);
      }
      System.out.println(submarine.solution());
    }

    {
      // p2
      var commands = new Commands();
      var submarine = new SubmarinePart2();
      for(var command: commands){
        submarine.receiveCommand(command);
      }
      System.out.println(submarine.solution());
    }
  }
}