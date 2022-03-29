class Calculator {
  constructor(prevOperandTxtElement, currentOperandTxtElement) {
    this.prevOperandTxtElement = prevOperandTxtElement
    this.currentOperandTxtElement = currentOperandTxtElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.prevOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.prevOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.prevOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.prevOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTxtElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.prevOperandTxtElement.innerText =
        `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
    } else {
      this.prevOperandTxtElement.innerText = ''
    }
  }
}


const numberBtn = document.querySelectorAll('[numberButton]')
const operationBtn = document.querySelectorAll('[operationButton]')
const equalsBtn = document.querySelector('[equalsButton]')
const deleteBtn = document.querySelector('[deleteButton]')
const allClearBtn = document.querySelector('[all-clearButton]')
const prevOperandTxtElement = document.querySelector('[previous-data]')
const currentOperandTxtElement = document.querySelector('[current-data]')

const calculator = new Calculator(prevOperandTxtElement, currentOperandTxtElement)

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})