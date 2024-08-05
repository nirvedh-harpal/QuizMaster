// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ topic }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!topic) return;

        const fetchQuestions = async () => {
            const apiKey = 'sk-proj-96GlVsyHycJQSFuUIfrfT3BlbkFJP4IjOESJeqAbKbHUEQtY';
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        prompt: `Generate a list of 5 questions and answers for the topic: ${topic}`,
                        max_tokens: 1500,
                        n: 1,
                        stop: null,
                        temperature: 0.7
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const apiQuestions = response.data.choices[0].text;
                
                const parsedQuestions = JSON.parse(apiQuestions.trim());

                const transformQuestions = (apiQuestions) => {
                    return apiQuestions.map(question => ({
                        Text: question.Text,
                        answerOptions: question.answerOptions.map(answer => ({ answerValue: answer.answerValue })),
                        CorrectAnswer: question.CorrectAnswer
                    }));
                };

                const transformedQuestions = transformQuestions(parsedQuestions);
                setQuestions(transformedQuestions);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [topic]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching questions: {error.message}</p>;

    return (
        <div>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{question.Text}</h3>
                    <ul>
                        {question.answerOptions.map((option, i) => (
                            <li key={i}>{option.answerValue}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Quiz;
