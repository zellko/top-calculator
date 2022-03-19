const buttons = document.querySelectorAll("button");
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
// NUMBER ROUNDING, CLEANING
// ************************

function roundNumber(n) {
    let nToString = String(n);

    if (nToString.length <= 11) return nToString;
    if (n >= 1e+21 || n <= -1e+21) return nToString;
    if (n >= 1000000000) return `${Math.round((n/10**(nToString.length-1)) * 100) / 100}e${nToString.length-1}`;
    if (n <= -1000000000) return `${Math.round((n/10**(nToString.length-1)) * 100) / 100}e${nToString.length-1}`;
    if (n <= 0.000001) return `${Math.round(n * 10 ** Number(nToString.split("-")[1]) * 100) / 100}e-${nToString.split("-")[1]}`;
    if ((nToString.length > 3) && nToString.includes(".") && n > 1) return Math.round(n * 100) / 100;
    if (nToString.length > 3 && nToString.includes(".") && n < 1 && n > 0) return Math.round(n * 100000) / 100000;

    return nToString;
};

// ************************
// OPERATION
// ************************

function opeOperate(foperator) {

    // Exceptions
    if (operand[0] === "") return; // If user press an operator and the first operand is empty, input is ignored

    // If user press an operator and the second operand is empty... 
    if (operand[1] === "") {
        operator = foperator; // ...store the operator 
        operandToModify = 1; // ...change the operand to modify
        displayOperation.textContent = `${roundNumber(Number(operand[0]))} ${operator}`; // Display the first number and operator on the top screen
        displayOperand.textContent = ""; // Clear bottom screen
        return
    };

    if (operator === "/") {
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
    if (operator === "*") {
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
    operator = foperator; // ...store the operator 

    displayOperation.textContent = `${roundNumber(result)} ${operator}`; // Display the first number and operator on the top screen
    displayOperand.textContent = `${roundNumber(result)}`; // Display the first number and operator on the top screen
};

function equOperate() {

    // Exceptions
    if (operand[0] === "" || operand[1] === "" || operator === "") return;

    if (operator === "/") {
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
    if (operator === "*") {
        result = multiply(operand);
    };
    if (operator === "+") {
        result = add(operand);
    };
    if (operator === "-") {
        result = subtract(operand);
    };

    displayOperation.textContent = `${roundNumber(Number(operand[0]))} ${operator} ${roundNumber(Number(operand[1]))} =`; // Display the first number and operator on the top screen
    displayOperand.textContent = `${roundNumber(result)}`; // Display the first number and operator on the top screen

    operand[0] = String(result);
    operand[1] = "";
    operandToModify = 0; // ...change the operand to modify
};

// ************************
// OPERAND MODIFICATION
// ************************

function modifyOperandNumber(num) {
    //Function to modify the operand when the user click on a number

    if ((operandToModify === 0) && (Number(operand[0]) === result)) {
        displayOperation.textContent = "";
        operand[0] = "";
    };

    // Exceptions
    if (operand[operandToModify].length > 20) return; // If the length is > 14, ignore the input (operator too big)

    operand[operandToModify] += num // Add the number to the operation variable at the position 1(first operand) or 2 second operand)
    displayOperand.textContent = operand[operandToModify]; // Disply the number on the screen
};

function modifyOperandPoint() {
    // Function to add "." to the number

    //If the result of the revious calculation is displayed...
    //...we first clear it before to apply "."
    if ((operandToModify === 0) && (Number(operand[0]) === result)) {
        displayOperation.textContent = "";
        operand[0] = "";
    };
    if (operand[operandToModify].includes(".")) return; // If the operand already contain ".", input is ignored

    operand[operandToModify] += ".";
    displayOperand.textContent = operand[operandToModify];
};

function modifyOperandSymbole() {
    // Function switch the number positive of negative
    (operand[operandToModify].includes("-")) ?
    operand[operandToModify] = operand[operandToModify].replace("-", ""):
        operand[operandToModify] = `-${operand[operandToModify]}`;

    displayOperand.textContent = operand[operandToModify];
};

// ************************
// CLEAR AND BACKSPACE
// ************************

function removeLastEntry() {
    // Function to remove the last entry

    //If the result of the revious calculation is displayed...
    //...we clear
    if ((operandToModify === 0) && (Number(operand[0]) === result)) { //NEED TO CHECK THIS
        displayOperation.textContent = "";
        operand[0] = "";
    };

    if (operandToModify === 1 && operand[operandToModify] === "") {
        operator = "";
        operandToModify = 0;
        displayOperation.textContent = "";
        displayOperand.textContent = operand[operandToModify];
        return;
    };

    operand[operandToModify] = operand[operandToModify].slice(0, operand[operandToModify].length - 1)
    displayOperand.textContent = operand[operandToModify];
};

function clearNumber() {
    // Clear operands and operator
    operand = ["", ""];
    operandToModify = 0;
    displayOperand.textContent = "";
    displayOperation.textContent = "";
};

// ************************
// CHECK EVENT
// ************************

function checkEvent(e) {
    if (e.pointerId === -1) return; // Avoid that a button is "clicked" by pressing enter

    // Check if the event is a button click or a keydown
    if (e.type === "click" && this.className === "number") modifyOperandNumber(this.id);
    if (e.type === "click" && this.className === "point") modifyOperandPoint();
    if (e.type === "click" && this.className === "plus-minus") modifyOperandSymbole();
    if (e.type === "click" && this.className === "operator") opeOperate(this.id);
    if (e.type === "click" && this.className === "equal") equOperate();
    if (e.type === "click" && this.className === "backspace") removeLastEntry();
    if (e.type === "click" && this.className === "clear") clearNumber();
    if (e.type === "keydown" && (Number(e.key) >= 0 && Number(e.key) <= 9)) modifyOperandNumber(e.key);
    if (e.type === "keydown" && e.key === ".") modifyOperandPoint();
    if (e.type === "keydown" && e.key === "Enter") equOperate();
    if (e.type === "keydown" && e.key === "Backspace") removeLastEntry();
    if (e.type === "keydown" && e.key === "/") opeOperate("/");
    if (e.type === "keydown" && e.key === "*") opeOperate("*");
    if (e.type === "keydown" && e.key === "-") opeOperate("-");
    if (e.type === "keydown" && e.key === "+") opeOperate("+");
}

// ************************
// EVENT LISTENER
// ************************

buttons.forEach(button => button.addEventListener("click", checkEvent));
window.addEventListener('keydown', checkEvent);