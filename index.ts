let active_value_operation_plus_minus:number = 0;
let active_value_operation_mult_div:number = 1;
let last_pressed_button:string;
let last_operation:string;

//buttons
let output = document.querySelector('.output');
let button_invert_sign = document.querySelector('#invert_sign');
let button_0 = document.querySelector('#zero');
let button_1 = document.querySelector('#one');
let button_2 = document.querySelector('#two');
let button_3 = document.querySelector('#three');
let button_4 = document.querySelector('#four');
let button_5 = document.querySelector('#five');
let button_6 = document.querySelector('#six');
let button_7 = document.querySelector('#seven');
let button_8 = document.querySelector('#eight');
let button_9 = document.querySelector('#nine');

let button_dot = document.querySelector('#dot');
let button_plus = document.querySelector('#plus');
let button_minus = document.querySelector('#minus');
let button_mult = document.querySelector('#mult');
let button_div = document.querySelector('#div');
let button_equality = document.querySelector('#equality');
let button_AC = document.querySelector('#AC');
let button_cancel = document.querySelector('#cancel');

function digitButton(button, value) {
    if(button){
        button.addEventListener('click', () => {
            console.log("2",last_pressed_button, last_pressed_button != "digit")
            let currentValue = output.getAttribute("value");
            if(currentValue == "0" || last_pressed_button != "digit" && last_pressed_button != "dot") {
                output.setAttribute("value", value);
            }
            else {
                output.setAttribute("value", currentValue + value);
            }
            last_pressed_button = "digit";
        })
    }
}
function operate(button, operation_type) {

    if(last_operation != operation_type) {
        equality(last_operation);
    }

    equality(operation_type);

    console.log("pressed ", operation_type, last_pressed_button);
    last_pressed_button = operation_type;
    last_operation = operation_type;
    console.log("end pressed ", operation_type, last_pressed_button);
}

function equality(operation_type) {
    let currentValue = output.getAttribute("value");
    if(operation_type == "plus"){
        active_value_operation_plus_minus += parseFloat(currentValue);
        output.setAttribute("value", String(active_value_operation_plus_minus));
    }

    else if(operation_type == "minus"){
        if(active_value_operation_plus_minus == 0)
            active_value_operation_plus_minus += 2*parseFloat(currentValue);
        active_value_operation_plus_minus -= parseFloat(currentValue);
        output.setAttribute("value", String(active_value_operation_plus_minus));
    }

    else if(operation_type == "mult"){
        active_value_operation_mult_div *= parseFloat(currentValue);
        output.setAttribute("value", String(active_value_operation_mult_div));
    }

    else if(operation_type == "div") {
        if(active_value_operation_mult_div == 1)
            active_value_operation_mult_div *= parseFloat(currentValue) * parseFloat(currentValue);
        active_value_operation_mult_div /= parseFloat(currentValue);
        output.setAttribute("value", String(active_value_operation_mult_div));
    }

    else if(operation_type == "equality") {
        if (last_pressed_button == "digit"){
            if(last_operation == "plus" || last_operation == "minus"){
                output.setAttribute("value", String(active_value_operation_plus_minus));
            }
            else if(last_operation == "mult" || last_operation == "div"){
                output.setAttribute("value", String(active_value_operation_mult_div));
            }
            active_value_operation_plus_minus = 0;
            active_value_operation_mult_div = 1;
        }
    last_operation = operation_type;
    }
}



digitButton(button_0, "0");
digitButton(button_1, "1");
digitButton(button_2, "2");
digitButton(button_3, "3");
digitButton(button_4, "4");
digitButton(button_5, "5");
digitButton(button_6, "6");
digitButton(button_7, "7");
digitButton(button_8, "8");
digitButton(button_9, "9");



if(button_plus){
    button_plus.addEventListener('click', () => {
        console.log("pressed +")
        operate(button_plus, "plus");
        console.log("end pressed +")
    })
}
if(button_minus){
    button_minus.addEventListener('click', () => {
        operate(button_minus, "minus");
    })
}
if(button_mult){
    button_mult.addEventListener('click', () => {
        operate(button_mult, "mult");
    })
}
if(button_div){
    button_div.addEventListener('click', () => {
        operate(button_div, "div");
    })
}

if(button_equality){
    button_equality.addEventListener('click', () => {
        operate(button_equality, "equality");
    })
}

if(button_AC){
    button_AC.addEventListener('click', () => {
        output.setAttribute("value", "0");
        active_value_operation_plus_minus = 0;
        active_value_operation_mult_div = 1;
    })
}

if(button_cancel){
    button_cancel.addEventListener('click', () => {
        let currentValue = output.getAttribute("value");
        if(parseInt(currentValue) < 0 && currentValue.length == 2) {
            output.setAttribute("value", "0");
        }
        else if(currentValue.length > 1) {
            output.setAttribute("value", currentValue.substring(0, currentValue.length - 1));
        }
        else {
            output.setAttribute("value", "0");
        }
    })
}

if(button_invert_sign){
    button_invert_sign.addEventListener('click', () => {
        let currentValue = output.getAttribute("value");
        if(parseInt(currentValue) > 0) {
            output.setAttribute("value", "-" + currentValue);
        }
        else {
            output.setAttribute("value", currentValue.replace("-", ""));
        }
    })
}

if(button_dot){
    button_dot.addEventListener('click', () => {
        let currentValue = output.getAttribute("value");
        if(currentValue.indexOf(".") == -1) {
            output.setAttribute("value", currentValue + ".");
        }
        last_pressed_button = "dot";
    })
}

