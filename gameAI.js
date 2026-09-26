class gameAI{
  //Sadness :`( (Object reference becomes static to gameAI Class when functions are called through this list)
  // this.AI_List = {
  //   "random":this.AI_RANDOM,
  //   "grabby":this.AI_GRABBY,
  //   "blocky":this.AI_BLOCKY,
  //   "looky":this.AI_LOOKY,
  //   "deep_look":this.AI_DEEP_LOOK,
  // }
  
  constructor(board, name, depth){
    this.board = board //Use only for method calls
    this.name = name
    this.depth = depth
  }
  //AI API call
  getAIMove(){
    console.log("beginning function: getAIMove")
    console.log("View of 'this' from within getAIMove:",this)
    console.log("AI's Board:",this.board)
    console.log("AI's Name:",this.name)
    switch(this.name) {
      case "random":
        return this.AI_RANDOM(this.board.board_data, this.board.current_player, this.board.opponent, this.depth)
    }
    //return this.AI_List[this.name](this.board.board_data, this.board.current_player, this.board.opponent, this.depth)
  }
  //Helper Functions
  getRandomItem(list){
    return list[Math.floor(Math.random()*list.length)]
  }

  getEmptySquares(board_array){
    return gameRules.getOwnedSquares(board_array, this.board.Blank_Player.id)
  }

  copy2DArray(array_2d){
    return array_2d.map(row => row.slice())
  }
  //---------------------------------------------------------------------
  // AI FUNCTIONS IMPLEMENTED HERE
  //---------------------------------------------------------------------
  //======================================================================
  //Random AI, just picks a random move from the list of legal moves.
  AI_RANDOM(current_board, current_player, opponent, depth){
    console.log("beginning function: AI_RANDOM")
    console.log("view of 'this' from within AI_RANDOM",this)
    console.log("Ai's Board:",this.board)
    console.log("Legal Moves:",this.board.getLegalMoves(current_board))
    let legal_moves = this.gameRules.getLegalMoves(current_board)
    
    return getRandomItem(legal_moves)
  }

  AI_GRABBY(current_board, current_player, opponent){
    // console.log("AI_GRABBY", current_player)
    let legal_moves = this.board.getLegalMoves(current_board)
    //If there is a move that will make the player win, return that.
    for(let move of legal_moves){
      //create a copy of the board, and play the move on the copy
      // console.log("move:",move)
      let copy_of_board = copy2DArray(current_board)
      makeMove(copy_of_board, move, current_player)
      if(boardHasWin(copy_of_board, current_player)){
        return move
      } 
    }
    //If the loop ends with no victory, return a random legal move
    return getRandomItem(legal_moves)
    
  }
  //======================================================================
  
  
}