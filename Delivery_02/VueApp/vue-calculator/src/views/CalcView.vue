<script setup>
import calculator from "../components/CalculatorVue.vue";
</script>

<template>
  <div class="about">
    <calculator></calculator>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
