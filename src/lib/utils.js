import fs from 'node:fs/promises';

/**
 * Writes HTML content to a specified file.
 * @param {string} filePath The file path to save the HTML content to.
 * @param {string} content The HTML content to write to the file.
 * @returns {Promise<void>}
 */
export async function writeHtml(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`HTML content written to ${filePath}`);
  } catch (error) {
    console.error('Error writing HTML file:', error);
  }
}
