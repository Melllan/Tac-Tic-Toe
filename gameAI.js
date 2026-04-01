class gameAI{
  AI_List = {
    "random":this.AI_RANDOM,
    "grabby":this.AI_GRABBY,
    "blocky":this.AI_BLOCKY,
    "looky":this.AI_LOOKY,
    "deep_look":this.AI_DEEP_LOOK,
  }
  constructor(board, name, depth){
    this.board = board //Use only for method calls
    this.name = name
    this.depth = depth
  }
  //AI API call
  getAIMove(){
    console.log("Getting AI Move")
    console.log("AI Data",this)
    console.log("AI's Board:",this.board)
    return this.AI_RANDOM(this.board.board_data, this.board.current_player, this.board.opponent, this.depth)
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
    console.log("AI_RANDOM")
    console.log("Ai's Board:",this.board)
    //console.log("Legal Moves:",this.board.getLegalMoves(current_board))
    //let legal_moves = this.board.getLegalMoves(current_board)
    
    return [2,1]//getRandomItem(legal_moves)
  }
  //======================================================================
  
  
}