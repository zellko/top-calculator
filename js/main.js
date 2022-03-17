const buttonNumbers = document.querySelectorAll(".number");
const buttonOperator = document.querySelectorAll(".operator");
const buttonPoint = document.querySelector(".point");
const buttonPlusMinus = document.querySelector(".plus-minus");
const buttonEqual = document.querySelector(".equal");
const buttonBackspace = document.querySelector(".backspace");
const buttonClear = document.querySelector(".clear")
const displayOperation = document.querySelector(".d-operation");
const displayOperand = document.querySelector(".d-operand");

let operandToModify = 0; // Variable to define if it's the first operand or the seconde operand to modify when the user is typing chiffe
let operand = ["", ""]; // Variable to store the two operands
let operator = ""; // Variable to store the choosen operator
let result = undefined;


// ************************
// MATH OPERATION
// ************************

function divide(foperand) {
    return Number(foperand[0]) / Number(foperand[1]);
};

function multiply(foperand) {
    return Number(foperand[0]) * Number(foperand[1]);
};

function add(foperand) {
    return Number(foperand[0]) + Number(foperand[1]);
};

function subtract(foperand) {
    return Number(foperand[0]) - Number(foperand[1]);
};

// ************************
// Operate
// ************************

function opeOperate(e) {

    // Exceptions
    if (operand[0] === "") return; // If user press an operator and the first operand is empty, input is ignored

    // If user press an operator and the second operand is empty... 
    if (operand[1] === "") {
        console.log("operand 2 is empty");
        operator = this.id; // ...store the operator 
        operandToModify = 1; // ...change the operand to modify
        displayOperation.textContent = `${Number(operand[0])} ${operator}`; // Display the first number and operator on the top screen
        displayOperand.textContent = ""; // Clear bottom screen
        return
    };

    if (operator === "%") {
        if (Number(operand[1]) === 0) {
            displayOperation.textContent = "";
            displayOperand.textContent = "Div 0 - undefined";
            operandToModify = 0;
            operand[0] = "";
            operand[1] = "";
            return;
        };
        result = divide(operand);
    };
    if (operator === "x") {
        result = multiply(operand);
    };
    if (operator === "+") {
        result = add(operand);
    };
    if (operator === "-") {
        result = subtract(operand);
    };

    operand[0] = String(result);
    operand[1] = "";
    operandToModify = 1; // ...change the operand to modify
    operator = this.id; // ...store the operator 


    displayOperation.textContent = `${Number(operand[0])} ${operator}`; // Display the first number and operator on the top screen
    displayOperand.textContent = `${Number(operand[0])}`; // Display the first number and operator on the top screen
};

function equOperate(e) {

    // Exceptions
    if (operand[0] === "" || operand[1] === "" || operator === "") {
        console.log("one of the param is not defined");
        return;
    };


    if (operator === "%") {
        if (Number(operand[1]) === 0) {
            displayOperation.textContent = "";
            displayOperand.textContent = "Div 0 - undefined";
            operandToModify = 0;
            operand[0] = "";
            operand[1] = "";
            return;
        };
        result = divide(operand);
    };
    if (operator === "x") {
        result = multiply(operand);
    };
    if (operator === "+") {
        result = add(operand);
    };
    if (operator === "-") {
        result = subtract(operand);
    };

    displayOperation.textContent = `${Number(operand[0])} ${operator} ${Number(operand[1])} =`; // Display the first number and operator on the top screen
    displayOperand.textContent = `${Number(result)}`; // Display the first number and operator on the top screen
    operand[0] = String(result);
    operand[1] = "";
    operandToModify = 0; // ...change the operand to modify
};

// ************************
// OPERAND MODIFICATION
// ************************

function modifyOperandNumber(e) {
    //Function to modify the operand when the user click on a number

    // Exceptions
    //if (((operand[operandToModify]) === "") && (this.id === "0")) return; // If user press "0" and operand is empty, input is ignored
    if (operand[operandToModify].length > 14) return; // If the length is > 14, ignore the input (operator too big)

    if ((operandToModify === 0) && (Number(operand[0]) === result)) {
        displayOperation.textContent = "";
        operand[0] = "";
    };

    operand[operandToModify] += this.id; // Add the number to the operation variable at the position 1(first operand) or 2 second operand)
    displayOperand.textContent = operand[operandToModify]; // Disply the number on the screen

    console.log(operand);
};

function modifyOperandPoint() {
    // Function to add "." to the number

    // Exceptions
    if (operand[operandToModify].includes(".")) return; // If the operand already contain ".", input is ignored

    operand[operandToModify] += ".";
    displayOperand.textContent = operand[operandToModify];
    console.log(operand);
};

function modifyOperandSymbole() {
    // Function switch the number positive of negative
    (operand[operandToModify].includes("-")) ?
    operand[operandToModify] = operand[operandToModify].replace("-", ""):
        operand[operandToModify] = `-${operand[operandToModify]}`;

    displayOperand.textContent = operand[operandToModify];
    console.log(operand);
};

// ************************
// CLEAR AND BACKSPACE
// ************************

function removeLastEntry() {
    // Function to remove the last entry
    operand[operandToModify] = operand[operandToModify].slice(0, operand[operandToModify].length - 1)
    displayOperand.textContent = operand[operandToModify];
    console.log(operand);
};

function clearNumber() {
    // Clear all entries
    operand = ["", ""];
    operandToModify = 0;
    displayOperand.textContent = "";
    displayOperation.textContent = "";
    console.log(operand);
};

// ************************
// BUTTON EVENT LISTENER
// ************************

buttonNumbers.forEach(button => button.addEventListener("click", modifyOperandNumber));
buttonPoint.addEventListener("click", modifyOperandPoint);
buttonPlusMinus.addEventListener("click", modifyOperandSymbole);
buttonOperator.forEach(button => button.addEventListener("click", opeOperate));
buttonEqual.addEventListener("click", equOperate);
buttonBackspace.addEventListener("click", removeLastEntry);
buttonClear.addEventListener("click", clearNumber);