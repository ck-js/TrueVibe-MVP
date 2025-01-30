<script>
export default {
    data() {
        return {
            currentQuestionIndex: 0,
            questions: [
                { 
                    question: "Placeholder question 1?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 2?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 3?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 4?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 5?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 6?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 7?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 8?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 9?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
                { 
                    question: "Placeholder question 10?", 
                    choices: ["Option 1", "Option 2", "Option 3", "Option 4"] 
                },
            ],
            answers: Array(10).fill(''),
        };
    },
    methods: {
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                alert(this.answers[this.currentQuestionIndex]);
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
        }
    },
};
</script>
<template>
    <div class="quiz">
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
                <button @click="nextQuestion" :disabled="currentQuestionIndex === questions.length - 1">Next</button>
                
            </div>
        </div>
        <div v-else>
            <h2>Quiz Completed</h2>
            <p>Thank you for completing the quiz!</p>
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
    color: salmon;
    
}
button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
    color: darkgray;
}
</style>