<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


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

<footer>
  <AppFooter />
</footer>


</template>

<style scoped>



</style>
