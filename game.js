//var randomNumber;
var randomChosenColour
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started = false;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4)
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    //console.log(gamePattern);
}

function playSound(color){
    var track = new Audio("sounds/" + color + ".mp3")
    track.play();
}

function animatePress(color){
    $("#" + color).fadeOut(75);
    $("#" + color).addClass('pressed');
    setTimeout(function() {
        $("#" + color).removeClass('pressed');
    }, 50);
    $("#" + color).fadeIn(75);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
    //console.log(userClickedPattern);
})

function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length - 1] == gamePattern[userClickedPattern.length - 1]){
        console.log("Success");
        if(userClickedPattern.length == gamePattern.length){
            console.log("Moving On")
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200);
        $("h1").text("Game Over, Press Any Key to Play Again");
        startOver();
    }
}

$(document).keypress(function(e){
    if(started == false){
        nextSequence();
        started = true;
    }
})

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
