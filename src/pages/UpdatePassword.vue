<script setup>
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";

// use necessary composables
const { update } = useAuthUser();

// keep up with email
const newPassword = ref("");
const message = ref("");

// function to call on submit of the form
// trigger updating the user's password
const handleUpdatePassword = async () => {
  try {
    await update({ password: newPassword.value });
    message.value = 'Password updated successfully!';
  } catch (error) {
    message.value = `Error: ${error.message}`;
  }
};


</script>
<template>
  <form @submit.prevent="handlePasswordReset()">
    <p>{{ message }}</p>
    <h1>Update Password?</h1>
    <label>New Password <input v-model="password" type="password" /></label>
    <button>Reset Password</button>
  </form>
</template>
<style scoped src="../assets/form-styles.css"></style>