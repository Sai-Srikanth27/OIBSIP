const calcKeys = document.querySelectorAll(".button");
const display = document.querySelector(".calculator-screen");
const historyLog = document.getElementById("para");

let currentInput = ""; // Tracks the ongoing calculation
let isNegative = false; // Tracks if a negative sign is active

// Evaluates the mathematical expression safely
function computeResult(expr) {
  try {
    // Replace special characters and ensure proper syntax
    let formattedExpr = expr
      .replace(/(\d+)([(])/g, "$1*$2") // Implicit multiplication before parentheses
      .replace(/%/g, "/100") // Convert percentage to division
      .replace(/÷/g, "/") // Replace division symbol
      .replace(/\^/g, "**"); // Replace exponent with JS operator
    return Function(`"use strict"; return (${formattedExpr})`)();
  } catch (err) {
    console.warn("Invalid expression:", err);
    return null;
  }
}

// Toggles the sign of the current value
function toggleSign() {
  if (!display.value) {
    display.value = "-";
    currentInput += "-";
  } else if (display.value === "-") {
    display.value = "";
    currentInput = currentInput.slice(0, -1);
  } else {
    const num = parseFloat(display.value);
    const flippedNum = -num;
    display.value = flippedNum;
    currentInput = currentInput.slice(0, -num.toString().length) + flippedNum;
  }
  historyLog.textContent = currentInput;
}

// Processes button clicks
function processKeyPress() {
  const keyValue = this.textContent;

  switch (keyValue) {
    case "AC":
      display.value = "";
      currentInput = "";
      historyLog.textContent = "";
      break;

    case "C":
      display.value = display.value.slice(0, -1);
      currentInput = currentInput.slice(0, -1);
      historyLog.textContent = currentInput;
      break;

    case "=":
      const outcome = computeResult(currentInput);
      display.value = outcome !== null ? outcome : "Error";
      historyLog.textContent = `${currentInput} = ${display.value}`;
      break;

    case "%":
      const percentResult = computeResult(currentInput) / 100;
      display.value = percentResult;
      currentInput = percentResult.toString();
      historyLog.textContent = currentInput;
      break;

    case ".":
      if (!currentInput.includes(".")) {
        display.value += keyValue;
        currentInput += keyValue;
        historyLog.textContent = currentInput;
      }
      break;

    case "√":
      const root = Math.sqrt(computeResult(currentInput));
      display.value = root;
      currentInput = root.toString();
      historyLog.textContent = currentInput;
      break;

    case "+/-":
      toggleSign();
      break;

    default:
      if (
        !isNaN(keyValue) || // Numbers
        ["+", "-", "*", "/", "(", ")", "÷", "^"].includes(keyValue) // Operators
      ) {
        display.value += keyValue;
        currentInput += keyValue;
        historyLog.textContent = currentInput;
      }
  }
}

// Attach event listeners to all calculator buttons
calcKeys.forEach((key) => {
  key.addEventListener("click", processKeyPress);
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const pressedKey = e.key;

  if (pressedKey === "Enter") {
    const result = computeResult(currentInput);
    display.value = result !== null ? result : "Error";
    historyLog.textContent = `${currentInput} = ${display.value}`;
  } else if (
    !isNaN(pressedKey) || // Numbers
    ["+", "-", "*", "/", ".", "%", "(", ")", "÷", "^"].includes(pressedKey) // Operators
  ) {
    display.value += pressedKey;
    currentInput += pressedKey;
    historyLog.textContent = currentInput;
  }
});
