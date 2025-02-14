  
  <script>
  import { supabase } from './supabase';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        const { user, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });
  
        if (error) {
          this.error = error.message;
        } el
         {
          this.error = null;
          // Handle successful login, e.g., redirect to another page
          console.log('User logged in:', user);
        }
      },
    },
  };
  </script>
<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>

  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: whitesmoke;
    border-radius: 6px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 20px;
    background-color: salmon;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  p {
    color: red;
  }
  </style>