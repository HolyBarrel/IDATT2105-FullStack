<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->

<script>
export default {
  data() {
    return {
      symbols: [
        "C",
        "ANS",
        "DEL",
        "+",
        "1",
        "2",
        "3",
        "-",
        "4",
        "5",
        "6",
        "*",
        "7",
        "8",
        "9",
        "/",
        " ",
        "0",
        ".",
        "=",
      ],
      currentFirstNum: "",
      currentOperator: "",
      currentSecondNum: "",
      prevAnswer: "",
    };
  },
  methods: {
    addEquation(equation) {
      var list = document.getElementById("scroll_box");
      var list_item = document.createElement("li");
      list_item.appendChild(document.createTextNode(equation));
      list.appendChild(list_item);
      this.setScroll();
    },

    setScroll() {
      var sb = document.getElementById("scroll_box");
      sb.scrollTop = sb.scrollHeight;
    },

    getInputNum(input) {
      if (this.currentOperator === "") {
        this.currentFirstNum += input;
      } else {
        this.currentSecondNum += input;
      }
      this.updateDisplay();
    },

    getInputOperator(input) {
      this.currentOperator = input;
      this.updateDisplay();
    },

    reset() {
      this.currentFirstNum = "";
      this.currentOperator = "";
      this.currentSecondNum = "";
    },

    compute() {
      document.getElementById("error_display").innerHTML = "";

      if (
        !isNaN(
          parseFloat(this.currentFirstNum) + parseFloat(this.currentSecondNum)
        )
      ) {
        if (this.currentOperator === "+") {
          this.prevAnswer =
            parseFloat(this.currentFirstNum) +
            parseFloat(this.currentSecondNum);
        } else if (this.currentOperator === "-") {
          this.prevAnswer =
            parseFloat(this.currentFirstNum) -
            parseFloat(this.currentSecondNum);
        } else if (this.currentOperator === "*") {
          this.prevAnswer =
            parseFloat(this.currentFirstNum) *
            parseFloat(this.currentSecondNum);
        } else if (this.currentOperator === "/") {
          this.prevAnswer =
            parseFloat(this.currentFirstNum) /
            parseFloat(this.currentSecondNum);
        }
      }
      this.equals();

      this.reset();
    },

    equals() {
      var display = document.getElementById("display_field");
      if (this.isCompleteEquation()) { //checks if the current equation is a complete one
        this.addEquation(
          this.currentFirstNum +
            " " +
            this.currentOperator +
            " " +
            this.currentSecondNum +
            " = " +
            this.prevAnswer)

            display.innerHTML = this.prevAnswer;

      } else if (this.isPartialEquation()) { //checks if the current not complete equation contains either a valid 
                                      //first number, or second number when the = is pressed 
        if (parseFloat(this.currentFirstNum)) this.prevAnswer = this.currentFirstNum;
        else if (parseFloat(this.currentSecondNum)) this.prevAnswer = this.currentSecondNum;

        this.addEquation(" = " + this.prevAnswer);
        display.innerHTML = this.prevAnswer;

      } else { //Handles output when the = is pressed and the equation is not accepted
        var msg = "";
        var placeholder = "";
        if (this.currentSecondNum === "0" && this.currentOperator == "/") {
          msg = "Could not divide by zero!";
          placeholder = "DIV/0!";
        } else {
          msg = "Could not compute!";
          placeholder = "NaN";
        }
        document.getElementById("error_display").innerHTML = msg;
        display.innerHTML = placeholder;
      }
    },

    isCompleteEquation() {
      return (parseFloat(this.currentFirstNum) || this.currentFirstNum == "0") &&
          (parseFloat(this.currentSecondNum) || (this.currentSecondNum == "0" && this.currentOperator != "/"))
    },

    isPartialEquation() {
      return (parseFloat(this.currentFirstNum) || parseFloat(this.currentSecondNum)) &&
        this.currentSecondNum != "0" && this.currentFirstNum != "0"
    },

    answer() {
      this.getInputNum(this.prevAnswer);
      this.updateDisplay();
    },

    clear() {
      this.reset();
      this.updateDisplay();
    },

    deleteNum() {
      if (this.currentOperator === "" && this.currentSecondNum == "") {
        //delete last symbol of currentFirstNum string
        this.currentFirstNum = this.currentFirstNum.substring(
          0,
          this.currentFirstNum.length - 1
        );
      } else if (this.currentOperator != "" && this.currentSecondNum === "") {
        this.currentOperator = "";
      } else {
        //delete last symbol of currentSecondNum string
        this.currentSecondNum = this.currentSecondNum.substring(
          0,
          this.currentSecondNum.length - 1
        );
      }
      this.updateDisplay();
    },
    updateDisplay() {
      document.getElementById("error_display").innerHTML = "";
      var display = document.getElementById("display_field");
      var string = "";
      if (this.currentFirstNum != "") {
        string += this.currentFirstNum;
      }
      if (this.currentOperator != "") {
        string += this.currentOperator;
      }
      if (this.currentSecondNum != "") {
        string += this.currentSecondNum;
      }
      display.innerHTML = string;
    },
    interpret(input) {
      if (input === "C") {
        this.clear();
      } else if (input === "ANS") {
        this.answer();
      } else if (input === "DEL") {
        this.deleteNum();
      } else if (input === "=") {
        this.compute();
      } else if (parseFloat(input) || input === "." || input === "0") {
        this.getInputNum(input);
      } else {
        this.getInputOperator(input);
      }
    },
  },
};
</script>

<template>
  <div id="calc_container">
    <div class="inner_element" id="header_container">
      <h1 id="headerCalc">CALCULATOR 3000</h1>
    </div>
    <div class="inner_element" id="display_field"></div>
    <div>
      <div id="input_fields">
        <button class="action_btn" v-for="(symbol, i) in symbols" :key="i"
         :id="`btn${symbol}`" @click="interpret(symbol)">
         {{ symbol }}
        </button>
      </div>
    </div>
    <div class="inner_element" id="scroll_box"></div>
    <div class="inner_element" id="error_display"></div>
  </div>
</template>

<style scoped>

#calc_container {
  display: grid;
  justify-content: center;
  font-weight: bold;
  background-color: #444444;
  border: 1px solid #3d85c6;
  border-radius: 3px;
  padding: 30px;
  width: 100%;
  min-height: 80%;
  height: 100%;
  box-shadow: 1px 1px 1px lightblue;
}

#display_field {
  height: 35px;
}

#scroll_box {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 60px;

  text-align: center;
  font-style: italic;
  font-weight: bold;
  list-style: none;
  display: flex;
  flex-direction: column;
}

#error_display {
  color: #b60000;
}

.inner_element {
  font-weight: bold;
  background-color: #fafafa;
  margin: 5px;
  border-radius: 3px;
  padding: 5px;
  height: auto;
  box-shadow: 1px 1px 1px lightblue;
}

.action_btn {
    margin: 1%;
    width: 23%;
    height: 17.5%;
    color: #004984;
    font-weight: bold;
    font-size: 15px;
    background-color: #f0f0f0;
    border-radius: 3px;
    box-shadow: 1px 2px 1px lightblue;
}

.action_btn:hover {
    color: #f0f0f0;
    background-color: #000000;
}

.action_btn:active {
    scale: 1.1;
    color: #ff0000;
    background-color: #000000;
}

#input_fields {
    display: grid-inline; 
    min-height: 45%;
    justify-content: center;

}
</style>
