const axios = require('axios');

async function fetchQuestions(topic) {
    const apiKey = 'AIzaSyA2QcTj7yUMlqTan3D0SEInqlUkLgwjZzc';
    const response = await axios.post(
        'https://api.gemini.com/v1/questions',  // Replace with the actual Gemini API endpoint
        {
            topic: topic
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
}

function transformQuestions(apiQuestions) {
    return apiQuestions.map(question => ({
        Text: question.text,
        answerOptions: question.answers.map(answer => ({ answerValue: answer.text })),
        CorrectAnswer: question.correctAnswer
    }));
}

async function getQuestionSet(topic) {
    try {
        const apiQuestions = await fetchQuestions(topic);
        const questionSet = transformQuestions(apiQuestions);
        console.log(questionSet);
        return questionSet;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
