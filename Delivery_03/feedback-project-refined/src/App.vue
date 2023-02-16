<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/contact">Contact</router-link> |
    <router-link to="/calculator">Go to Calculator</router-link>
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
