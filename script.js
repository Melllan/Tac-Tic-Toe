//=====================================================================
// Display Control Variables
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600

var GRID_SCALE = 50
var GRID_ROW_COUNT = 6
var GRID_COL_COUNT = 6
var RUN_LIMIT = 4
//Let's see if we can center the grid!
const GRID_TOP_MARGIN = (0.5*CANVAS_HEIGHT)-(0.5*GRID_ROW_COUNT*GRID_SCALE)
const GRID_LEFT_MARGIN = (0.5*CANVAS_WIDTH)-(0.5*GRID_COL_COUNT*GRID_SCALE)

const X = "crimson"
const O = "teal"
const BLANK = "white"

const TIE_COLOR = "mediumorchid"



//Create a 2D array with GRID_ROW_COUNT rows, and GRID_COL_COUNT columns
var GRID_DATA = []
var move_list = []
var X_TURN = true

var X_IS_HUMAN = true
var O_IS_HUMAN = false

var AI_NAME = "deep4"

var AI_scores_visible = false
var move_evaluation_list = []

//=====================================================================
// Functions
//---------------------------------------------------------------------

//Handle the procedures of ending one player's turn and beginning another's
function nextTurn(){
  X_TURN = !X_TURN
}

//Clears the grid data and resets the game
function resetBoard(current_board){
  for(let r=0; r< current_board.length; r+=1){
    for(let c=0; c< current_board[r].length; c+=1){
      current_board[r][c] = BLANK
    }    
  }
}

//Returns whether a given Row and Column are in the Grid
function inGrid(current_board,r,c){
  return 0<=r && r<current_board.length && 0<=c && c<current_board[r].length
}

//Returns true if the given player ID controls enough squares in a row
//example: if( playerHasWon(X) ){ doWinStuff() }
function playerHasWon(player){ 
  
  return boardHasWin(GRID_DATA,player)
}
//Calculate whether a given player has won in a given board-state.
function boardHasWin(current_board, player){
  let counter = 0
  let victory = false
  //Assumes Rectangular Boards Only!
  let row_count = current_board.length
  let col_count = current_board[0].length
  
  //Horizontal Victory...
  for(let r=0;r<row_count;r+=1){ //for each row...
    counter = 0
    for(let c=0; c<col_count; c+=1){ //for each column within the row...
      if(current_board[r][c] == player){
        counter ++
      }
      else{
        counter = 0
      }
      if(counter == RUN_LIMIT){ //Check for victory criteria
        victory = true
      }
    }
  }
  //Vertical Victory...
  for(let c=0;c<col_count; c+=1){
    counter = 0
    for(let r=0;r<row_count;r+=1){
      if(current_board[r][c] == player){
        counter ++
      }
      else{
        counter = 0
      }
      if(counter == RUN_LIMIT){ //Check for victory criteria
        victory = true
      }
    }
  }
  //Major Diagonal Victory...
  //create a for loop that counts from the smallest MD to the largest MD
  for(let D=-col_count+1; D<=row_count-1; D+=1){
    counter = 0
    for(let r=0;r<row_count; r+=1){
      let c = r-D
      if(0 <= c && c< col_count && current_board[r][c] == player){// Checks whether the square is out of bounds before attempting to read data that could be invalid.
        counter ++
      }
      else{
        counter = 0
      }
      if(counter == RUN_LIMIT){ //Check for victory criteria
        victory = true
      }
    }
  }
  //Minor Diagonal Victory...
  //create a for loop that counts from the smallest mD to the largest mD
  for(let d=0; d<=row_count+col_count-2; d+=1){
    counter = 0
    for(let r=0;r<row_count; r+=1){
      let c = d-r
      if(0 <= c && c< col_count && current_board[r][c] == player){// Checks whether the square is out of bounds before attempting to read data that could be invalid.
        counter ++
      }
      else{
        counter = 0
      }
      if(counter == RUN_LIMIT){ //Check for victory criteria
        victory = true
      }
    }
  }

  return victory
}

//Returns whether the board is full
function boardIsFull(current_board){
  found_a_blank = false
  for(let r=0;r<current_board.length;r+=1){
    for(let c=0;c<current_board[r].length;c+=1){
      if(current_board[r][c] == BLANK){
        found_a_blank = true
      }
      
    }
  }
  return !found_a_blank  
}

