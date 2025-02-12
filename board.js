class Board {
  constructor(row_count, col_count) {
    this.x = 20
    this.y = 300
    this.row_count = row_count
    this.col_count = col_count
    this.square_size = 20
    this.Blank_color = "white"
    this.X_color = "crimson"
    this.O_color = "darkturquoise"
    this.board_data = []
    for (let r = 0; r < this.row_count; r++){
      let new_row = []
      for(let c=0; c<this.col_count; c++){
        new_row.push(this.O_color)
      }
      this.board_data.push(new_row)
    }

  }
  //Setters

  //Getters

  //Click Handlers
  // Returns whether the Mouse is within the bounds of the Board
  hasMouse() {
    let betweenLR = this.x < mouseX && mouseX < this.x + (this.col_count * this.square_size)
    let betweenTB = this.y < mouseY && mouseY < this.y + (this.row_count * this.square_size)
    return betweenLR && betweenTB
  }
  //Returns the index of the ROW the Mouse is over (can return off-grid values)
  mouseRow() {
    return Math.floor((mouseY - this.y) / this.square_size)
  }
  //Returns the index of the COLUMN the Mouse is over (can return off-grid values)
  mouseCol() {
    return Math.floor((mouseX - this.x) / this.square_size)
  }
  //This is how the board will respond to being clicked on.
  handleClick() {
    if (this.hasMouse()){
      let [row, col] = [this.mouseRow(), this.mouseCol()]
      this.board_data[row][col] = this.X_color
    }
  }
  //Drawing
  draw() {
    push()
    fill(this.Blank_color)
    if (this.hasMouse()) {
      stroke("purple")
    }
    for (let r = 0; r < this.row_count; r++) {
      for (let c = 0; c < this.col_count; c++) {
        fill(this.board_data[r][c])
        let x = this.x + c * this.square_size
        let y = this.y + r * this.square_size
        rect(x, y, this.square_size, this.square_size)
      }
    }
    if (this.hasMouse()) {
      fill("black")
      let x = this.x + this.mouseCol() * this.square_size
      let y = this.y + this.mouseRow() * this.square_size
      rect(x, y, this.square_size, this.square_size)
    }
    pop()
  }
}