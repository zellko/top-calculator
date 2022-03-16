const buttonNumbers = document.querySelectorAll(".number");
const buttonOperator = document.querySelectorAll(".operator");
const buttonPoint = document.querySelector(".point");
const buttonPlusMinus = document.querySelector(".plus-minus");
const buttonEqual = document.querySelector(".equal");
const buttonBackspace = document.querySelector(".backspace");
const buttonClear = document.querySelector(".clear")
const displayOperation = document.querySelector(".d-operation");
const displayOperand = document.querySelector(".d-operand");

// let operation = [, "", ""] // Variable to store operation parameters [operator, first operand, second operand]

let operandToModify = 1; // Variable to define if it's the first operand or the seconde operand to modify when the user is typing chiffe
let operand = ["", ""]; // Variable to store the two operands
let operator = ""; // Variable to store the choosen operator



function test(e) {
    console.log(e);
    console.log(this.id);
    console.log(typeof(this.id))
}

function modifyOperandNumber(e) {
    //Function to modify the operand when the user click on a number

    // Exceptions
    if (((operand[operandToModify]) == "") && (this.id === "0")) return; // If user press "0" and operator is empty, input is ignored
    if (operand[operandToModify].length > 14) return; // If the length is > 14, we ignore the input (operator too big)

    operand[operandToModify] += this.id; // Add the number to the operation variable at the position 1(first operand) or 2 second operand)
    displayOperand.textContent = operand[operandToModify]; // Disply the number on the screen

    console.log(operand[operandToModify]);
};

function modifyOperandPoint() {
    // Function to add "." to the number

    // Exceptions
    if (operand[operandToModify].includes(".")) return; // If the operand already contain ".", input is ignored

    operand[operandToModify] += ".";
    displayOperand.textContent = operand[operandToModify];
    console.log(operand[operandToModify]);
};

function modifyOperandSymbole() {
    // Function switch the number positive of negative
    (operand[operandToModify].includes("-")) ?
    operand[operandToModify] = operand[operandToModify].replace("-", ""):
        operand[operandToModify] = `-${operand[operandToModify]}`;

    displayOperand.textContent = operand[operandToModify];
    console.log(operand[operandToModify]);
};

function removeLastEntry() {
    // Function to remove the last entry
    operand[operandToModify] = operand[operandToModify].slice(0, operand[operandToModify].length - 1)
    displayOperand.textContent = operand[operandToModify];
    console.log(operand[operandToModify]);

};

function clearNumber() {
    // Clear all entries
    operand[operandToModify] = "";
    displayOperand.textContent = operand[operandToModify];
    console.log(operand[operandToModify]);
};

buttonNumbers.forEach(button => button.addEventListener("click", modifyOperandNumber));
buttonPoint.addEventListener("click", modifyOperandPoint);
buttonPlusMinus.addEventListener("click", modifyOperandSymbole);
buttonBackspace.addEventListener("click", removeLastEntry);
buttonClear.addEventListener("click", clearNumber);