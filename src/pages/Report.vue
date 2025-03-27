

<script setup>
import { ref, onMounted } from 'vue';
import useSupabase from '@/composables/UseSupabase';

const { supabase } = useSupabase();

const user = ref(null);
const score = ref(null);
const datingIntentionScore = ref(null);
const errorMessage = ref('');

const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    errorMessage.value = 'Error fetching user';
    return;
  }
  user.value = data.user;
};

const fetchScore = async () => {
  if (!user.value) {
    errorMessage.value = 'User is not authenticated';
    console.error('User is not authenticated');
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('score')
    .eq('id', user.value.id)
    .single();

  if (error) {
    console.error('Error fetching score:', error.message);
    errorMessage.value = 'Error fetching score';
    return;
  }

  score.value = data.score;
  

};

onMounted(async () => {
  await fetchUser();
  await fetchScore();
});
</script>

<template>
  <div class="quiz">
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-else>
      <h2>Your Dating Readiness Score</h2>
      <p v-if="score !== null">{{ score }}</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  background-color: whitesmoke;
  color: black;
  border-radius: 6px;
}
h2 {
  font-weight: 900;
}
</style>