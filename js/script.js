class Calculator {
    constructor(prevOperTxtEl, currOperTxtEl) {
        this.prevOperTxtEl = prevOperTxtEl;
        this.currOperTxtEl = currOperTxtEl;
        this.clear();
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNum(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOper(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case 'x':
                computation = prev * curr;
                break;
            case '%':
                computation = prev / curr;
                break;
            default:
                return
        }

        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = ''

    }

    getDisplayNum(number) {
        // const floatNum = parseFloat(number);
        // if (isNaN(floatNum)) return ''
        // return floatNum.toLocaleString('en')

        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }

    }

    updateDis() {
        this.currOperTxtEl.innerText = this.getDisplayNum(this.currOperand);
        if (this.operation != null) {
            this.prevOperTxtEl.innerText =
                `${this.getDisplayNum(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperTxtEl.innerText = '';
        }

    }
}

const numButs = document.querySelectorAll('[data-number]');
const operButs = document.querySelectorAll('[data-operation]');
const eqBut = document.querySelector('[data-equals');
const delBut = document.querySelector('[data-del');
const clrBut = document.querySelector('[data-allclr]');
const prevOperTxtEl = document.querySelector('[data-prev-oprnd');
const currOperTxtEl = document.querySelector('[data-curr-oprnd]');




const calculator = new Calculator(prevOperTxtEl, currOperTxtEl);

numButs.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDis();
    })
})

operButs.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOper(button.innerText);
        calculator.updateDis();
    })
})

eqBut.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDis();
})

clrBut.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDis();
})

delBut.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDis();
})