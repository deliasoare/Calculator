const STANDARD_NUMBER = 0;

let currentOperation = String(STANDARD_NUMBER);
let currentOperator = '';
let nr1 = STANDARD_NUMBER;
let nr2 = STANDARD_NUMBER;

const display = document.querySelector('.display');
const preview = document.querySelector('.preview');
const numbers = [document.querySelector('.one'), document.querySelector('.two'), document.querySelector('.three'), document.querySelector('.four'),document.querySelector('.five'),document.querySelector('.six'), document.querySelector('.seven'), document.querySelector('.eight'), document.querySelector('.nine')];
const operators = [document.querySelector('.divide'), document.querySelector('.times'), document.querySelector('.minus'), document.querySelector('.plus'), document.querySelector('.equal')];
const buttons = [numbers, operators];

class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear();
    }

    clear() {
        this.previousNumber = '';
        this.currentNumber = '';
        this.operation = undefined;
    }
}
const  calculator = new Calculator(nr1, nr2)
numbers.forEach(number => { 
    number.onclick = function() {
        calculator.updateDisplay();
    }
})

operators.forEach(operator => { 
    operator.onclick = function() {
        calculator.operate();
        calculator.updateDisplay();
    }
})

cr cr