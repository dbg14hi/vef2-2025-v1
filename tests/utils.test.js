import { describe, it, expect } from 'vitest';
import { writeHtml } from '../src/lib/utils.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const TEST_FILE = path.join(__dirname, 'test.html');

describe('writeHtml', () => {
  it('should write HTML content to a file', async () => {
    const content = '<h1>Test</h1>';
    await writeHtml(TEST_FILE, content);
    
    const fileContent = await fs.readFile(TEST_FILE, 'utf8');
    expect(fileContent).toBe(content);

    // Clean up after test
    await fs.unlink(TEST_FILE);
  });
});
