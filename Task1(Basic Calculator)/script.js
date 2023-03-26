let display = document.getElementById('result');
let calculation = '';

function addToDisplay(value) {
  calculation += value;
  display.innerHTML = calculation;
}

function clearDisplay() {
  calculation = '';
  display.innerHTML = '';
}

function deleteChar() {
  calculation = calculation.slice(0, -1);
  display.innerHTML = calculation;
}

function calculateResult() {
  let result = eval(calculation);
  display.innerHTML = result;
  calculation = '';
}
