// now that our quiz component is successfully running with answer and email submissions to our postgresql database.
// now need to work on the login and user authetnitcation feature and functionality.
// set up user management postgresql database with vue.
// be wary of local vs online auth registration.
// possibly set up vue routers to navigate between auth and account components on successful auth.
// go through using supabase with vue router for authentication feature
// refactor to follow folder and design pattern of vue school guide
// note to self that our quiz submission needs to be updated since we're not using the supabase object by importing the supabase composable.

// now that we disabled row level security so that we're able to invoke our edge function which calculates quiz scores and updates the score column.
// work on self asesment structure and, logic and layout
// ok we now have new content with category and choice descriptions as part of the ui and quiz has been submitted to database
// now think about posting to quiz_auth_responses table that uses the users uid as the primary key in the auth_quiz_responses table
// check if the uid is the same in dashboard > authentication > users vs dashboard > table editor > profiles and wahts the benefit to split it?
// now for some reason our quiz is rendering the email submission page after the second question...




async function submitSelfAssessment(userId, answers) {
  const response = await fetch('https://rattfxpufuehmlmakbam.supabase.co/functions/v1/submit-self-assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      answers: answers,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit self-assessment answers');
  }

  return data;
}




<!-- filepath: /Users/ck/Desktop/Code/TrueVibe MVP/vue-project/src/pages/QuizAuth.vue -->
<script setup>
import { ref } from 'vue';
import useSupabase from '@/composables/UseSupabase';
import useAuthUser from '@/composables/UseAuthUser';

const { supabase } = useSupabase();
const { user } = useAuthUser();

const currentQuestionIndex = ref(0);
const questions = ref([
  { 
    category: "Relationship Clarity",
    question: "How clear is your vision for your life and the kind of relationship you want?",
    choicesDescription: "1 = Not at all clear, 5 = Very clear", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  // Add more questions here
]);
const answers = ref(Array(questions.value.length).fill(''));
const email = ref('');
const isSubmitted = ref(false);

const nextQuestion = () => {
  currentQuestionIndex.value++;
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const selectAnswer = (index) => {
  answers.value[currentQuestionIndex.value] = questions.value[currentQuestionIndex.value].choices[index];
};

const submitSelfAssessment = async () => {
  if (!user.value) {
    console.error('User is not authenticated');
    return;
  }

  const userId = user.value.id;

  const response = await fetch('https://rattfxpufuehmlmakbam.supabase.co/functions/v1/submit-self-assessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      answers: answers.value,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit self-assessment answers');
  }

  isSubmitted.value = true;
  return data;
};
</script>

<template>
  <div class="quiz">
    <div v-if="!isSubmitted">
      <div v-if="currentQuestionIndex < questions.length">
        <h3>{{ questions[currentQuestionIndex].category }}</h3>
        <h2>{{ questions[currentQuestionIndex].question }}</h2>
        <p>{{ questions[currentQuestionIndex].choicesDescription }}</p>
        <div class="choices">
          <button 
            v-for="(choice, index) in questions[currentQuestionIndex].choices" 
            :key="index" 
            @click="selectAnswer(index)"
            :class="{ selected: answers[currentQuestionIndex] === choice }"
          >
            {{ choice }}
          </button>
        </div>
        <div class="navigation-buttons">
          <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">Back</button>
          <button @click="nextQuestion" :disabled="answers[currentQuestionIndex] === ''">Next</button>
        </div>
      </div>
      <div v-else>
        <h2>Quiz Completed</h2>
        <img src="../assets/true vibe logo_transparent_small.png" alt="">
        <p>Thank you for completing the quiz!</p>
        <p>Check your email soon for a tailored report</p>
        <form @submit.prevent="submitSelfAssessment">
          <div class="navigation-buttons-2">
            <button type="submit">Submit</button> 
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <h2>Quiz Submitted</h2>
      <p>Thank you for completing the quiz!</p>
      <p>Check your email soon for a tailored report</p>
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
.choices {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  row-gap: 5px;
}
button {
  margin: 0 10px;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  background-color: rgba(211, 211, 211, 0.4);
  border-radius: 6px;
  font-weight: 800;
  color: inherit;
}
.choices button {
  border: 0.5px solid black;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin: 27px auto;
}
.navigation-buttons button {
  background-color: salmon;
  color: white;
}
.navigation-buttons-2 {
  display: flex;
  justify-content: center;
  margin: 27px auto;
}
.navigation-buttons-2 button {
  background-color: salmon;
  color: white;
}
.selected {
  color: white;
  background-color: salmon;
  border: 1px solid salmon;
}
button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
  color: darkgray;
}
form {
  margin-top: 20px;
}
input[type="email"] {
  width: 80%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
img {
  max-width: 50%;
  max-height: 50%;
}
</style>