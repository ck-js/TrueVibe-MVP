<script setup>
import { onMounted, ref } from 'vue';
import {supabase} from './components/supabase'

import Quiz from './components/Quiz.vue';
import AuthLogin from './components/Auth.vue'
import Account from './components/Account.vue'

const session = ref()
const showLogin = ref(false)

const toggleLogin = () => {
  showLogin.value = !showLogin.value
}

const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  session.value = data.session;
};
onMounted(() => {
  checkSession();

  supabase.auth.onAuthStateChange((_event, session) => {
    session.value = session;
  });
})
  </script>

<template>
  <header>
    <button @click="toggleLogin" class="login-button">Login</button>
  </header>

  <Quiz v-if="!showLogin" />
  <div v-if="showLogin" class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <AuthLogin v-else />
  </div>



</template>

<style scoped>
header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  
}

.login-button {
  padding: 10px 20px;
  background-color: salmon;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
