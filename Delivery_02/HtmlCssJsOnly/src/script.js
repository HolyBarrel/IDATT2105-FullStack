var symbols = [
                "C", "ANS", "DEL", "+", "1", "2", 
                "3", "-", "4", "5", "6", "*", 
                "7", "8", "9", "/", " ", "0", 
                ".", "="
            ]

var currentFirstNum = ""
var currentOperator = ""
var currentSecondNum = ""
var prevAnswer = ""

function addEquation(equation) {
     var list = document.getElementById("scroll_box")
    var list_item = document.createElement("li")
    list_item.appendChild(document.createTextNode(equation))
    list.appendChild(list_item)
    setScroll()
}

function setScroll() {
    var sb = document.getElementById("scroll_box")
	sb.scrollTop = sb.scrollHeight
}


function loadButtons() {
    var inputs_field = document.getElementById("input_fields")
    for(let i = 0; i < symbols.length; i++) {
        var action_btn = document.createElement("BUTTON")
        action_btn.appendChild(document.createTextNode(symbols[i]))
        action_btn.setAttribute('id', 'action_btn{' + symbols[i] + '}')
        action_btn.setAttribute('class', 'action_btn')
        if(symbols[i] === "C")
        {
            action_btn.onclick = function() {clear()}
        }
        else if(symbols[i] === "ANS")
        {
            action_btn.onclick = function() {answer()}
        }
        else if(symbols[i] === "DEL")
        {
            action_btn.onclick = function() {deleteNum()}
        }
        else if(symbols[i] === "=")
        {
            action_btn.onclick = function() {compute()}
        }
        else if(parseFloat(symbols[i]) || (symbols[i] === ".") || symbols[i] === "0") {
            action_btn.onclick = function() {getInputNum(symbols[i])}
        }
        else
        {
            action_btn.onclick = function() {getInputOperator(symbols[i])}
        }
        inputs_field.appendChild(action_btn)
    }
}

function getInputNum(input) {
    if(currentOperator === "") {
        currentFirstNum += input
    }
    else {
        currentSecondNum += input
    }
    updateDisplay()
    
}

function getInputOperator(input) {
    currentOperator = input
    updateDisplay()
}

function reset() {  
    currentFirstNum = ""
    currentOperator = ""
    currentSecondNum = ""
}

function compute() {
    document.getElementById("error_display").innerHTML = ""

    if (!isNaN(parseFloat(currentFirstNum) + parseFloat(currentSecondNum))){

        if (currentOperator === "+"){
            prevAnswer = parseFloat(currentFirstNum) + parseFloat(currentSecondNum)
        }
        else if (currentOperator === "-") {
            prevAnswer = parseFloat(currentFirstNum) - parseFloat(currentSecondNum)
        }
        else if (currentOperator === "*") {
            prevAnswer = parseFloat(currentFirstNum) * parseFloat(currentSecondNum)
        }
        else if (currentOperator === "/") {
            if( parseFloat(currentSecondNum) != 0){
                prevAnswer = parseFloat(currentFirstNum) / parseFloat(currentSecondNum)
            }
        }
    }

    equals()

    reset()
}

function equals() {
    var display = document.getElementById("display_field")
    if(parseFloat(prevAnswer) || prevAnswer == "0") {
        display.innerHTML = prevAnswer
        if(currentFirstNum === "" || currentSecondNum === "") {
            addEquation(" = " + prevAnswer)
        }
        else {
            addEquation(currentFirstNum + " " + currentOperator + " " + currentSecondNum + " = " + prevAnswer)
        }
        
    }
    else {
        display.innerHTML = "NaN"
        document.getElementById("error_display").innerHTML = "COULD NOT COMPUTE"
    }
}

function answer() {
    getInputNum(prevAnswer)
    updateDisplay()
}

function clear() {
    reset()
    updateDisplay()
}

function deleteNum() {
    if (currentOperator === "" && currentSecondNum == "") {
        //delete last symbol of currentFirstNum string
        currentFirstNum = currentFirstNum.substring(0, currentFirstNum.length-1)
    }
    else if (currentOperator != "" && currentSecondNum === "") {
        currentOperator = ""

    }
    else {
        //delete last symbol of currentSecondNum string
        currentSecondNum = currentSecondNum.substring(0, currentSecondNum.length-1)
    }
    updateDisplay()
}



function updateDisplay() {
    var display = document.getElementById("display_field")
    var string = ""
    if(currentFirstNum != "") {
        string += currentFirstNum
    }
    if(currentOperator != "") {
        string += currentOperator
    }
    if(currentSecondNum != "") {
        string += currentSecondNum
    }
    display.innerHTML = string

}

document.addEventListener("DOMContentLoaded", function() {
    loadButtons()
})



