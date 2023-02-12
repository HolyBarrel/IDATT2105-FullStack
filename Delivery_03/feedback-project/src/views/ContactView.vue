<script>
import CollectionService from '@/services/CollectionService'

  export default {
    data() {
      return {
        isMounted: false,
        inputName: "",
        inputEmail: "",
        inputMessage: "",
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
        
        this.errorMsg = this.getStatus()
        this.resetFields()

      },
      async getStatus() {
        var message = ""
      try {
        let result = await CollectionService.getStatus();
        console.log(result.data.response)
        message = "{" + result.data.response
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
        var nameInput = document.getElementById("nameInput")
        var emailInput = document.getElementById("emailInput")
        var messageInput = document.getElementById("messageInput")
        if (nameInput && emailInput && messageInput) {
          nameInput = nameInput.value
          emailInput = emailInput.value
          messageInput = messageInput.value
        }
        else {
          nameInput = ""
          emailInput = ""
          messageInput = ""
        }

      if(nameInput === "" || emailInput === "" || messageInput === "") {
        this.disableBtn();
        this.errorMsg = "An input is empty"
      } 
      else if (!emailInput.match(/^\S+@\S+\.\S+$/)) {
        this.disableBtn();
        this.errorMsg = "Incorrect e-mail format! Include all components: 'username@domainname.extension'"
      }
      else {
        let isName = true;
        let nameStrings = nameInput.split(" ", nameInput.length)
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
      this.disableBtn()
    },
    watch: {
      inputName() {
        this.evalInput()
      },
      inputEmail() {
        this.evalInput()
      },
      inputMessage() {
        this.evalInput()
      },
    
    },
    mounted() {
      this.isMounted = true;
    }

  }
</script>

<template>
  <div class="about">
    <h1>Contact form</h1>
    
<div class="contactForm">
   <h3>Please contact us:</h3>
   <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input class="usrInput" type="text" id="nameInput" name="name" v-if="isMounted" v-model="inputName" placeholder="Your name...">
      <label>Email:</label>
      <input class="usrInput" type="email" id="emailInput" name="email" v-if="isMounted" v-model="inputEmail" placeholder="Your email...">
      <label>Message:</label>
      <textarea class="usrInput" name="message" id="messageInput" v-if="isMounted" v-model="inputMessage" placeholder="Your message..."></textarea>
      <input type="submit" id="submitButton" value="Send" :disabled="isButtonDisabled">
   </form>
   <p v-if="errorMsg != ''" id="excpMessage">{{ errorMsg }}}</p>
   <p   id="statusP" v-if="status">{{ status }}}</p>
  </div>
</div>
</template>

<style scoped>
    .about {
      display: block;
      margin: 10px;
    }
   .contactForm {
      width: 500px;
      padding: 10px;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      margin: auto;
      border-radius: 4px;
   }

   .contactForm label {
      display: block;
      margin: 20px;
   }

   .contactForm input[type="submit"]:active:enabled {
      scale: 110%;
   }
   .contactForm input[type="text"],
   .contactForm input[type="email"],
   .contactForm textarea {
      width: 100%;
      padding: 8px 8px;
      box-sizing: border-box;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }

   .contactForm input[type="submit"] {
      background-color: #a4e2a6;
      color: black;
      padding: 8px 12px;
      margin-top: 5px;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }

   .contactForm input[type="submit"]:hover:enabled {
      background-color: #43fb4d;
      font-weight: bold;
   }

   .contactForm input[type="submit"]:disabled {
    background-color: #8b00005a;
      font-weight: normal;
   }

   #excpMessage {
    color: red;
   }
</style>
