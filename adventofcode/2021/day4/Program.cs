using System;
using System.Collections.Generic;
using System.IO;

static class Constants
{
  public const int BOARD_W = 5;
  public const int BOARD_H = 5;
}

class OptionalBingoSolution
{
  public bool Solved;
  public int Solution;
}

class BingoTile
{
  public bool Called;
  public int Value;
}

class BingoBoard
{
  private BingoTile[,] board = new BingoTile[Constants.BOARD_W, Constants.BOARD_H];

  public BingoBoard(int[,] values)
  {
    for (var i = 0; i < Constants.BOARD_W; ++i)
    {
      for (var j = 0; j < Constants.BOARD_H; ++j)
      {
        board[i, j] = new BingoTile { Value = values[i, j], Called = false };
      }
    }
  }

  private void Search(int value, Action<BingoTile> cb)
  {
    foreach (var tile in board)
    {
      if (tile.Value == value)
      {
        cb(tile);
        break;
      }
    }
  }

  private void Call(int value)
  {
    Search(value, tile => tile.Called = true);
  }

  private bool IsSolved()
  {
    // check rows
    for (var i = 0; i < Constants.BOARD_W; i++)
    {
      int counter = 0;
      for (var j = 0; j < Constants.BOARD_H; ++j)
      {
        if (board[i, j].Called)
        {
          counter++;
        }
      }
      if (counter == Constants.BOARD_W)
      {
        return true;
      }
    }

    // check cols
    for (var i = 0; i < Constants.BOARD_H; i++)
    {
      int counter = 0;
      for (var j = 0; j < Constants.BOARD_W; ++j)
      {
        if (board[j, i].Called)
        {
          counter++;
        }
      }
      if (counter == Constants.BOARD_H)
      {
        return true;
      }
    }

    return false;
  }

  public OptionalBingoSolution MaybeSolve(int value)
  {
    Call(value);
    if (!IsSolved())
    {
      return new OptionalBingoSolution
      {
        Solved = false
      };
    }
    int sum = 0;
    foreach (var tile in board)
    {
      if (!tile.Called)
      {
        sum += tile.Value;
      }
    }
    return new OptionalBingoSolution
    {
      Solved = true,
      Solution = sum * value
    };
  }
}

abstract class Game
{
  protected List<BingoBoard> Boards = new List<BingoBoard>();
  protected List<int> Values = new List<int>();

  public Game()
  {
    string[] lines = File.ReadAllLines("puzzle.in");
    foreach (var coord in lines[0].Split(','))
    {
      this.Values.Add(int.Parse(coord));
    }
    var currentBoard = new int[5, 5];
    var i = 0;
    foreach (var line in lines[2..^0])
    {
      if (line == "")
      {
        this.Boards.Add(new BingoBoard(currentBoard));
        currentBoard = new int[5, 5];
        i = 0;
        continue;
      }
      int j = 0;
      foreach (var coord in line.Split(" ", StringSplitOptions.RemoveEmptyEntries))
      {
        currentBoard[i, j++] = int.Parse(coord);
      }
      i++;
    }
  }

  public abstract int Play();
}

class GamePart1 : Game
{
  public override int Play()
  {
    foreach (var value in this.Values)
    {
      foreach (var board in this.Boards)
      {
        var maybeSolution = board.MaybeSolve(value);
        if (maybeSolution.Solved)
        {
          return maybeSolution.Solution;
        }
      }
    }
    throw new Exception("no solution");
  }
}

class GamePart2 : Game
{
  public override int Play()
  {
    foreach (var value in this.Values)
    {
      for (var i = 0; i < this.Boards.Count; ++i)
      {
        var maybeSolution = this.Boards[i].MaybeSolve(value);
        if (maybeSolution.Solved)
        {
          if (this.Boards.Count == 1)
          {
            return maybeSolution.Solution;
          }
          else
          {
            this.Boards.RemoveAt(i);
          }
        }
      }
    }
    throw new Exception("no solution");
  }
}

class GiantSquid
{

  public static void Main()
  {
    {
      var game = new GamePart1();
      var solution = game.Play();
      Console.WriteLine("part1=" + solution.ToString());
    }
    {
      var game = new GamePart2();
      var solution = game.Play();
      Console.WriteLine("part2=" + solution.ToString());
    }
  }
}