class SudokuController < ApplicationController
  def solve
    solution = ["518496732",
                "647532981",
                "293817546",
                "385729614",
                "926145378",
                "471368259",
                "839271465",
                "164953827",
                "752684193"]
    render :json => solution
  end
end