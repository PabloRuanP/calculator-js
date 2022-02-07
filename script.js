let numbers = document.querySelectorAll(' .number');
let operators = document.querySelectorAll(' .operator');

let cleanAll = document.querySelector(' .cleanBtn');
let backspc = document.querySelector(' .backspace');
let equalTo = document.querySelector(' .equalBtn');
let dot = document.querySelector(' .dot');

let display = document.querySelector(' #calcScreen');
let output = []

let equalToPressed = false;

for (let i = 0 ; i < numbers.length ; i++) {

    numbers[i].addEventListener("click", function () {

        if (equalToPressed) {
            display.textContent = '';
            equalToPressed = false;
        }

        if ('0123456789.+-x÷'.includes(display.textContent[display.textContent.length - 1]) || display.textContent == '' ) {

            display.textContent += this.textContent;
            evaluate();
        }
    } );
}

for (let i = 0 ; i < operators.length ; i++ ) {

    operators[i].addEventListener("click" , function () {

        if (display.textContent !== "." && display.textContent !== "") {
            equalToPressed = false;

            if ("+-x÷".includes(display.textContent[display.textContent.length - 1]))  {
                display.textContent = display.textContent.substring(0, display.textContent.length - 1) + this.textContent;

            } else {
                display.textContent += this.textContent;
            }
        }
    })
};

equalTo.addEventListener("click", function () {
    if (output.textContent !== "") {
        display.textContent = output.textContent;
        output.textContent = "";
        equalToPressed = true
    }
})


cleanAll.addEventListener("click", function () {
    equalToPressed = false;
    display.textContent = "";
    output.textContent = "";
});

backspc.addEventListener("click", function () {
    equalToPressed = false;
    display.textContent = display.textContent.substr(0, display.textContent.length - 1); // substiruir por substring e testar
    evaluate();
});

dot.addEventListener("click", function () {
    if (equalToPressed) {
        display.textContent = "";
        equalToPressed = false
    }

    let start = 0;

    for (let i = display.textContent.length - 1; i >= 0 ; i--) {
        if ("+-x÷".includes(display.textContent[i])) {
            start = i + 1;
            break;
        }
    }

    if (!display.textContent.substring(start, display.textContent.length).includes(".")) {
        display.textContent += "."; 
    }
});

function evaluate() {
    let expression = display.textContent;

    for (let i = 0; i < expression.length; i++ ) {
        if (expression[i] === "x") {
            expression = expression.substring(0, i) + "*" + expression.substring(i + 1, expression.length);
        }

        if (expression[i] === "÷") {
            expression = expression.substring(0, i) + "/" + expression.substring(i + 1, expression.length);
        }
    }

    const tempFunc = (exp) => {
        return new Function(`return ${exp}`)();
    };

    if ("0123456789.".includes(expression[expression.length - 1]) && tempFunc(expression) != expression) {
       output.textContent = tempFunc(expression)

    } else {
        output.textContent = "";
    }
}

document.querySelectorAll('tr').forEach((el) => {
    el.addEventListener("click", function () {
        this.classList.add("click-effect");
        setTimeout(() => {
            this.classList.remove("click-effect");
        }, 100);
    });
});
