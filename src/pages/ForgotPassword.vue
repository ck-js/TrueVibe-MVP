<script setup>
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";
import { useRouter } from "vue-router";

// use necessary composables
const router = useRouter();
const { sendPasswordResetEmail } = useAuthUser();

// keep up with email
const email = ref("");

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  await sendPasswordResetEmail(email.value);
  alert(`Password reset email sent to: ${email.value}`);
  // go to /email-confirmation route
  router.push({ name: "EmailConfirmation" });


  
};

</script>
<template>
  <form @submit.prevent="handlePasswordReset()">
    <h1>Forgot Password?</h1>
    <label>Email <input v-model="email" type="email" /></label>
    <button>Send Reset Email</button>
  </form>
</template>
<style scoped src="../assets/form-styles.css"></style>