require 'phg_sudoku_solver'
require 'json'

class SudokuController < ApplicationController
  def solve

    # !Something is wrong with this.
    data = params[:data]

    # ["5xx4x67xx","xxx5xx9xx","2xxx17x4x","xxx72xx1x","9xxxxxxx8","x7xx68xxx","x3x27xxx5","xx4xx3xxx","xx26x4xx3"]
    # ["x23xxx59x","x41xxx36x","xxxx4xxxx","xx2x9x8xx","6x8xxx7x9","9xx386xx2","x5xxxxx2x","xx6xxx4xx","xxx265xxx"]
    a = JSON.parse(data)


    sudoku = Sudoku.new(a);
    sudoku.set_max_iterations(10000);
    solved, @iterations = sudoku.solve()
    logger.info('Solution found.')
    logger.info(solved)


    render :json => solved
  end
end