//Returns whether the game is a Tie
function tieGame(current_board){
  if(boardIsFull(current_board)&&!playerHasWon(X)&&!playerHasWon(O)){
    return true
  }
  else{
    return false
  }
}

//Returns whether the game is over
function gameIsOver(current_board){
  return playerHasWon(X)||playerHasWon(O)||tieGame(current_board)
}

//Get Random Item from a List
function getRandomItem(list){
  //console.log("Get a random item from:",list)
  // let random_number = Math.random()
  // let random_position = random_number*list.length
  // let random_index = Math.floor(random_position)
  // let random_item = list[random_index]
  // return random_item
  return list[Math.floor(Math.random()*list.length)]
}

//Returns a copy of the given board
function copyBoard(current_board){
  //One line solution!!!
  return current_board.map(row => row.slice())
  // return current_board.map(
  //   function (row){
  //     return row.slice()
  //   }
  // )
}

//Returns whether a move is legal
function isLegalMove(current_board,r,c){  
  return inGrid(current_board,r,c) && current_board[r][c] == BLANK
}

//Takes a move and a board and executes that move on the board
function makeMove(current_board, move, player){
  let [r,c] = move
  current_board[r][c] = player
}

//=====================================================================
// AI Code
//---------------------------------------------------------------------
//AI function!  This function should return a legal row and column on the board to play on, given the current state of the board.
function AI_Move(current_board, current_player, opponent){
  if(AI_NAME == "random"){
    return AI_RANDOM(current_board,current_player, opponent)
  }
  if(AI_NAME == "grabby"){
    return AI_GRABBY(current_board,current_player, opponent)
  }
  if(AI_NAME == "blocky"){
    return AI_BLOCKY(current_board, current_player, opponent)
  }
  if(AI_NAME == "looky"){
    return AI_LOOKY(current_board, current_player, opponent)
  }
  if(AI_NAME == "deep1"){
    return AI_DEEP_LOOK(current_board, current_player, opponent, 1)
  }
  if(AI_NAME == "deep2"){
    return AI_DEEP_LOOK(current_board, current_player, opponent, 2)
  }
  if(AI_NAME == "deep3"){
    return AI_DEEP_LOOK(current_board, current_player, opponent, 3)
  }
  if(AI_NAME == "deep4"){
    return AI_DEEP_LOOK(current_board, current_player, opponent, 4)
  }
}
//---------------------------------------------------------------------
//
function getLegalMoves(current_board){
  //Given the current board, generate a list of row/column pairs that are legal moves
  let legal_moves = []
  for(let r=0; r<current_board.length; r+=1){
    for(let c=0; c<current_board[r].length; c+=1){
      if(current_board[r][c]==BLANK){
        legal_moves.push([r,c])
      }
    }
  }
  return legal_moves
}

//---------------------------------------------------------------------
//Random AI
function AI_RANDOM(current_board, current_player, opponent){
  let legal_moves = getLegalMoves(current_board)
  //console.log(legal_moves)
  return getRandomItem(legal_moves)
}
//---------------------------------------------------------------------
// Grabby AI that will take any victory it sees.
function AI_GRABBY(current_board, current_player, opponent){
  // console.log("AI_GRABBY", current_player)
  let legal_moves = getLegalMoves(current_board)
  //If there is a move that will make the player win, return that.
  for(let move of legal_moves){
    //create a copy of the board, and play the move on the copy
    // console.log("move:",move)
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, move, current_player)
    if(boardHasWin(copy_of_board, current_player)){
      return move
    } 
  }
  //If the loop ends with no victory, return a random legal move
  return getRandomItem(legal_moves)
  
}

//---------------------------------------------------------
// Blocking AI
// This AI will block any move that will make the opponent win, and also take any move that would make IT win.
function AI_BLOCKY(current_board, current_player, opponent){
  let legal_moves = getLegalMoves(current_board)
  //Look for victories...
  for(let move of legal_moves){
    //create a copy of the board, and play the move on the copy
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, move, current_player)
    if(boardHasWin(copy_of_board, current_player)){
      return move
    }
  }
  //Look for opponent victories...
  for(let move of legal_moves){
    //create a copy of the board, and play the move on the copy
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, move, opponent)
    if(boardHasWin(copy_of_board, opponent)){
      return move
    }
  }
  //If the loop ends with no victory or block, return a random legal move
  return getRandomItem(legal_moves)
}

