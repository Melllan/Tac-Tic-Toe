//This file will contain all of the functions needed to access and process board data.
//Can be used both by AIs and by the Board Class when finalizing its actions.
//The Board Class will contain a reference to a gameRules object, which will be this Static Class of functions
//WITHIN STATIC FUNCTIONS ALL VARIABLES MUST BE DEFINED USING LET (or esle)
//RUN_LENGTH = 4 //This should actually be set by a constructor
class gameRules{

    static Blank_ID = 0
    constructor(){
        

    }

    //Hypothetical method call from Board.js 
    //this.rules.boardHasWin(this.board_data, this.current_player, this.run_limit)
    //Hypothetical method call from gameAI.js
    //gameRules.boardHasWin(this.board.board_data, this.board.current_player, this.board.run_limit)
    //We are using run_limit as a parameter in our method calls to keep gameRules as static as possible
    boardHasWin(board_array, player_id, run_limit){
        return true
    }

    //Called from gameAI.js:
    //gameRules.getLegalMoves(this.board.board_data, this.board.Blank_player.id)
    static getLegalMoves(board_array){
        return this.getOwnedSquares(board_array,this.Blank_ID)
        
    }
    //Returns a list of all the [r,c] coordinates in the board_array that contain player_id
    static getOwnedSquares(board_array, player_id){
        var owned_squares = [] //Use var for defining variables within a function and use let for mostly for loops and if statements.
        for(let r=0; r<board_array.length;r++){ //For each row...
            for(let c=0;c<board_array[0].length; c++) {//For each item in the row (designated by column)
                if(board_array[r][c] == player_id){
                    owned_squares.push([r,c])
                }
            }
        }
        return owned_squares
    }

    noLegalMoves(board_array){
        return this.getLegalMoves(board_array).length() == 0
    }
    //Define how a move is actually made
    //Test this later
    makeMove(board_array, move, player_id){
        var [r,c] = move
        board_array[r][c] = player_id
    }
}