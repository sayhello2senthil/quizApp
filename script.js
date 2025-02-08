const quizData = [
    {
        question: "What type of ML problem is predicting office heating costs based on size and employees?",
        options: ["Classification", "Regression", "Clustering"],
        correct: 1,
        explanation: "Regression is used for predicting continuous numerical values like costs, while classification is for categorical predictions and clustering is for grouping similar data points."
    },
    {
        question: "Which metric is used to evaluate classification models?",
        options: ["Mean Squared Error (MSE)", "Precision", "Silhouette"],
        correct: 1,
        explanation: "Precision is a classification metric that measures the accuracy of positive predictions, while MSE is for regression and Silhouette is for clustering."
    },
    {
        question: "What is the primary purpose of regression models?",
        options: ["Categorizing data", "Predicting numeric values", "Grouping similar items"],
        correct: 1
    },
    {
        question: "What does MSE typically measure?",
        options: ["Classification accuracy", "Regression error", "Clustering quality"],
        correct: 1
    },
    {
        question: "Which of these is a classification metric?",
        options: ["Mean Absolute Error", "R-squared", "Precision"],
        correct: 2
    }
];

function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    
    // Add score display div
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score-display';
    scoreDiv.className = 'score-display';
    quizContainer.appendChild(scoreDiv);

    quizData.forEach((questionData, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${questionData.question}</p>
            ${questionData.options.map((option, optionIndex) => `
                <div class="option" data-question="${index}" data-option="${optionIndex}">
                    <span class="option-label">${String.fromCharCode(97 + optionIndex)})</span>
                    ${option}
                </div>
            `).join('')}
            <div class="explanation" id="explanation-${index}"></div>
        `;
        
        quizContainer.appendChild(questionDiv);
    });

    // Add click event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });
}

function selectOption(e) {
    const questionIndex = e.target.dataset.question;
    // Remove selected class from other options in the same question
    document.querySelectorAll(`.option[data-question="${questionIndex}"]`)
        .forEach(opt => opt.classList.remove('selected'));
    // Add selected class to clicked option
    e.target.classList.add('selected');
}

function showResults() {
    const options = document.querySelectorAll('.option');
    let correctAnswers = 0;
    
    options.forEach(option => {
        const questionIndex = parseInt(option.dataset.question);
        const optionIndex = parseInt(option.dataset.option);
        const explanationDiv = document.getElementById(`explanation-${questionIndex}`);
        
        if (optionIndex === quizData[questionIndex].correct) {
            option.classList.add('correct');
            if (option.classList.contains('selected')) {
                correctAnswers++;
            }
        } else if (option.classList.contains('selected')) {
            option.classList.add('incorrect');
        }
        
        // Show explanation only when an option in this question was selected
        const questionOptions = document.querySelectorAll(`.option[data-question="${questionIndex}"]`);
        const wasAnswered = Array.from(questionOptions).some(opt => opt.classList.contains('selected'));
        
        if (wasAnswered) {
            explanationDiv.style.display = 'block';
            explanationDiv.innerHTML = `<strong>${optionIndex === quizData[questionIndex].correct ? 'Correct' : 'Incorrect'}:</strong> ${quizData[questionIndex].explanation}`;
            explanationDiv.className = `explanation ${optionIndex === quizData[questionIndex].correct ? 'correct' : 'incorrect'}`;
        }
        
        // Disable further selections
        option.style.pointerEvents = 'none';
    });

    // Show score
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.style.display = 'block';
    scoreDisplay.innerHTML = `Your Score: ${correctAnswers} out of ${quizData.length} correct`;
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', buildQuiz);

// Add submit button event listener
document.getElementById('submit').addEventListener('click', showResults); 