//---------------------------------------------------------------
// Looky AI
// This AI will look through the available moves, and choose the one with the worst "score" for your opponent.
//This only uses the Base Case board evaluation, and so is just a showcase of the heuristic.
function AI_LOOKY(current_board, current_player, opponent)
{
  index_of_best_move_so_far = 0
  best_score_so_far = -Infinity
  let legal_moves = getLegalMoves(current_board)
  for(let i=0;i<legal_moves.length;i++)
  {
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, legal_moves[i], current_player)
    score = -evaluateBoardBase(copy_of_board,opponent,current_player)
    if(score>best_score_so_far)
    {
      best_score_so_far = score
      index_of_best_move_so_far = i
    }
                                          
  }
  return legal_moves[index_of_best_move_so_far]
}
//--------------------------------------------------------------
//This AI will use a recursive board evaluation function to determine the best move.  Given a depth of 3 for X, it will look through all possible moves and evaluate them at a depth of 2 for O.
//Whichever move is the worst from O's perspective, will be the best move for X, and the one taken.
function AI_DEEP_LOOK(current_board, current_player, opponent, depth)
{
  let legal_moves = getLegalMoves(current_board)
  let move_score_list = []
  //Populate move_score_list with the score of each move.
  for(let move of legal_moves)
  {
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, move, current_player)
    let score = -evaluateBoard(copy_of_board, opponent, current_player, depth-1)
    move_score_list.push([move,score])
  }
  //console.log(move_score_list)
  
  //List holds the best move/score pairs.
  let best_moves = []
  best_score = -Infinity
  //Find the move with the best score.  If multiple moves have the same score, choose one randomly.
  for(let move_score of move_score_list)
  {
    let [move,score] = move_score
    if(score>best_score)
    {
      best_score = score
      best_moves = [move]
    }
    if (score == best_score)
    {
      best_moves.push(move)
    }
  }
  let best_move = getRandomItem(best_moves)
  
  return best_move
}

//--------------------------------------------------------------
function evaluateBoardBase(current_board, current_player, opponent)
{
  let score = 0
  //Check if opponent already won.  If they did, you have a sad sad day.
  if (boardHasWin(current_board,opponent)){
    return -1000
  }
  //Otherwise, commence with a simplistic evaluation of the board.
  //Stupid board evaulation algorithm:
  for(let r=0; r<current_board.length; r+=1)
  {
    // square_value_list = []
    for(let c=0; c<current_board[r].length; c+=1)
    {
      let dist_from_center = abs(r-(current_board.length-1)/2)+abs(c-(current_board[r].length-1)/2)
      let square_value = current_board.length - dist_from_center
      // square_value_list.push(square_value)
      if(current_board[r][c] == current_player)
      {
        score += square_value
      }
      if(current_board[r][c] == opponent)
      {
        score -= square_value
      }
    }
    // console.log(r, square_value_list)
  }
  return 10*score
}
//-------------------------------------------------------------
// Evaluate the board Recursively
// Look through all board states at depth-1 for opponent, and then return the negative of the worst opponent's board.
// evaluating the quality for a board for X at depth 3 means looking at the resulting boards for O at depth 2.
//friend changes
function evaluateBoard(current_board, current_player, opponent, depth)
{
  //If this board has a win for OPPONENT, then the game is OVER. 
  //They defeated you.  Stop looking.  Just go home.
  if(boardHasWin(current_board,opponent))
  {
    return -1000
  }
  //If you're at Depth 0, no more recursion! 
  //Just give a simple dumb evaluation of how the board looks to you.
  if(depth <= 0)
  {
    return evaluateBoardBase(current_board, current_player, opponent)
  }
  //Otherwise... 
  //If you DO have depth left, then use it!
  //Come up with a list of legal moves for the current player,
  //then evaluate those moves from the opponent's perspective.
  //The worst result from the opponent's perspective is the best result for you.
  //The negative of their score is your score.  Pick the best.
  let legal_moves = getLegalMoves(current_board)
  let best_score = -Infinity //start at worst case for you
  let win_count = 0
  for(let move of legal_moves)
  {
    let copy_of_board = copyBoard(current_board)
    makeMove(copy_of_board, move, current_player)
    let score = -0.9*evaluateBoard(copy_of_board, opponent, current_player, depth-1)
    score = Math.round(score)
    //Check if a score was high enough to be a win
    if(score > 500){win_count += 1}
    if(score>best_score)
    {
      best_score = score
    }
  }
  //Once the loop is done, you should have the best score achievable from this board state.
  //(also technically the move that produced it, but this function won't use that)
  let final_answer = best_score*(1+0.1*(win_count-1))  //Multiply score by the number of wins you have so that blocking forks will do something.
  return  Math.round(final_answer)
}

