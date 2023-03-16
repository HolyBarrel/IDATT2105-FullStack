<script setup>
  window.addEventListener('load', localStorage.clear())
</script>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex'
  export default {
    methods: {
        ...mapActions(['logUserOut']),
    },
    computed: {
        ...mapState({loggedIn: state => state.authorized}),
        ...mapState({loggedInId: state => state.authorizedId})
}
  }
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |

    <router-link to="/contact">Contact</router-link> |
    <router-link to="/calculator">Go to Calculator</router-link>
    <div id="calcWrapper" style="all: unset;" v-if="!loggedIn">
      | <router-link to="/login">Login</router-link>
    </div>
    <div id="calcWrapper" style="all: unset;" v-if="loggedIn">
      |  <router-link to="/" @click="this.logUserOut()">Log Out</router-link>
          <p>ID: {{ loggedInId }}</p>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  padding: 30px;
  width: auto;
  height: 12%;
  font-size: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #2660a7;
}
</style>
