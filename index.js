const display = document.querySelector('.display');
const previous = document.querySelector('.previousNumber');
const current = document.querySelector('.currentNumber');
const numbers = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operand');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clearAll');
const changeSign = document.querySelector('.changeSign');

class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear();
    }

    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    changeSign() {
        this.currentNumber = 0 - this.currentNumber;
    }

    appendNumber(nr) {
        this.currentNumber = this.currentNumber.toString();
            if (this.currentNumber.includes('.') && nr === ".") {
                return;
            }
            if (this.currentNumber.length > 15) {
                return;
            }
        this.currentNumber = this.currentNumber + nr.toString();
    }

    updateDisplay() {
        previous.textContent = '';
        current.textContent = this.currentNumber;
        if (this.operation != undefined)
            previous.textContent = `${this.previousNumber} ${this.operation} `
    }

    operate(operator) {
        if (this.currentNumber === '') return;
        if (this.previousNumber !== '')
            this.equal();
        this.operation = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }

    equal() {
        if (this.currentNumber === '')
            return;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        switch(this.operation) {
            case "+":
                this.currentNumber = prev + current;
                break;
            case "-":
                this.currentNumber = prev - current;
                break;
            case "÷":
                this.currentNumber = prev / current;
                break;
            case "×":
                this.currentNumber = prev * current;
                break;
        }
            this.operation = undefined;
            this.previousNumber = '';
            previous.textContent = '';
    }

    delete() {
        if (this.currentNumber === '') {
            this.operation = undefined;
            this.currentNumber = this.previousNumber;
            this.previousNumber = '';
        }
        else {
            console.log(this.currentNumber);
            this.currentNumber = String(this.currentNumber);
            const length = this.currentNumber.length; 
            this.currentNumber = this.currentNumber.slice(0, length-1)
        }
    }
}

const  calculator = new Calculator('', '');

numbers.forEach(number => { 
    number.onclick = function() {
        calculator.appendNumber(number.textContent);
        calculator.updateDisplay();
    }
})

operators.forEach(operator => { 
    operator.onclick = function() {
        calculator.operate(operator.textContent);
        calculator.updateDisplay();
    }
})
equal.onclick = function() {
    calculator.equal();
    calculator.updateDisplay();
}

clear.onclick = function() {
    calculator.clear();
    calculator.updateDisplay();
}

changeSign.onclick = function() {
    calculator.changeSign();
    calculator.updateDisplay();
}

function clickButton(button, name) {
    button.click();
    button.classList.add(name);
    setTimeout(function() {
        button.classList.remove(name);
    }, 100)
}

document.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <=9 || e.key === '.') {
        numbers.forEach(number => {
            if (number.textContent === e.key) {
                clickButton(number, 'digitHover');
            }
        })
    }
    else if (e.keyCode >= 106 && e.keyCode <= 111) {
        operators.forEach(operator => {
            if ((e.keyCode === 106 && operator.textContent === '×') || (operator.textContent === e.key) || (e.keyCode === 111 && operator.textContent === '÷')) {
                clickButton(operator, 'operandHover'); 
            }
        })
    }
    else if (e.key === '=') {
        clickButton(equal, 'equalHover');
    }

    else if (e.keyCode === 8) {
        calculator.delete();
        calculator.updateDisplay();
    }
    else if (e.keyCode === 46)
        clickButton(clear, 'clearHover');

    else if (e.key === "Shift")
        clickButton(changeSign, 'changeSignHover');
})