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
    let legal_moves = this.board.getLegalMoves(current_board)
    
    return getRandomItem(legal_moves)
  }
  //======================================================================
  
  
}