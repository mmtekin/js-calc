console.log("Hello World");
let operator = "";
let displayValue = "0";
let previousValue = "";
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Inside number button");
    if (displayValue === "0") {
      displayValue = button.textContent;
    } else {
      displayValue += button.textContent;
    }
    updateDisplay();
  });
});
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      if (b === 0) return "Cannot / 0";
      return divide(a, b);
    case "√":
      return Math.sqrt(a);
    case "^":
      return Math.pow(a, b);
    default:
      return "Invalid operator";
  }
}

function updateDisplay() {
  let display = document.querySelector(".current");
  display.textContent = displayValue;
  if (displayValue.length > 9) {
    display.textContent = displayValue.substring(0, 9);
  }
}

function clearDisplay() {
  displayValue = "0";
  previousValue = "";
  operator = "";
  document.querySelector(".previous").textContent = "";
  updateDisplay();
}

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator !== "") {
      calculate();
    }
    previousValue = displayValue;
    displayValue = "0";
    operator = button.textContent;
  });
});

// Event listener for the clear button
document.getElementById("clear-btn").addEventListener("click", clearDisplay);

// Event listener for the result button
document.getElementById("result").addEventListener("click", () => {
  calculate();
  operator = "";
  previousValue = "";
});

document.getElementById("erase").addEventListener("click", () => {
  displayValue = displayValue.substring(0, displayValue.length - 1);
  if (displayValue === "") {
    displayValue = "0";
  }
  updateDisplay();
});
// how can I make backspace hit the erase button?
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    if (displayValue === "") {
      displayValue = "0";
    }
    updateDisplay();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("result").click();
  }
});

// How can I add keyboard support so hitting 3 will input 3
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) {
    if (displayValue === "0") {
      displayValue = e.key;
    } else {
      displayValue += e.key;
    }
    updateDisplay();
  }
});
// Now I will add keyboard support for the operators.
document.addEventListener("keydown", (e) => {
  if (["+", "-", "*", "/"].includes(e.key)) {
    if (operator !== "") calculate();
    previousValue = displayValue;
    displayValue = "0";
    if (e.key === "*") {
      operator = "x";
    } else {
      operator = e.key;
    }
    updateDisplay();
  }
});

function calculate() {
  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(displayValue);
  console.log("Prev is ", prev);
  console.log("Current is ", current);
  if (isNaN(prev) || isNaN(current)) return;
  result = operate(operator, prev, current);
  displayValue = result.toString();
  updateDisplay();
}
