const display = document.querySelector('.displayText')
const numbers = document.querySelectorAll('.number')
const clearBtn = document.querySelector('.clearDisplay')
const plusBtn = document.querySelector('.plus')
const resultBtn = document.querySelector('.result')
const minusBtn = document.querySelector('.minus')
const multiplyBtn = document.querySelector('.multiply')
const splitBtn = document.querySelector('.split')
const backspaceBtn = document.querySelector('.backspace')
const currentFirstOperand = document.querySelector('.displayFirstOperand')
const currentOperationElement = document.querySelector('.currentOperation')
const clearMemory = document.querySelector('.clearMemory')
const currentFunc = document.querySelector('.currentFunc')

let currentNumber = '0';
let firstOperand = 0;
let currentOperation = '';

const clearDisplay = () => {
    display.textContent = '0'
    currentNumber = '0'

}

const updateOperation = (e) => {
    if (Number(currentNumber) !== 0) { firstOperand = Number(currentNumber) }
    currentFirstOperand.textContent = firstOperand
    currentOperationElement.textContent = e.target.textContent
    currentFunc.style.fontSize = '25px';
    clearDisplay()

}
const clearAll = () => {
    clearDisplay()
    firstOperand = 0;
    currentOperation = ''
    currentFirstOperand.textContent = ''
    currentOperationElement.textContent = currentOperation
    currentFunc.style.fontSize = '0px'
}
const checkSize = (number) => {
    if (String(number).length > 10) {
        display.style.fontSize = '37px'
    } else {
        display.style.fontSize = '50px'
    }
}
const solve = () => {
    let result = 0
    if (!currentOperation) return
    if (currentOperation === 'split') {
        if (Number(currentNumber) === 0) {
            alert('На ноль делить нельзя!')
            return
        }
        result = firstOperand / Number(currentNumber)
    }
    if (currentOperation === 'plus') {
        result = firstOperand + Number(currentNumber)
    }
    if (currentOperation === 'minus') {
        result = firstOperand - Number(currentNumber)
    }
    if (currentOperation === 'multiply') {
        result = firstOperand * Number(currentNumber)
    }


    result = result.toFixed(8)
    if (result.includes('.')) {
        result = Number(result.replaceAll("0*$", ""));
    } else {
        result = Number(result.replace(/^0+/, ''))
    }
    checkSize(result)

    firstOperand = 0;
    currentOperation = ''
    currentFirstOperand.textContent = ''
    currentOperationElement.textContent = currentOperation
    currentFunc.style.fontSize = '0px'
    display.textContent = result
    currentNumber = String(result)


}
const toDisplay = (event) => {
    checkSize(currentNumber)
    if (currentNumber.length > 20) {
        alert('Слишком большое число!')
        return
    }


    if (!currentNumber.includes('.') || event.target.textContent !== '.') {

        currentNumber += event.target.textContent
        currentNumber = currentNumber.replace(/^0+/, '')
    }

    if (currentNumber[0] === '.') {
        currentNumber = '0' + currentNumber
    }



    if (!currentNumber) {
        currentNumber = '0'
    }
    display.textContent = currentNumber


}

backspaceBtn.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1)
    if (!currentNumber) {
        currentNumber = '0'

    }
    display.textContent = currentNumber
    checkSize(currentNumber)
})

multiplyBtn.addEventListener('click', (event) => {
    if (currentOperation === 'multiply') { solve() }
    currentOperation = 'multiply'
    updateOperation(event)
})
splitBtn.addEventListener('click', (event) => {
    if (currentOperation === 'split') { solve() }
    currentOperation = 'split'
    updateOperation(event)

})
minusBtn.addEventListener('click', (event) => {
    if (currentOperation === 'minus') {
        solve()
    }
    console.log(currentNumber)
    if (currentNumber === '0') {
        currentNumber = '-'
        display.textContent = currentNumber
        return
    }
    if (currentOperation === 'minus') solve()
    currentOperation = 'minus'
    updateOperation(event)
})
clearBtn.addEventListener('click', clearDisplay)

plusBtn.addEventListener('click', (event) => {
    if (currentOperation === 'plus') {
        solve()
    }
    currentOperation = 'plus'
    updateOperation(event)
})
clearMemory.addEventListener('click', clearAll)

resultBtn.addEventListener('click', solve)

numbers.forEach(item => item.addEventListener('click', (event) => toDisplay(event)))