var buttonColours = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



// keypress when something is called threw keyboard

$(document).keypress(function(){

  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;

  }

})


//when user clicked the button
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

//checking the checkAnswer
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }else{
      console.log("wrong");
      playSound("wrong");


      $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     $("#level-title").text("Game Over, Press Any Key to Restart");

     startOver();
    }
}




//gives array 1 to 3 and animate the button
function nextSequence(){

userClickedPattern=[];
level++;
$("#level-title").text("Level "+level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}



//play the sounds
function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//animation function
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
  }, 100);


}


//Restart
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}
