<script>
import LoginService from '@/services/LoginService.js'

  export default {
    data() {
      return {
        userName: localStorage.getItem('username') || "",
        inputPassword: localStorage.getItem('password') || "",
        status: '',
        isButtonDisabled: true,
        errorMsg: '',
        showPassword: false
      }
    },
    methods: {
      async submitForm () {

        var currentUser = 
            {
            userName: this.userName,
            userPassword: this.inputPassword
            }

        let result = await LoginService.checkUser(currentUser).then(console.log(currentUser))
        .catch(error => console.log("Error, could not authenticate: " + error))
        console.log(result)
  
        var found = result

        if(found) {
            this.$store.dispatch('logUserIn')
            this.$router.push('/')      

        }
        else {
            alert("Invalid username and/or password!")
        }

        this.resetFields()

      },
      async getStatus() {
        var message = ""
        try {
            let result = await LoginService.getStatus();
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
        if(this.userName === "" || this.inputPassword === "") {
            this.disableBtn()
            this.errorMsg = "An input is empty"
        } 
        else {
            this.enableBtn()
            this.errorMsg = ""
        }
        this.resetMessage()
      },

      disableBtn () {
        this.isButtonDisabled = true
      },
      enableBtn () {
        this.isButtonDisabled = false
      },
      resetFields() {
        this.userName = ""
        this.inputPassword = ""
      },
      toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
    },

    computed: {
        passwordFieldType() {
        return this.showPassword ? 'text' : 'password'
        },
     },

    mounted() {
        this.evalInput()
    },
    

    watch: {
      userName(username) {
        this.evalInput()
        localStorage.setItem('username', username);
      },
      inputPassword(password) {
        this.evalInput()
        localStorage.setItem('password', password);
      }
    
    }
  }
</script>

<template>
    <div class="contactForm">
        <h1>Login form</h1>
        <form @submit.prevent="submitForm">
            
            <label>Username:</label>
            <input class="formInput" type="text" id="usernameInput" name="username" v-model="userName" placeholder="username">

            <div class="password-input">
                <label>Password:</label>
                <input class="formInput" :type="passwordFieldType" id="passwordInput" name="password" v-model="inputPassword" placeholder="password">
                <button type="button" class="password-toggle" @click="toggleShowPassword">{{ showPassword ? 'Hide' : 'Show' }}</button>
            </div>

            <input type="submit" id="submitButton" value="Log in" :disabled="isButtonDisabled">
        </form>
        <p v-if="errorMsg != ''" id="excpMessage">{{ errorMsg }}</p>
        <p id="statusP" v-if="status != ''">{{ status }}</p>
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
   #usernameInput, #passwordInput {
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

   .password-input {
    position: relative;
    }

    .password-toggle {
    position: absolute;
    top: 88%;
    right: 10px;
    transform: translateY(-90%);
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    }

</style>
