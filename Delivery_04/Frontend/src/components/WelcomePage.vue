<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<script>
  export default {
      computed: {
        isLoggedIn() {
          return this.$store.state.authorized;
        }
    }
  }
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Welcome to the Calculator 3000 application!</h3>
    <div v-show="isLoggedIn">You are logged in, please give us feedback on the calculator!</div>
    <div v-show="!isLoggedIn">Please log in.</div>
    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3.2rem;
  top: -10px;
}

h3 {
  font-size: 1.8rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}


</style>
