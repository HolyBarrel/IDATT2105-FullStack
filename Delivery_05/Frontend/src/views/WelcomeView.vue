<template>
  <div class="welcomeView">
    <WelcomePage msg="Calculator 3000 Vue App"/>
    <img id="logoImg" alt="Vue logo" src="../assets/logo.svg">
  </div>
</template>

<script>
import WelcomePage from '@/components/WelcomePage.vue'

export default {
  name: 'WelcomeView',
  components: {
    WelcomePage
  }
}
</script>


<style>
  #logoImg {
    height: 30%;
    width: 30%;
  }
  .welcomeView {
    width: 50%;
    min-height: 80vh;
    display: flex;
    align-items: center;
  }
</style>
