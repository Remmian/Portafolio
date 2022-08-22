'use strict';
const number1 = document.querySelector("#number1");
const number2 = document.querySelector("#number2");
const number3 = document.querySelector("#number3");
const number4 = document.querySelector("#number4");
const number5 = document.querySelector("#number5");
const number6 = document.querySelector("#number6");
const number7 = document.querySelector("#number7");
const number8 = document.querySelector("#number8");
const number9 = document.querySelector("#number9");
const number0 = document.querySelector("#number0");
const point = document.querySelector("#point");
const enterKey = document.querySelector("#enter-key");

// QUESTIONS
let questionChangeTimes = 2;
const question1 = document.querySelector("#question1");
const question2 = document.querySelector("#question2");
const question3 = document.querySelector("#question3");

const userNumber = document.querySelector("#user-number");
const deleteNumber = document.querySelector("#delete-number");
const cleanNumbers = document.querySelector("#clean-numbers");

number1.addEventListener("click", showNumber);
number2.addEventListener("click", showNumber);
number3.addEventListener("click", showNumber);
number4.addEventListener("click", showNumber);
number5.addEventListener("click", showNumber);
number6.addEventListener("click", showNumber);
number7.addEventListener("click", showNumber);
number8.addEventListener("click", showNumber);
number9.addEventListener("click", showNumber);
number0.addEventListener("click", showNumber);
point.addEventListener("click", showNumber);
enterKey.addEventListener("click", saveNumber);

deleteNumber.addEventListener("click", removeNumber);
cleanNumbers.addEventListener("click", cleanAllNumbers);

let numbers = "";
const interestData = [];

function showNumber(event) {
    const chosenNumber = event.srcElement.textContent;
    numbers += chosenNumber;

    userNumber.innerHTML = numbers;
}

function removeNumber() {
    numbers = numbers.slice(0, -1);
    userNumber.innerHTML = numbers;
}

function cleanAllNumbers() {
    numbers = "";
    userNumber.innerHTML = numbers;
}

function saveNumber() {
    numbers = parseFloat(numbers);
    interestData.push(numbers);
    cleanAllNumbers();
    questionChange();
}

function questionChange() {
    if (questionChangeTimes === 2) {
        question1.classList.toggle("hide");
        question2.classList.toggle("hide");
        questionChangeTimes -= 1;
    }
    else if (questionChangeTimes === 1) {
        question2.classList.toggle("hide");
        question3.classList.toggle("hide");
        questionChangeTimes -= 1;
    }

    else {
        question3.classList.toggle("hide");
        const interest = getInterest();
        userNumber.innerHTML = `
        El interés a pagar es : ${interest} <br>
        Interés + dinero prestado = ${interest + interestData[0]}`;
    }
}

function getInterest() {
    const capital = interestData[0];
    const interestRate = interestData[1] / 100;
    const time = interestData[2] / 12;
    const interest = capital * interestRate * time;
    return interest;
}