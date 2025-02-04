




<template>
  <div v-if="currentQuestionIndex < questions.length">
    <h2>{{ questions[currentQuestionIndex].question }}</h2>
    <ul>
      <li v-for="(choice, index) in questions[currentQuestionIndex].choices" :key="index">
        <input type="radio" :name="'question' + currentQuestionIndex" :value="choice" @change="selectAnswer(index)">
        {{ choice }}
      </li>
    </ul>
    <div class="navigation-buttons">
      <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">Back</button>
      <button @click="nextQuestion" :disabled="currentQuestionIndex >= questions.length - 1">Next</button>
    </div>
  </div>
  <div v-else>
    <h2>Quiz Completed</h2>
    <p>Thank you for completing the quiz!</p>
    <input type="email" v-model="email" placeholder="Enter your email" />
    <button @click="submitQuiz">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestionIndex: 0,
      questions: [
        { question: "Placeholder question 1?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 2?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 3?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 4?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 5?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 6?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 7?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 8?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 9?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        { question: "Placeholder question 10?", choices: ["Option 1", "Option 2", "Option 3", "Option 4"] },
      ],
      answers: Array(10).fill(''),
      email: '',
    };
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    selectAnswer(index) {
      this.answers[this.currentQuestionIndex] = this.questions[this.currentQuestionIndex].choices[index];
    },
    submitQuiz() {
      // Handle the quiz submission, e.g., send the answers and email to a server
      console.log('Quiz submitted with email:', this.email);
      
      console.log('Answers:', this.answers);
    }
  },
};
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  margin: 15px auto;
}

.navigation-buttons button {
  background-color: salmon;
  color: white;
  font-weight: bold;
}
</style>