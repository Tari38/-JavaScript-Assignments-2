// Select elements
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const equalBtn = document.querySelector('.equal');
const operatorBtns = document.querySelectorAll('.operator');
const numBtns = document.querySelectorAll(
  '.button:not(.operator):not(.clear):not(.backspace):not(.equal)'
);


let firstNumber = null;
let currentNumber = '';
let currentOperation = null;
let previousOperationResult = null;
//let result = null;


function appendToDisplay(value) {
    if (value === '.' && currentNumber.includes('.')) {
      // If the user tries to input more than one decimal point, ignore the input
      return;
    }
  
    if (isNaN(value) && value !== '.') {
      // Operator button clicked
      if (currentOperation !== null) {
        // An operation has already been chosen, so calculate the result
        operate();
      }
      currentOperation = value;
      if (previousOperationResult !== null) {
        firstNumber = previousOperationResult;
      } else {
        firstNumber = parseFloat(currentNumber);
      }
      currentNumber = '';
    } else {
      // Digit or decimal button clicked
      currentNumber += value;
    }
    display.innerText = currentNumber;
  }


  function clearDisplay() {
    // Clear the current number and operation
    firstNumber = null;
    previousOperationResult = null;
    currentNumber = '';
    currentOperation = null;
    //result = null;
    display.innerText = '';
  }


  function operate() {
    if (currentOperation === null || firstNumber === null) {
      return;
    }
    let secondNumber = parseFloat(currentNumber);
    let result = null;
  
    if (previousOperationResult === null) {
      // First operation
      result = firstNumber;
    } else {
      // next operation
      firstNumber = previousOperationResult;
      result = firstNumber;
    }
  
    if (currentOperation === '+') {
      result += secondNumber;
    } else if (currentOperation === '-') {
      result -= secondNumber;
    } else if (currentOperation === '*') {
      result *= secondNumber;
    } else if (currentOperation === '/') {
      if (secondNumber === 0) {
        display.innerText = 'Division by zero! Big NO NO!';
        return;
      } else {
        result /= secondNumber;
      }
    }
  
    // Round the result to 2 decimal places
    result = Math.round(result * 100) / 100;
    // Store the result as previous operation result
    previousOperationResult = result;
    // Update the display
    display.innerText = result.toString();
    // Reset current number and operation
    currentNumber = '';
    currentOperation = null;
  }

numBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      let value = event.target.dataset.value;
      appendToDisplay(value);
    });
  });
  
  operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
      let operator = button.getAttribute('data-operator');
      appendToDisplay(operator);
    });
  });


  clearBtn.addEventListener('click', clearDisplay);