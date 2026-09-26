//This file will contain all of the functions needed to access and process board data.
//Can be used both by AIs and by the Board Class when finalizing its actions.
//The Board Class will contain a reference to a gameRules object, which will be this Static Class of functions

//RUN_LENGTH = 4 //This should actually be set by a constructor
class gameRules{

    Blank_ID = 0
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
    getLegalMoves(board_array){
        return this.getOwnedSquares(board_array,Blank_ID)
        
    }
    //Returns a list of all the [r,c] coordinates in the board_array that contain player_id
    getOwnedSquares(board_array, player_id){
        owned_squares = []
        for(r=0; r<board_array.length;r++){ //For each row...
            for(c=0;c<board_array[0].length; c++) {//For each item in the row (designated by column)
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
}