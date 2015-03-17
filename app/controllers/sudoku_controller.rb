require 'phg_sudoku_solver'
require 'json'

class SudokuController < ApplicationController
  def solve

    data = params[:data]

    a = JSON.parse(data)
    sudoku = Sudoku.new(a);
    sudoku.set_max_iterations(10000);
    solved, @iterations = sudoku.solve()
    logger.info('Solution found.')
    logger.info(solved)


    render :json => solved
  end
end