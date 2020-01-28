const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
const h1 = $('#level-title');
let level = 0;
let started = false;

function playSound(name) {
    const audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
};

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function(){
    $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    const min = 0;
    const max = 3;
    const randomNumber = Math.floor(Math.random()*(max-min+1)+min);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    h1.text(`Level ${level}`);    
};

const button = $('.btn')
button.click(function(){
    const userChosenColour = this.id;    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started) {
        h1.text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {    
    
   if(gamePattern.length === userClickedPattern.length) {
       setTimeout(function() {
           nextSequence();
       }, 1000);
       }
    } else {
        playSound('wrong')
        $('body').addClass('game-over');
        h1.text('Game Over, Press Any Key to Restart');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
   }

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}