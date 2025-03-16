<template>
  <div class="confirmation">
    <h1>Thanks! Check your email</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useAuthUser from '@/composables/UseAuthUser';

const route = useRoute();
const { maybeHandleEmailConfirmation } = useAuthUser();

onMounted(async () => {
  await maybeHandleEmailConfirmation(route);
});
</script>

<style scoped>
.confirmation {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: whitesmoke;
  color: black;
  border-radius: 6px;
}
</style>