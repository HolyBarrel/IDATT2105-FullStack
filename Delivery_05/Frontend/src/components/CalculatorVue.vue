<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->

<script>

import CalculatorService from '@/services/CalculatorService.js'
import { mapState } from 'vuex';
     
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
        "±",
        "0",
        ".",
        "=",
      ],
      currentFirstNum: localStorage.getItem('currentFirstNum') || "",
      currentOperator: localStorage.getItem('currentOperator') || "",
      currentSecondNum: localStorage.getItem('currentSecondNum') || "",
      prevAnswer: localStorage.getItem('prevAnswer') || "",
      scrollText: localStorage.getItem('scrollText') || ""
    };
  },
  methods: {
    addEquation(equation) {
      this.appendTextToStorage(equation)
      var list = document.getElementById("scroll_box");
      list.innerHTML = localStorage.getItem('scrollText');

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

    async getData() {
        try {
            let response = await CalculatorService.getData();
            this.prevAnswer = response
        } catch (error) {
            console.error(error);
        }
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

      if (this.isCompleteEquation()) { 
        //checks if the current equation is a complete one
        this.$store.dispatch('createEquation', 
          {
            firstNumber: this.currentFirstNum,
            operator: this.currentOperator,
            secondNumber: this.currentSecondNum,
            result: null, 
            userId: this.authorizedId
          })
        //this.getData()
        this.update()
      } else {
        this.equals()
        this.updateDisplay()
      }
  
      this.reset();
    },

    equals() {
      var display = document.getElementById("display_field");
      if (this.isPartialEquation()) { //checks if the current not complete equation contains either a valid 
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

    update() {   
      if(!parseFloat(this.prevAnswer)) {
        this.addEquation("Not complete")
      } else {
      this.addEquation(
          this.currentFirstNum +
            " " +
            this.currentOperator +
            " " +
            this.currentSecondNum +
            " = " +
            this.prevAnswer)
            var display = document.getElementById("display_field");
            display.innerHTML = this.prevAnswer;
      }
     

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
      var errorDiv = document.getElementById("error_display")
      if(errorDiv) {
        errorDiv.innerHTML = "";
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
        var list = document.getElementById("scroll_box");
        list.innerHTML = localStorage.getItem('scrollText');

      }
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
      } else if(input === "±") {
        if(this.isCompleteEquation()) {
          this.currentSecondNum *= -1;

        } else if (this.isPartialEquation) {
          this.currentFirstNum *= -1;
        }
          this.updateDisplay()

      } else if (parseFloat(input) || input === "." || input === "0") {
        this.getInputNum(input);
      } else {
        this.getInputOperator(input);
      }
    },

    isCompleteEquation() {
      if(this.currentFirstNum == "" || this.currentSecondNum == "") return false;
      return (parseFloat(this.currentFirstNum) || this.currentFirstNum == "0") &&
          (parseFloat(this.currentSecondNum) || (this.currentSecondNum == "0" && this.currentOperator != "/"))
    },
    isPartialEquation() {
      return (parseFloat(this.currentFirstNum) || parseFloat(this.currentSecondNum)) &&
        this.currentSecondNum != "0" && this.currentFirstNum != "0"
    },

    appendTextToStorage(equation) {
      var prevData = localStorage.getItem('scrollText')
      if(!prevData) {
         localStorage.setItem('scrollText', equation);
      } 
      else {
        localStorage.setItem('scrollText', prevData + "<br>" + equation);
      }
    }

  },
  watch: {
      currentFirstNum(fn) {
        localStorage.setItem('currentFirstNum', fn);
      },
      currentOperator(opr) {
        localStorage.setItem('currentOperator', opr);
      },
      currentSecondNum(sn) {
        localStorage.setItem('currentSecondNum', sn);
      },
      prevAnswer(prevAns) {
        localStorage.setItem('prevAnswer', prevAns);
      },
      scrollBox(content) {
        localStorage.setItem('scrollbox', content);
      },

    },
    mounted() {
      this.updateDisplay();
    },

    computed: {
      isLoggedIn() {
        return this.$store.state.authorized;
      },
      ...mapState({authorizedId: state => state.authorizedId})
    }
  
};
</script>

<template>
  <div v-if="isLoggedIn" id="calc_container">
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
  <div v-if="!isLoggedIn"><p>Please log in.</p></div>
</template>

<style scoped>

#calc_container {
  display: grid;
  justify-content: center;
  font-weight: bold;
  background-color: #2a2a2a;
  border: 1px solid #0072ff;
  border-radius: 3px;
  padding: 30px;
  width: 100%;
  min-height: 80%;
  height: 100%;
  box-shadow: 1px 1px 1px rgba(0, 114, 255, 0.5);
}

#display_field {
  height: 50px;
  line-height: 50px;
  text-align: center;
}

#scroll_box {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80px;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  list-style: none;
  display: flex;
  flex-direction: column;
}

#error_display {
  color: #ff4d4d;
}

.inner_element {
  font-weight: bold;
  background-color: #FFFFFF;
  margin: 5px;
  border-radius: 3px;
  padding: 5px;
  height: auto;
  box-shadow: 1px 1px 1px rgba(0, 114, 255, 0.5);
}

.action_btn {
    margin: 1%;
    width: 23%;
    min-width: 50px;
    height: 17.5%;
    color: #004984;
    font-weight: bold;
    font-size: 15px;
    background-color: #f4fdff;
    border-radius: 3px;
    box-shadow: 1px 2px 1px rgba(0, 114, 255, 0.5);
}

.action_btn:hover {
    color: #00c8ff;
    background-color: #333333;
}

.action_btn:active {
    transform: scale(1.1);
    color: #ff4d4d;
    background-color: #333333;
}

#input_fields {
    display: grid-inline; 
    min-height: 45%;
    justify-content: center;

}

</style>
