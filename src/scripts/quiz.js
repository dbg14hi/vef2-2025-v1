document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    // Find the "Senda" submit button by its ID
    const submitButton = document.getElementById('mybtn');

    if (!submitButton) {
        return;
    }


    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent page reload

        const questions = document.querySelectorAll('.question');

        questions.forEach((question, index) => {

            // Find the selected radio input
            const selected = question.querySelector(`input[name="question${index}"]:checked`);

            if (!selected) {
                console.warn(`⚠️ No answer selected for question ${index}`);
                return;
            }

            const feedback = document.createElement('p');
            feedback.classList.add('feedback');

            // Remove old feedback before adding a new one
            const existingFeedback = question.querySelector('.feedback');
            if (existingFeedback) existingFeedback.remove();

            // Check if the answer is correct
            // @ts-ignore
            const isCorrect = selected.value === '0'; // Assuming first answer is correct
            feedback.textContent = isCorrect ? '✅ Rétt svar!' : '❌ Rangt svar!';
            feedback.style.color = isCorrect ? 'green' : 'red';
            console.log(`✅ Question ${index} result:`, isCorrect ? '✅ Correct' : '❌ Incorrect');

            question.appendChild(feedback);
        });
    });
});
