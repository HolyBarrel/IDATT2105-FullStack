<script>
import CollectionService from '@/services/CollectionService'

  export default {
    data() {
      return {
        inputName: localStorage.getItem('name') || "",
        inputEmail: localStorage.getItem('email') || "",
        inputMessage: localStorage.getItem('message') || "",
        status: null,
        isButtonDisabled: true,
        errorMsg: ""
      }
    },
    methods: {
      submitForm () {

        this.$store.dispatch(
          'createMessage',        
          {
            name: this.inputName,
            email: this.inputEmail,
            message: this.inputMessage
          }
        )
        
        this.status = this.getStatus()
        this.resetFields()

      },
      async getStatus() {
        var message = ""
        try {
            let result = await CollectionService.getStatus();
            console.log(result.data.response)
            message = result.data.response
            this.status = message
            this.disableBtn()
        } catch (error) {
            console.error(error);
        }
      },

      resetMessage() {
        this.status = null;
      },

      evalInput() {  
        this.resetMessage()

        if(this.inputName === "" || this.inputEmail === "" || this.inputMessage === "") {
            this.disableBtn();
            this.errorMsg = "An input is empty"
        } 
        else if (!this.inputEmail.match(/^\S+@\S+\.\S+$/)) {
            this.disableBtn();
            this.errorMsg = "Incorrect e-mail format! Include all components: 'username@domainname.extension'"
        }
        else {
            this.handleName()
        }
      },

      handleName() {
        let isName = true;
            let nameStrings = this.inputName.split(" ", this.inputName.length)
            for(let i = 0; i < nameStrings.length; i++) {
                if(nameStrings[i][0] != " ") {
                    if(nameStrings[i][0] !== nameStrings[i][0].toUpperCase()){
                    isName = false;
                    break;
                    } 
                }
            }
            if(isName) {
                this.enableBtn();
                this.errorMsg = "";
            }
            else {
                this.disableBtn();
                this.errorMsg = "Each name component should start with a capitalized letter!"
            } 
      },

      disableBtn () {
        this.isButtonDisabled = true
      },
      enableBtn () {
        this.isButtonDisabled = false
      },
      resetFields() {
        this.inputName = ""
        this.inputEmail = ""
        this.inputMessage = ""
      }
    },

    mounted() {
        this.evalInput()
        if(this.inputName === "" || this.inputEmail === "" || this.inputMessage === "") {
            this.disableBtn()
        } 
    },
    

    watch: {
      inputName(name) {
        this.evalInput()
        localStorage.setItem('name', name);
      },
      inputEmail(email) {
        this.evalInput()
        localStorage.setItem('email', email);
      },
      inputMessage(message) {
        this.evalInput()
        localStorage.setItem('message', message);
      },
    
    }
  }
</script>

<template>
    <div class="contactForm">
        <h1>Contact form</h1>
        <h3>Please contact us:</h3>
        <form @submit.prevent="submitForm">
            
            <label>Name:</label>
            <input class="formInput" type="text" id="nameInput" name="name" v-model="inputName" placeholder="Your name...">
            <label>Email:</label>
            <input class="formInput" type="email" id="emailInput" name="email" v-model="inputEmail" placeholder="Your email...">
            <label>Message:</label>
            <textarea class="formInput" name="message" id="messageInput" v-model="inputMessage" placeholder="Your message..."></textarea>
            <input type="submit" id="submitButton" value="Send" :disabled="isButtonDisabled">
        </form>
        <p v-if="errorMsg != ''" id="excpMessage">{{ errorMsg }}</p>
        <p id="statusP" v-if="status">{{ status }}</p>
    </div>
</template>

<style scoped>
   .contactForm {
    height: auto;
    width: 100%;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    margin: auto;
    border-radius: 4px;
   }

   .contactForm label {
      display: block;
      margin: 20px;
      font-size: 18px;
      font-weight: bold;
   }

   h1,
   h3,
   .formInput {
      font-size: 18px;
      font-weight: bold;
   }

   h1 {
    font-size: 30px;
   }

   #submitButton:active:enabled {
      scale: 110%;
   }
   #nameInput, #emailInput, #messageInput {
      width: 100%;
      padding: 8px 8px;
      box-sizing: border-box;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }
   #submitButton {
      background-color: #a4e2a6;
      color: black;
      padding: 8px 12px;
      margin-top: 5px;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }
   #submitButton:hover:enabled {
      background-color: #43fb4d;
      font-weight: bold;
   }
   #submitButton:disabled {
    background-color: #8b00005a;
      font-weight: normal;
   }

   #excpMessage {
    color: red;
   }
</style>
