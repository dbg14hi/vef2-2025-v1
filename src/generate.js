import fs from 'node:fs/promises';
import path from 'node:path';
import { quizTemplate, generateIndexHtml } from './lib/html.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';
const INDEX_JSON_PATH = path.join(INPUT_DIR, 'index.json'); // Read from input directory

/**
 * Reads a JSON file and returns the parsed data or null if an error occurs.
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<Object|null>} - The parsed data or null if an error occurs.
 */
async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Writes HTML content to a specified file.
 * @param {string} filePath - The path to the file to write.
 * @param {string} content - The HTML content to write.
 * @returns {Promise<void>}
 */
async function writeHtml(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error.message);
  }
}

async function processFile(entry) {
  const { title, file } = entry;
  const inputFilePath = path.join(INPUT_DIR, file);

  // Read the JSON data
  const jsonData = await readJson(inputFilePath);

  // If the file is invalid or missing questions, log and skip it
  if (!jsonData || !Array.isArray(jsonData.questions)) {  
    console.error(`Invalid or missing data in ${inputFilePath}. Skipping.`);
    return null; // Skip invalid files
  }

  // Generate the HTML content using the template function
  const htmlContent = quizTemplate(jsonData);

  // Determine the output file name for the HTML file
  const outputFileName = file.replace('.json', '.html');
  const outputFilePath = path.join(OUTPUT_DIR, outputFileName);

  // Write the generated HTML to the output file
  await writeHtml(outputFilePath, htmlContent);

  return { title, file: outputFileName }; // Return the title and HTML filename for index.json update
}

/**
 * Main function to run the program:
 * 1. Reads and filters index.json.
 * 2. Processes each valid JSON file.
 * 3. Updates index.json with valid entries.
 * 4. Generates index.html.
 */
async function main() {
  // Ensure the output directory exists
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error(`Error creating output directory ${OUTPUT_DIR}:`, error.message);
    return;
  }

  // Read and validate index.json
  const indexJson = await readJson(INDEX_JSON_PATH);
  if (!Array.isArray(indexJson)) {
    console.error('Invalid index.json format. Expected an array.');
    return;
  }

  // Filter out invalid entries (must have both title and file)
  const validEntries = indexJson.filter(
    (entry) => typeof entry.title === 'string' && typeof entry.file === 'string'
  );

  // ✅ NEW: Process all files in parallel (faster)
  const processedEntries = await Promise.all(validEntries.map(processFile));
  const updatedEntries = processedEntries.filter((entry) => entry !== null);


  await generateIndexHtml(updatedEntries);
}

const STYLES_SRC = './src/styles.css';  
const INDEX_CSS_SRC = './src/index.css';  
const STYLES_DEST = path.join(OUTPUT_DIR, 'styles/styles.css');  
const INDEX_CSS_DEST = path.join(OUTPUT_DIR, 'styles/index.css');  

async function copyStyles() {
    try {
        await fs.mkdir(path.dirname(STYLES_DEST), { recursive: true }); 

        await fs.copyFile(STYLES_SRC, STYLES_DEST);  // ✅ Copy styles.css
        console.log('✅ Copied styles.css to dist/styles/');

        await fs.copyFile(INDEX_CSS_SRC, INDEX_CSS_DEST);  // ✅ Copy index.css
        console.log('✅ Copied index.css to dist/styles/');
        
    } catch (error) {
        console.error('❌ Error copying CSS files:', error);
    }
}

const SCRIPTS_SRC = './src/scripts/quiz.js';  
const SCRIPTS_DEST = path.join(OUTPUT_DIR, 'scripts/quiz.js');  

async function copyScripts() {
    try {
        await fs.mkdir(path.dirname(SCRIPTS_DEST), { recursive: true });  
        await fs.copyFile(SCRIPTS_SRC, SCRIPTS_DEST);  
        console.log('✅ Copied quiz.js to dist/scripts/');
    } catch (error) {
        console.error('❌ Error copying quiz.js:', error);
    }
}

// Call functions to copy css and js
copyScripts();
copyStyles();

main();
