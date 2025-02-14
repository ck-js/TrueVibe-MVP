<script setup>
import { ref } from 'vue'
import { supabase } from './supabase'
import truevibeLogo from '../assets/truevibe-logo.jpg'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div class="auth">
<img src="../assets/truevibe-logo.jpg" alt="TrueVibe Logo" />
  <form @submit.prevent="handleLogin">
    <div class="form-header">
      <h1 >Register & Sign In to Truevibe</h1>
      <p >Register & Sign in via magic link with your email below</p>
    </div>
      <div>
        <input required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    
  </form>
</div>
</template>

<style scoped>
.auth {

    
    max-width: 600px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: left;
    color: white;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

input[type="email"] {
    width: 80%;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: 3px;
}
input[type="submit"] {
    width: 80%;
    
    cursor: pointer;
    padding: 10px 20px;
    border: none;
    text-decoration: none;
    background-color: salmon;
border-radius: 6px;
font-weight: 800;
color: inherit;
}

.form-header {
    margin-top: 9px;
    margin-bottom: 9px;
}
</style>