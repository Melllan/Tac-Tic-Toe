//Requires p5.js to run
//=============================================================
class Board {
  constructor(row_count, col_count, run_limit) {
    this.x = 20
    this.y = 300
    this.row_count = row_count
    this.col_count = col_count
    this.run_limit = run_limit
    this.square_size = 20
    this.Blank_ID = 0
    this.X_ID = 1
    this.O_ID = 2
    this.Blank_color = "white"
    this.X_color = "crimson"
    this.O_color = "darkturquoise"
    this.colors = {}
    this.colors[this.Blank_ID] = this.Blank_color
    this.colors[this.X_ID] = this.X_color
    this.colors[this.O_ID] = this.O_color
    
    this.Blank_player = {name:"Blank", color:this.Blank_color, id:this.Blank_ID}
    this.X_player = {name:"X", color:this.X_color, id:this.X_ID}
    this.O_player = {name:"O", color:this.O_color, id:this.O_ID}
    // this.X_player["name"] = "X"
    this.players = {}
    this.players[this.Blank_ID] = this.Blank_player
    this.players[this.X_ID] = this.X_player
    this.players[this.O_ID] = this.O_player
    
    this.current_player = this.X_player
    this.opponent = this.O_player
    
    this.board_data = []
    //Fill Empty Board
    for (let r = 0; r < this.row_count; r++){
      let new_row = []
      for(let c=0; c<this.col_count; c++){
        new_row.push(this.Blank_ID)
      }
      this.board_data.push(new_row)
    }

  }
  //Setters

  //Getters

  
  
  ///////////////////Game State Methods///////////////////////
  nextTurn(){
    let temp_current = this.current_player
    this.current_player = this.opponent
    this.opponent = temp_current
  }

  boardIsFull(){
    for(let row of this.board_data){
      for(let square of row){
        if(square == this.Blank_ID){
          return false
        }
      }
    }
    return true
  }
  
  //Returns whether the given player has won
  playerHasWon(player_id){
    let counter = 0
    //Check for Horizontal Victory
    for(let r=0; r<this.row_count; r++){
      counter = 0
      for(let c=0; c<this.col_count; c++){
        if(this.board_data[r][c] == player_id){
          counter ++
          if(counter == this.run_limit){
            return true
          }
        }
        else{
          counter = 0
        }
      }
    }

    //Check for Vertical Victory
    for(let c=0; c<this.col_count; c++){
      counter = 0
      for(let r=0; r<this.row_count; r++){
        if(this.board_data[r][c] == player_id){
          counter ++
          if(counter == this.run_limit){
            return true
          }
        }
        else{
          counter = 0
        }
      }
    }

    //Check for Major Diagonal Victory

    //Check for Minor Diagonal Victory
    
    
  }

  ///////////////////Click Handlers/////////////////////////////
  
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
      if (this.board_data[row][col] == this.Blank_ID){
        this.board_data[row][col] = this.current_player.id
        this.nextTurn()
      }
    }
  }
  //Drawing
  draw() {
    push()    
    for (let r = 0; r < this.row_count; r++) {
      for (let c = 0; c < this.col_count; c++) {
        let player_id = this.board_data[r][c]
        fill(this.players[player_id].color)
        let x = this.x + c * this.square_size
        let y = this.y + r * this.square_size
        rect(x, y, this.square_size, this.square_size)
      }
    }
    if (this.hasMouse()) {
      push()
      noFill()
      stroke("black")
      strokeWeight(2)
      let x = this.x + this.mouseCol() * this.square_size
      let y = this.y + this.mouseRow() * this.square_size
      rect(x, y, this.square_size, this.square_size)
      pop()
    }
    pop()
  }
}