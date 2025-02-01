import { describe, it, expect } from 'vitest';
import { quizTemplate } from '../src/lib/html.js';

describe('quizTemplate', () => {
  it('should generate HTML with the correct title', () => {
    const testData = {
      title: 'Test Quiz',
      questions: [],
    };
    const result = quizTemplate(testData);
    expect(result).toContain('<title>Test Quiz</title>');
  });

  it('should include all questions in the output', () => {
    const testData = {
      title: 'Test Quiz',
      questions: [
        { question: 'What is 2+2?', answers: [{ answer: '4', correct: true }] },
        { question: 'What is the capital of France?', answers: [{ answer: 'Paris', correct: true }] },
      ],
    };
    const result = quizTemplate(testData);
    expect(result).toContain('What is 2+2?');
    expect(result).toContain('What is the capital of France?');
  });
});
