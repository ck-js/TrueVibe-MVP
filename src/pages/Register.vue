<script setup>
import { ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { register } = useAuthUser();

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

// function to hand the form submit
const handleSubmit = async () => {
  try {
    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page the will instruct
    // the user to confirm they're email address
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <div class="container">
    <img src="../assets/truevibe-logo.jpg" alt="truevibe heart pink logo">
  <form @submit.prevent="handleSubmit">
    <h1 >Register</h1>
    <label for="name">Name <input id="name" v-model="form.name" type="text" /></label>
    <label for="email">Email <input id="email" v-model="form.email" type="email" /></label>
    <label for="password">Password <input id="password" v-model="form.password" type="password" /></label>
    <button>Register</button>
  </form>
  </div>
</template>
<style scoped src="../assets/form-styles.css"></style>
