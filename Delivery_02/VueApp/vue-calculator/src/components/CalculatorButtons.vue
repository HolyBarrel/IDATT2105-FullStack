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
      clickedSymbol: null
    };
  },
  methods: {
    getInput(input) {
        console.log("Clicked")
        this.$emit('buttonClick', input)
        
    }
    }


};
</script>

<template>
    <div>
      <div id="input_fields">
        <button class="action_btn" v-for="(symbol, i) in symbols" :key="i"
         :id="`btn_${i}`" @click="getInput(symbol)">
         {{ symbol }}
        </button>
      </div>
    </div>
</template>

<style>

.action_btn {
    margin: 1%;
    width: 23%;
    height: 17.5%;
    color: #3297e9;
    font-weight: bold;
    font-size: 15px;
    background-color: #000f20;
    border-radius: 3px;
    box-shadow: 1px 2px 1px lightblue;
}

.action_btn:hover {
    color: #000f20;
    background-color: #d6fcda;
}

#input_fields {
    display: grid-inline; 
    min-height: 45%;
    justify-content: center;

}


</style>


  
