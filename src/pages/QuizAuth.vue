
<script setup>
import { ref } from 'vue';
import useAuthUser from '@/composables/UseAuthUser';
import useSupabase from '@/composables/UseSupabase';

const { user } = useAuthUser();
const { supabase } = useSupabase();

const currentQuestionIndex = ref(0);
const questions = ref([
  { 
    category: "Relationship Clarity",
    question: "How clear is your vision for your life and the kind of relationship you want?",
    choicesDescription: "1 = Not at all clear, 5 = Very clear", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Relationship Clarity",
    question: "How confident are you in knowing and sticking to your non-negotiable requirements for a partner?",
    choicesDescription: "1 = Not at all confident, 5 = Very confident", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Personal Stability",
    question: "How satisfied are you with your life as it is, without needing a relationship to feel complete?",
    choicesDescription: "1 = Not at all satisfied, 5 = Very satisfied", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Personal Stability",
    question: "How free are you from past relationship baggage and available to start a new one?",
    choicesDescription: "1 = Not at all free, 5 = Very free", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Personal Stability",
    question: "How well does your work support your life and leave room for a new relationship?",
    choicesDescription: "1 = Not at all well, 5 = Very well", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Personal Stability",
    question: "How much do you feel your health supports the life and relationship you want?",
    choicesDescription: "1 = Not at all, 5 = Very much", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Personal Stability",
    question: "How free are you from financial or legal issues that could affect a relationship?",
    choicesDescription: "1 = Not at all free, 5 = Very free", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Social Support",
    question: "How much do your family relationships support, rather than hinder, a new romantic relationship?",
    choicesDescription: "1 = Not at all, 5 = Very much", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How comfortable are you setting boundaries and choosing who to connect with in dating?",
    choicesDescription: "1 = Not at all comfortable, 5 = Very comfortable", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How confident are you in your ability to build and maintain a healthy, intimate relationship?",
    choicesDescription: "1 = Not at all confident, 5 = Very confident", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How comfortable are you with a partner giving you constructive criticism or expressing disagreement?",
    choicesDescription: "1 = Not at all comfortable, 5 = Very comfortable", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How important is it to you that disagreements with a partner stay calm and never involve physical tension?",
    choicesDescription: "1 = Not at all important, 5 = Very important", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How easy is it for you to communicate your comfort level with physical or sexual closeness in a relationship?",
    choicesDescription: "1 = Not at all easy, 5 = Very easy", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How much do you rely on a partner to feel valued or supported, versus finding that within yourself?",
    choicesDescription: "1 = Rely completely on partner, 5 = Rely completely on myself", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Emotional Regulation",
    question: "How confident are you in managing your own needs (like finances or self-care) if a partner isn’t around to help?",
    choicesDescription: "1 = Not at all confident, 5 = Very confident", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Attachment Security",
    question: "How confident are you that a relationship can stay strong and committed over many years?",
    choicesDescription: "1 = Not at all confident, 5 = Very confident", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Attachment Security",
    question: "How comfortable are you staying calm when a partner raises their voice or shows strong emotion during a disagreement?",
    choicesDescription: "1 = Not at all comfortable, 5 = Very comfortable", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Attachment Security",
    question: "How much does it bother you if a partner’s behavior feels unpredictable or inconsistent?",
    choicesDescription: "1 = Not at all, 5 = Very much", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Attachment Security",
    question: "How comfortable are you supporting a partner through emotional ups and downs without losing your own balance?",
    choicesDescription: "1 = Not at all comfortable, 5 = Very comfortable", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Attachment Security",
    question: "How do you feel about relying on a partner who might not always be available when you need them?",
    choicesDescription: "1 = Very uncomfortable, 5 = Very comfortable", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Relationship Intentions",
    question: "How much do you value building a deep, lasting connection with a partner compared to enjoying the moment and seeing where things go?",
    choicesDescription: "1 = I’m all about the moment, 5 = I prioritize a lasting connection", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Relationship Intentions",
    question: "How important is it to you to share future plans—like goals or milestones—with a partner early on in dating?",
    choicesDescription: "1 = Not important at all, 5 = Very important", 
    choices: ["1", "2", "3", "4", "5"] 
  },
  { 
    category: "Relationship Intentions",
    question: "How comfortable are you with a relationship staying casual versus one that grows into something exclusive and serious over time?",
    choicesDescription: "1 = I prefer casual, 5 = I prefer serious and exclusive", 
    choices: ["1", "2", "3", "4", "5"] 
  }
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

const submitQuiz = async () => {
      try {
        const { data, error } = await supabase.rpc('submit_quiz', {
          quiz_data: answers.value, // Pass the quiz array as JSON
        });

        if (error) {
          console.error('Error submitting quiz:', error.message);
          return;
        }

        console.log('Quiz submitted successfully:', data);
        isSubmitted.value = true;
      } catch (err) {
        console.error('Unexpected error:', err);
      }
}



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
        <form @submit.prevent="submitQuiz">
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








