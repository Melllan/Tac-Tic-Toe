class gameAI{
  AI_List = {
    "random":this.AI_RANDOM,
    "grabby":this.AI_GRABBY,
    "blocky":this.AI_BLOCKY,
    "looky":this.AI_LOOKY,
    "deep_look":this.AI_DEEP_LOOK,
  }
  constructor(name, depth){
    this.name = name
    this.depth = depth
  }
  //AI API call
  getAIMove(current_board, current_player, opponent){
    return this.AI_List[this.name](current_board, current_player, opponent, this.depth)
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
    let legal_moves = getLegalMoves(current_board)
    return getRandomItem(legal_moves)
  }

  
}