//=====================================================================
// Button Functions
//---------------------------------------------------------------------

function resetGame(){
  resetBoard(GRID_DATA)
  X_TURN = true
  move_evaluation_list = []
}

function doAIMove(){
  if( !gameIsOver(GRID_DATA)){
    let current_player = (X_TURN ? X : O)
    let opponent = (X_TURN ? O : X)
    let move = AI_Move(GRID_DATA, current_player, opponent)
    let [r,c] = move
    GRID_DATA[r][c] = current_player
    nextTurn()
    if(AI_scores_visible == true) {evaluateMoves()}
  }
}

function evaluateMoves(){
  let move_scores = []
  let current_player = (X_TURN ? X : O)
  let opponent = (X_TURN ? O : X)
  for(let move of getLegalMoves(GRID_DATA)){
    let copy_of_board = copyBoard(GRID_DATA)
    makeMove(copy_of_board, move, current_player)
    let score = -evaluateBoard(copy_of_board, opponent, current_player, 3)
    move_scores.push([move,score])
  }
  move_evaluation_list = move_scores
}

//=====================================================================
// p5.js Functions
//---------------------------------------------------------------------

//The setup() function is called once when the program starts. 
function setup(){
  createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT)
  background("gray")

  //test_button = new Button(50,50,50,50,"Test")
  //New Game Button
  reset_button = new Button(500,50,120,50,"New Game")
  reset_button.setFunction(resetGame)
  //AI Turn button
  AI_move_button = new Button(75,50,160,50,"Click for AI turn")
  AI_move_button.setFunction(doAIMove)

  move_score_button = new Button(75,100,160,50,"Move Scores")
  move_score_button.setFunction(evaluateMoves)
  //Create and fill out the 2D array
  for(let r=0;r<GRID_ROW_COUNT;r+=1){
    GRID_DATA.push([])
    for(let c=0;c<GRID_COL_COUNT;c+=1){
      GRID_DATA[r].push(BLANK)
    }
  }
  game_board = new Board(3,4)
  
}

//Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
function draw(){
  background("gray")
  rectMode(CORNER)
  //Draw Grid
  game_board.draw()
  for(let r=0;r<GRID_ROW_COUNT;r+=1){
    for(let c=0;c<GRID_COL_COUNT;c+=1){
      fill( GRID_DATA[r][c] )
      
      let x = GRID_SCALE*c + GRID_LEFT_MARGIN
      let y = GRID_SCALE*r + GRID_TOP_MARGIN
      let w = GRID_SCALE
      let h = GRID_SCALE
      rect(x,y,w,h)
    }
  }
  //Draw Labels on the grid
  if(AI_scores_visible == true)
  {
    for(let item of move_evaluation_list)
    {
      let [move,score] = item
      let [r,c] = move
      let x = GRID_SCALE*(c+0.5) + GRID_LEFT_MARGIN
      let y = GRID_SCALE*(r+0.5) + GRID_TOP_MARGIN
      push()
      textAlign(CENTER,CENTER)
      textSize(GRID_SCALE*0.3)
      fill(100,200,0)
      text(score,x,y)
      pop()
    }    
  }
    
  // noLoop()

  ////Text code to demonstrate column calculations
  // let mx = mouseX - GRID_LEFT_MARGIN
  // let msc = mx/GRID_SCALE
  // let mc = Math.floor(msc)
  let X_WON = playerHasWon(X)
  let O_WON = playerHasWon(O)
  let TIE_GAME = tieGame(GRID_DATA)
  
  textSize(30)
  fill("black")
  // text(mouseX, 10, 30)
  // text(mx, 10, 60)
  // text(msc, 10, 90)
  // text(mc, 10, 120)
  let mouseRow = Math.floor((mouseY-GRID_TOP_MARGIN)/GRID_SCALE)
  let mouseCol = Math.floor((mouseX-GRID_LEFT_MARGIN)/GRID_SCALE)
  //textAlign(LEFT,BOTTOM)
  //text(`r:${mouseRow},c:${mouseCol}`, 10,30)
  //text(`X's Turn: ${X_TURN}`, 300,30)
  // text(`X Victory: ${X_WON}`,10,80)
  // text(`O Victory: ${O_WON}`,300,80)
  // text(`TIE Game: ${TIE_GAME}`,10,130)

 
  //Determine and print out the "Game Status"
  let GAME_STATUS = "error: game status not set"
  let STATUS_COLOR = "magenta"
  if(X_TURN){
    GAME_STATUS = "X's Turn"
    AI_move_button.NORMAL_COLOR = X
    AI_move_button.HOVER_COLOR = "red"
    STATUS_COLOR = X
  }
  if(!X_TURN){
    GAME_STATUS = "O's Turn"
    AI_move_button.NORMAL_COLOR = O
    AI_move_button.HOVER_COLOR = "darkturquoise"
    STATUS_COLOR = O
  }
  if(X_WON){
    GAME_STATUS = "X has won! Congratulations!"
    STATUS_COLOR = X
  }
  if(O_WON){
    GAME_STATUS = "O has won! Congratulations!"
    STATUS_COLOR = O
  }
  if(TIE_GAME){
    GAME_STATUS = "Tie Game."
    STATUS_COLOR = TIE_COLOR
  }
  rectMode(CENTER)
  fill(STATUS_COLOR)
  rect(300,500,textWidth(GAME_STATUS)+20,50)
  textAlign(CENTER,CENTER)
  fill("black")
  text(GAME_STATUS, 300,500)
  text("Current AI: "+AI_NAME, 300,550)

  //Add new game status display for board class 
  fill(game_board.current_player.color)
  GAME_STATUS = game_board.current_player.name+"'s Turn"
  rect(50,250,50,50)
  
  

  //Draw Buttons
  //test_button.draw()
  reset_button.draw()
  AI_move_button.draw()
  move_score_button.draw()

  //text(AI_NAME, 275,50) //Display chosen AI name

  // line(0,0,600,600)
  // ellipse(100,200,300,400)
}

function mousePressed(){
  //test_button.handleClick()
  reset_button.handleClick()
  AI_move_button.handleClick()
  move_score_button.handleClick()
  game_board.handleClick()
  //[*]When a square is clicked, its value should be changed to some horrifyingly bright color so we can't deny that a change happened.
  //mouseX, mouseY
  //[*]When you click on a square, its color should change to the color corresponding to the current player.
  //[*]Don't let the player click on squares that have already been claimed.  Clicking on a claimed square should not change it, nor should that cause the turn to end.  (Question: What does an "unclaimed" square look like?)
  //(1) Get the location where the player wishes to play
  let mouseRow = Math.floor((mouseY-GRID_TOP_MARGIN)/GRID_SCALE)
  let mouseCol = Math.floor((mouseX-GRID_LEFT_MARGIN)/GRID_SCALE)

  //Check to see whether the game is over.  If not over, accept clicks.
  //[ ] Make sure that a square of the color of whoever's turn it is is what gets played on the board (if it's a legal move)
  if(!playerHasWon(X) && !playerHasWon(O) && !boardIsFull(GRID_DATA)){
    //Set up variables for turn calculation
    let square_color = X_TURN ? X : O
    let move
    let legal_move_has_been_made = false
    
    if(isLegalMove(GRID_DATA,mouseRow,mouseCol)){
      move = [mouseRow,mouseCol]
      legal_move_has_been_made = true
    }
    if(legal_move_has_been_made){
      //(2)Make the move happen
      let [move_row,move_col] = move //unpacks move into two variables
      GRID_DATA[move_row][move_col] = square_color
      move_list.push(move) //Adds the click-based move to the move list
      //(3)Finish the turn
      nextTurn()
    }
  }
  else{
    //Nothing!!!
  }
}