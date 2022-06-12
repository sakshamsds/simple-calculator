
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return Math.round(100 * x * y) / 100;
}

function divide(x, y) {
    return y === 0 ? "Err!!" : Math.round(100 * x / y) / 100;
}

let num1 = -1;
let operator = '';
let num2 = -1;

function operate(func, x, y) {
    switch (func) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case 'x':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
}

const numbers = document.querySelectorAll('.num');
const methods = document.querySelectorAll('.method');
const equals = document.querySelector('.equals');
const display = document.querySelector('.current');
const history = document.querySelector('.history');

numbers.forEach(number => {
    number.addEventListener('click', () => populateDisplay(number.textContent));
});

methods.forEach(method => {
    method.addEventListener('click', () => populateDisplay(method.textContent));
});

function populateDisplay(input) {
    let displayValue = display.textContent;

    // handle big numbers
    if(displayValue.length > 8 || history.textContent.length > 14){
        display.textContent = 'Too Large';
        return;
    }

    if (!isNaN(parseInt(input))) {
        // if input is a number
        let displayNumber = parseInt(displayValue);
        if (!isNaN(displayNumber) && displayNumber !== 0) {
            // if display already contain a number
            display.textContent = displayValue + input;
        } else {
            display.textContent = input;
        }
        populateNumber(parseInt(display.textContent));
    } else {
        // input is an operator
        if (input === '=') {
            calculate(input);
        } else {
            display.textContent = input;
            populateOperator(input);
        }
    }
}

function populateNumber(num) {
    if (operator === '') {
        num1 = num;
    } else {
        num2 = num;
    }
}

function populateOperator(input) {
    if (operator === '' || num2 === -1) {
        operator = input;
    } else {
        calculate(input);
    }
}

function calculate(input) {
    // if any number is -1 for this call send error
    if (num1 === -1 || num2 === -1) {
        // do nothing rather than throwing error
        // display.textContent = 'Err!!';
        // resetVariables();
    } else {
        let result = operate(operator, num1, num2);
        history.textContent = "Curr: " + result;

        if (input === '=') {
            display.textContent = result;
            operator = '';
        } else {
            operator = input;
        }
        num1 = result;
        num2 = -1;
    }
}

// FULL CLEAR FUNCTIONALITY
const fullClear = document.querySelector('.all-clear');

fullClear.addEventListener('click', () => {
    display.textContent = '0';
    history.textContent = '';
    resetVariables();
});

function resetVariables() {
    num1 = -1;
    operator = '';
    num2 = -1;
}

// SINGLE CLEAR FUNCTIONALITY