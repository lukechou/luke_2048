/**
 * Created by luke on 2015-4-12.
 *
 */

var board = new Array();
var score;
var hasCollisioned = new Array();

$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格
   init();
    //在随机两个格子生成数字\
    generatorOneNumber();
    generatorOneNumber();
}

function init(){
    score = 0;
    for( var i = 0 ; i < 4 ; i ++ ) {
        board[i] = new Array();
        hasCollisioned[i] = new Array();
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));

            board[i][j] = 0;
            hasCollisioned[i][j] = false;
        }
    }
    updateBoardView();
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+ i +'-'+ j +'"></div>');
            var theNumberCell = $("#number-cell-"+ i +"-"+ j);
            //console.log(theNumberCell);           //此处的错误调式了很久呀有木有！ 就是因为上面$（）里面的id名写错！！
            if(board[i][j] == 0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j) + 50+"px");
                theNumberCell.css("left",getPosLeft(i,j) + 50+"px");

            }else{
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top",getPosTop(i,j) );
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundcolor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                //console.log(board[i][j]);
            }

            hasCollisioned[i][j] = false;
        }
    }
}
function generatorOneNumber(moveDire){
    if(noSpace(board)){
        return false;
    }
    var randx,randy;

    switch (moveDire){
        case "left":
            randx = parseInt(Math.floor(Math.random()*4));
            randy = Math.random() < 0.5 ? 2 : 3;
            var time = 0;
            while(time < 30){
                if(board[randx][randy] == 0)
                    break;

                randx = parseInt(Math.floor(Math.random()*4));
                randy = Math.random() < 0.5 ? 2 : 3;
                time ++;
            }
            if(time == 30){
                randx = generatorOneNumberByHand().x;
                randy = generatorOneNumberByHand().y;
            }
            //console.log(moveDire);
            break;
        case "right":
            randx = parseInt(Math.floor(Math.random()*4));
            randy = Math.random() < 0.5 ? 0 : 1;
            var time = 0;
            while(time < 30){
                if(board[randx][randy] == 0)
                    break;

                randx = parseInt(Math.floor(Math.random()*4));
                randy = Math.random() < 0.5 ? 0 : 1;
                time ++;
            }
            if(time == 30){
                randx = generatorOneNumberByHand().x;
                randy = generatorOneNumberByHand().y;
            }
            break;
        case "up":
            randx = Math.random() < 0.5 ? 2 : 3;
            randy = parseInt(Math.floor(Math.random()*4));
            var time = 0;
            while(time < 30){
                if(board[randx][randy] == 0)
                    break;

                randx = Math.random() < 0.5 ? 2 : 3;
                randy = parseInt(Math.floor(Math.random()*4));
                time ++;
            }
            if(time == 30){
                randx = generatorOneNumberByHand().x;
                randy = generatorOneNumberByHand().y;
            }
            //console.log(moveDire);
            break;
        case "down":
            randx = Math.random() < 0.5 ? 0 : 1;
            randy = parseInt(Math.floor(Math.random()*4));
            var time = 0;
            while(time < 30){
                if(board[randx][randy] == 0)
                    break;

                randx = Math.random() < 0.5 ? 0 : 1;
                randy = parseInt(Math.floor(Math.random()*4));
                time ++;
            }
            if(time == 30){
                randx = generatorOneNumberByHand().x;
                randy = generatorOneNumberByHand().y;
            }
            break;
        default :
            //生成随机位置
             randx = parseInt(Math.floor(Math.random()*4));
             randy = parseInt(Math.floor(Math.random()*4));
            var time = 0;
            while(time < 30){
                if(board[randx][randy] == 0)
                    break;

                 randx = parseInt(Math.floor(Math.random()*4));
                 randy = parseInt(Math.floor(Math.random()*4));
                time ++;
            }
            if(time == 30){
                randx = generatorOneNumberByHand().x;
                randy = generatorOneNumberByHand().y;
            }
            break;
    }
    //得到随机数
    var randnum = Math.random() < 0.5 ? 2 : 4;

    //show the number on the right position
    board[randx][randy] = randnum;
    showNumberWithAnimation(randx,randy,randnum);

    return true;
}

function generatorOneNumberByHand(){
    var obj = {x:0,y:0};
    for( var i = 0 ; i < 4 ; i ++ ) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j] == 0){
                obj.x = i;
                obj.y = j;
            }
        }
    }
    return obj;
}
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37: //left
            if(moveLeft()){
                setTimeout("generatorOneNumber('left')",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //up
            if(moveUp()){
                setTimeout("generatorOneNumber('up')",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //right
            if(moveRight()){
                setTimeout("generatorOneNumber('right')",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //down
            if(moveDown()){
                setTimeout("generatorOneNumber('down')",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default : //default
            break;
    }
});

function isGameOver(){
   if(noSpace(board) && !canMoveLeft(board) && !canMoveRight(board) && !canMoveUp(board) && !canMoveDown(board)){
       alert("Game is Over!! Game restart.");
       newgame();
       return true;
   }
    return false;
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i = 0; i < 4; i ++){
        for(var j = 1; j < 4; j ++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k ++){
                    if(board[i][k] == 0 && noBlockOnTheRoad("row",i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //console.log(board[i][k]);
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockOnTheRoad("row",i,k,j,board) && !hasCollisioned[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasCollisioned[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //console.log(board);
    setTimeout("updateBoardView()",200);

    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //moveLeft
    for(var i = 0; i < 4; i ++){
        for(var j = 1; j < 4; j ++){
            if(board[j][i] != 0){
                for(var k = 0; k < j; k ++){
                    if(board[k][i] == 0 && noBlockOnTheRoad("column",i,k,j,board)){
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        //console.log(board[i][k]);
                        continue;
                    } else if(board[k][i] == board[j][i] && noBlockOnTheRoad("column",i,k,j,board) && !hasCollisioned[k][i]){
                        showMoveAnimation(j,i,k,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;

                        score += board[k][i];
                        updateScore(score);

                        hasCollisioned[k][i] = true;
                        continue;
                    }
                }
            }
        }
    }
   // console.log(board);
    setTimeout("updateBoardView()",200);

    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //move
    for(var i = 0; i < 4; i ++){  //行 循环
        for(var j = 2; j >= 0; j --){  //列循环
            if(board[i][j] != 0){
                for(var k = 3; k > j; k --){
                    if(board[i][k] == 0 && noBlockOnTheRoad("row",i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //console.log(board[i][k]);
                        continue;
                    } else if(board[i][k] == board[i][j] && noBlockOnTheRoad("row",i,j,k,board) && !hasCollisioned[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasCollisioned[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    //console.log(board);
    setTimeout("updateBoardView()",200);

    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //moveDown
    for(var i = 0; i < 4; i ++){ //i表示列
        for(var j = 2; j >= 0; j --){    //j表示行
            if(board[j][i] != 0){
                for(var k = 3; k > j; k --){
                    if(board[k][i] == 0 && noBlockOnTheRoad("column",i,j,k,board)){
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        //console.log(board[i][k]);
                        continue;
                    } else if(board[k][i] == board[j][i] && noBlockOnTheRoad("column",i,j,k,board) && !hasCollisioned[k][i]){
                        showMoveAnimation(j,i,k,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;

                        score += board[k][i];
                        updateScore(score);

                        hasCollisioned[k][i] = true;
                        continue;
                    }
                }
            }
        }
    }
    //console.log(board);
    setTimeout("updateBoardView()",200);

    return true;
}