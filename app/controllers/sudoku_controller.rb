require 'phg_sudoku_solver'
require 'json'

class SudokuController < ApplicationController
  def solve

    data = params[:data]

    max_iterations = params[:maxiter].to_i


    a = JSON.parse(data)
    sudoku = Sudoku.new(a);
    sudoku.set_max_iterations(max_iterations);
    solved, @iterations = sudoku.solve()
    logger.info('Solution found.')
    logger.info(solved)


    render :json => solved
  end
end