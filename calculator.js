let display = document.getElementById("display");
let currentDisplay = "0"; // initialize the value to be zero.

let isResultDisplayed = false; // this is a flag that checks if the display is modified
let buttons = document.getElementsByClassName("inputs");
let cosValue = "0";
let sinValue = "0";
let tanValue = "0";

function updateDisplay() {
  display.innerText = currentDisplay;
}

function appendDisplay(displayValue) {
  if (currentDisplay === "0" || isResultDisplayed) {
    currentDisplay = displayValue;
  } else {
    currentDisplay += displayValue;
  }

  // reset the flag to its original to prevent deleting
  isResultDisplayed = false;

  // update the calculator display
  updateDisplay();
}

function calculate() {
  try {
    let currentExpression = currentDisplay;

    // Function to evaluate trigonometric functions within the string
    /**
     * this callback function expects 3 aguments
     * - the first being the matching string eg. cos(0), sin(90)
     * - the second being the function name cos, tan, sin\
     * - the third being the angle
     *
     */
    function evaluateTrigonometricFunction(match, trigfunction, trigAngle) {
      let angle = eval(trigAngle); // Evaluate the angle expression
      let radians = angle * (Math.PI / 180); // Convert angle to radians
      switch (trigfunction.toLowerCase()) {
        case "cos":
          return Math.cos(radians);
        case "sin":
          return Math.sin(radians);
        case "tan":
          return Math.tan(radians);
        default:
          return match;
      }
    }

    // Regular expression to match trigonometric functions
    let trigonometricFunctionRegex = /(cos|sin|tan)\(([^)]+)\)/gi;

    /* Replace all occurrences of trigonometric functions with their evaluated results
     -- it is to note that the replace method takes two or more arguments
        the first being the regex and the second a callback function,
        then it iterates through all occurence of the string     
     */
    currentExpression = currentExpression.replace(
      trigonometricFunctionRegex,
      evaluateTrigonometricFunction
    );

    // Evaluate the final expression
    let result = eval(currentExpression);

    // Update display with result
    currentDisplay = "ANS = " + result.toString();
    updateDisplay();
    isResultDisplayed = true;
  } catch (error) {
    currentDisplay = "Syntax Error";
    updateDisplay();
    isResultDisplayed = true;
  }
}

// function to clear last element
function clearLastElement() {
  // removing using the slice method
  currentDisplay = currentDisplay.slice(0, -1);

  if (currentDisplay === "") {
    currentDisplay = "0";
  }

  updateDisplay();
}

function clearAllDisplay() {
  currentDisplay = "0";
  updateDisplay();
  isResultDisplayed = false;
}
