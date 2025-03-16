<script setup>
import { ref } from "vue";
import useSupabase from '@/composables/UseSupabase';
import { useRouter } from "vue-router";

const router = useRouter();
const { supabase } = useSupabase();
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

const updatePassword = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }
  
  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }
  
  loading.value = true;
  errorMessage.value = "";
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: password.value
    });
    
    if (error) throw error;
    
    successMessage.value = "Password updated successfully!";
    setTimeout(() => {
      router.push({ name: "Login" });
    }, 2000);
  } catch (error) {
    errorMessage.value = error.message || "Error updating password";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="updatePassword">
    <h1>Update Password</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <div class="form-group">
      <label for="password">New Password</label>
      <input 
        id="password"
        v-model="password" 
        type="password" 
        required 
        placeholder="Enter new password"
      />
    </div>
    
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input 
        id="confirmPassword"
        v-model="confirmPassword" 
        type="password" 
        required 
        placeholder="Confirm new password"
      />
    </div>
    
    <button type="submit" :disabled="loading">
      {{ loading ? 'Updating...' : 'Update Password' }}
    </button>
  </form>
</template>

<style scoped src="../assets/form-styles.css"></style>

