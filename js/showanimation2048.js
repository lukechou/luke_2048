/**
 * Created by luke on 2015-4-12.
 */
function showNumberWithAnimation(x,y,num){
    var numCell = $("#number-cell-"+x+ "-"+y);

    numCell.css("background-color",getNumberBackgroundcolor(num));
    numCell.css("color",getNumberColor(num));
    //numCell.css("width","100px");
    //numCell.css("height","100px");
    numCell.text(num);
    numCell.animate(
        {
            width: cellSideLength,
            height: cellSideLength,
            top:getPosTop(x,y),
            left:getPosLeft(x,y)
        },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numcell = $("#number-cell-"+ fromx +"-"+ fromy);

    numcell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    $("#score").text("score: "+ score);
}

function updateMove(move) {
    $("#move").text("move: "+ move);
}

