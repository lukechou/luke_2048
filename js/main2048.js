/**
 * Created by luke on 2015-4-12.
 *
 */

var board = new Array();
var score,move;
var hasCollisioned = new Array();

var startx,starty,endx,endy;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});
function prepareForMobile(){

    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
        $("h1").css("font-size","28px");
    }
    //consider the height of screen;
    /*if(documentHeight > 600){
        var headerHeight = $("header").outerHeight(true);
        var gridContainerHeight = $("#grid-container").outerHeight(true);
        alert(headerHeight+"___"+gridContainerHeight);
        var m = (documentHeight - gridContainerHeight - headerHeight)/2;
        $("header").css("margin-top",m + "px");
    }*/

    $("#grid-container").css("width",gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("height",gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius", 0.02 * gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius", 0.02 * cellSideLength);

}

function newgame(){
    //初始化棋盘格
   init();
    //在随机两个格子生成数字\
    generatorOneNumber();
    generatorOneNumber();
}

function init(){
    score = 0;
    move = 0;
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
                theNumberCell.css("top",getPosTop(i,j) + 0.5 * cellSideLength+"px");
                theNumberCell.css("left",getPosLeft(i,j) + 0.5 * cellSideLength +"px");

            }else{
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i,j) );
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundcolor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                //console.log(board[i][j]);
            }
            $(".number-cell").css("line-height",cellSideLength+"px");
            $(".number-cell").css("font-size",0.6 * cellSideLength +"px");
            hasCollisioned[i][j] = false;
        }
    }
}
function generatorOneNumber(){
    if(noSpace(board)){
        return false;
    }
    /*
    生成随机的坐标
     */
    var positionAvail = new Array();
    var index = 0;
    //先把值为0的格子统计出来，放数组里
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            if(board[i][j] == 0){
                positionAvail[index] = i * 4 + j;
                index ++;
            }
        }
    }
    //再从数组中随机抽取一个元素
    var randIndex = Math.floor(Math.random() * index);
    var randx = Math.floor(positionAvail[randIndex]/4);
    var randy = positionAvail[randIndex] % 4;

    //得到随机数
    var randnum = Math.random() < 0.5 ? 2 : 4;

    //show the number on the right position
    board[randx][randy] = randnum;
    showNumberWithAnimation(randx,randy,randnum);

    return true;
}

$(document).keydown(function(event){
    switch (event.keyCode){
        case 37: //left
            event.preventDefault();
            if(moveLeft()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if(moveUp()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if(moveRight()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if(moveDown()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default : //default
            break;
    }
});

document.addEventListener("touchstart",function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener("touchmove",function(event){
    event.preventDefault();
});

document.addEventListener("touchend",function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(Math.abs(deltax) < 0.1 * gridContainerWidth && Math.abs(deltay) < 0.1 * gridContainerWidth){
        return;
    }

    if(Math.abs(deltax) >= Math.abs(deltay)){
        //x
        if(deltax > 0){
            //move right
            if(moveRight()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber('right')",210);
                setTimeout("isGameOver()",300);
            }
        }else{
            // move left
            if(moveLeft()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber('left')",210);
                setTimeout("isGameOver()",300);
            }
        }
    }else{
        //y
        if(deltay > 0){
            // move down
            if(moveDown()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber('down')",210);
                setTimeout("isGameOver()",300);
            }
        }else{
            // move up
            if(moveUp()){
                move ++;
                updateMove(move);
                setTimeout("generatorOneNumber('up')",210);
                setTimeout("isGameOver()",300);
            }
        }
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