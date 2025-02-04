<script>
import { supabase } from './supabase';

export default {
    data() {
        return {
            currentQuestionIndex: 0,
            questions: [
                { 
                    question: "I have a clear vision for my life and relationship. I can envision my perfect life in rich detail that feels strong, very real, and keeps me motivated.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I have a written list of at least ten non-negotiable requirements that I use for screening potential partners. I am clear that if any are missing, a relationship will not work for me.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I enjoy my life, my work, my family, my friends, and my own company. I am living the life that I want, and I am not seeking a relationship out of desperation and need.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I have no emotional or legal baggage from a previous relationship. My schedule, commitments and lifestyle allow my availability to build a new relationship.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "My work is fulfilling, supports my lifestyle, and does not interfere with my availability for a new relationship.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "My physical, mental, or emotional health does not interfere with having the life and relationship that I want. I am reasonably happy and feel good.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I have no financial or legal issues that would interfere with having the life and relationship that I want.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: " My relationships with my children, ex, siblings, parents, and extended family do not interfere with having the life and relationship that I want.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I initiate contact with people I want to meet, and disengage from people who are not a match for me. I keep my sexual and emotional boundaries, and balance my heart with my head with potential partners.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
                { 
                    question: "I understand relationships, can maintain closeness and intimacy, communicate authentically and assertively, negotiate difference positively, allow myself to trust and be vulnerable, and can give and receive love without emotional barriers.", 
                    choices: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] 
                },
            ],
            answers: Array(10).fill(''),
            email: '',
            isSubmitted: false,
        };
    },
    methods: {
        nextQuestion() {
            
                this.currentQuestionIndex++;

        },
        prevQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        selectAnswer(index) {
            this.answers[this.currentQuestionIndex] = this.questions[this.currentQuestionIndex].choices[index];
        },
        async submitQuiz() {
      const { data, error } = await supabase
        .from('quiz_responses')
        .insert([
          { email: this.email, answers: this.answers }
        ]);

      if (error) {
        console.error('Error submitting quiz:', error);
      } else {
        this.isSubmitted = true;
        console.log('Quiz submitted successfully:', data);
      }
    }
  },

};
</script>
<template>
    <div class="quiz">
        <div v-if="!isSubmitted">
        <div v-if="currentQuestionIndex < questions.length">
            <h2>{{ questions[currentQuestionIndex].question }}</h2>
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
                <!-- <button @click="nextQuestion" :disabled="currentQuestionIndex > questions.length - 1">Next</button> -->
                <!-- <button @click="nextQuestion" :disabled="answers[currentQuestionIndex] === ''">Next</button> -->
                <button @click="nextQuestion">Next</button>
                
            </div>
        </div>
        <div v-else>
            <h2>Quiz Completed</h2>
            <p>Thank you for completing the quiz!</p>
            <p>Check your email soon for a tailored report</p>
            <form @submit.prevent="submitQuiz">
                <input type="email" v-model="email" placeholder="Enter your email" required/>
                <div class="navigation-buttons">
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
    flex-direction: column;
    row-gap: 3px;
    margin: 15px auto;
    
}
.navigation-buttons button {
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
</style>