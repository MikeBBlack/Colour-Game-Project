var colours = [];
var numSquares = 6;
var pickedColour;
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  modeButtonSetup();
  resetButtonSetup();
  squaresSetup();
  reset();
}

function modeButtonSetup() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function resetButtonSetup() {
  resetButton.addEventListener("click", function() {
    reset();
  });
}

function squaresSetup() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener("click", function() {
      //grab colour of clicked square
      var clickedColour = this.style.backgroundColor
      //compare to picked colour
      if(clickedColour === pickedColour) {
        messageDisplay.textContent = "You Win!"
        changeColours(clickedColour);
        h1.style.background = clickedColour;
        reset.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.innerHTML = "Try Again - that colour is " + clickedColour.toUpperCase() + "!";
      }
    });
  }
}

function reset() {
  colours = generateRandomColours(numSquares);
  pickedColour = pickColour();
  colourDisplay.textContent = pickedColour;
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Colours";
  //change colours of squares
  for(var i = 0; i < squares.length; i++) {
    if(colours[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colours[i];
    } else {
      squares[i].style.display = "none";
    }  
  }
}

function generateRandomColours(num) {
  //make an array
  var arr = [];
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  //add num random colours to array
  for (var i = 0; i < num; i++) {
    //get random colour and push into array
    if (modeButtons[2].classList.contains("selected")) {
      arr.push(randomColoursHard(r,g,b));
      console.log("Hard Mode Activated")
    } else {
      arr.push(randomColours())
    }  
  }
  //return that array
  return arr;
}

function randomColours() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomColoursHard(num1, num2, num3) {
  //rgb values within +/- 16
  var rFinal = plusMinus(num1);
  var gFinal = plusMinus(num2);
  var bFinal = plusMinus(num3);
  return "rgb(" + rFinal + ", " + gFinal + ", " + bFinal + ")";
}

function plusMinus(num) {
  if (num <= 63) { //no values below 0
    final = getRandomIntInclusive(0, num + 64);
  } else if (num >= 192) { //no values above 255
    final = getRandomIntInclusive(num - 64, 255);
  } else {
    final = getRandomIntInclusive(num - 64, num + 64);
  }
  return final;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function changeColours(color) {
  //loop through all squares
  for(var i = 0; i < squares.length; i++) {
    //change each square to match given colour.
    squares[i].style.backgroundColor = color;
  }
}

function pickColour() {
  //choose random integer between 0 and length of colours array
  var random = Math.floor(Math.random() * colours.length);
  return colours[random];
}
