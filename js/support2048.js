/**
 * Created by luke on 2015-4-12.
 */
function getPosTop( i , j ){
    return 20 + i*120;
}

function getPosLeft( i , j ){
    return 20 + j*120;
}

function noSpace(board){
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j <4; j ++){
            if(board[i][j] == 0) return false;
        }
    }

    return true;
}

function getNumberColor(num){
    if(num <= 4) return "#776e65";
    else return "black";
}

function getNumberBackgroundcolor(num){
    switch( num ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
        default :return "black";
    }
}

function canMoveLeft(board){
    for(var i = 0; i < 4; i ++ ){
        for(var j = 1; j < 4; j ++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}
function canMoveRight(board){  //能够往右移动
    for(var i = 0; i < 4; i ++ ){
        for(var j = 0; j < 3; j ++){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveUp(board){  //能够往上移动
    for(var i = 0; i < 4; i ++ ){
        for(var j = 1; j < 4; j ++){
            if(board[j][i] != 0){
                if(board[j-1][i] == 0 || board[j-1][i] == board[j][i]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(board){  //能够往下移动
    for(var i = 0; i < 4; i ++ ){
        for(var j = 0; j < 3; j ++){
            if(board[j][i] != 0){
                if(board[j+1][i] == 0 || board[j+1][i] == board[j][i]){
                    return true;
                }
            }
        }
    }

    return false;
}
function noBlockOnTheRoad(flag,rowOrColumn,from,to,board){
    for(var i = from + 1; i < to; i ++){
       if(flag == "row"){
           if(board[rowOrColumn][i] != 0) return false;
       }else{
           if(board[i][rowOrColumn] != 0) return false;
       }
    }

    return true;
}