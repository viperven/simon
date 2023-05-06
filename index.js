var userClickedPattern = [];
var gamePattern = [];
var buttonColour = ["red", "blue", "green", "yellow"];
var gameStart = true;
var level = 0;

//when any key is pressed 

$(document).keypress(function () {
    if (gameStart) {
        $("h1").text("LEVEL " + level);
        nextSequence();
        gameStart = false;
    }
})

//when any button is clicked

$("div[type='button']").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    // console.log(currentLevel);
    // console.log("game :"+gamePattern);
    // console.log("user :"+userClickedPattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {             // here it will automstically come out then we will click rembered pattern
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("GAME OVER , Press Any Key To Restart");
        setTimeout(function(){
        $("body").removeClass("game-over"); 
        },200);
        
        startOver();
    }

}

// to generate random number

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("LEVEL " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// to play sound

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

// display animation

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//to restart game 
function startOver(){
    level = 0;
    gameStart = true;
    gamePattern = [];
}