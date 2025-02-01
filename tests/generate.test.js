import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { processFile } from '../src/generate.js'; // Import function from generate.js

vi.mock('node:fs/promises'); // Mock file system operations

const MOCK_JSON_FILE = {
  title: 'Test Quiz',
  file: 'test.json',
  questions: [
    { question: 'What is 2+2?', answers: [{ answer: '4', correct: true }] },
  ],
};

describe('processFile', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset mocks before each test
  });

  it('should return null for invalid or missing data', async () => {
    fs.readFile.mockRejectedValue(new Error('File not found'));
    const result = await processFile({ title: 'Invalid Quiz', file: 'invalid.json' });
    expect(result).toBeNull();
  });

  it('should correctly process a valid quiz JSON file', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(MOCK_JSON_FILE));
    fs.writeFile.mockResolvedValue(); // Mock successful file write

    const result = await processFile(MOCK_JSON_FILE);

    expect(result).toEqual({ title: 'Test Quiz', file: 'test.html' });
    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join('./dist', 'test.html'),
      expect.stringContaining('<title>Test Quiz</title>'),
      'utf8'
    );
  });
});
