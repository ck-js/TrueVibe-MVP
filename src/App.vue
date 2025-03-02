<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';


const router = useRouter();

const goToRegister = () => {
  router.push({
    name: "Register",
  });

};
  </script>

<template>
  <header>
    <nav>
    <AppHeader />
    
  </nav>
    
  </header>
<main>

  <RouterView />

</main>



  <!-- <Quiz v-if="!showLogin" /> -->
  <!-- <div v-if="showLogin" class="container" style="padding: 50px 0 100px 0"> -->
    <!-- <Account v-if="session" :session="session" />
    <AuthLogin v-else /> -->
  <!-- </div> -->



</template>

<style scoped>




</style>
