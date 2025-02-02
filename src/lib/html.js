import path from 'node:path';
import { writeHtml } from './utils.js';  

const OUTPUT_DIR = path.resolve('./dist');  // Ensure the output directory is correct

/**
 * Generates the index.html file with links to the provided HTML files.
 * @param {Object[]} entries - An array of objects containing title and file name.
 * @returns {Promise<void>}
 */
export async function generateIndexHtml(entries) {
  const links = entries
    .map(({ title, file }) => `<li><a href="${file}">${title}</a></li>`)
    .join('\n');

    const indexContent = `<!doctype html>
    <html lang="is">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz Index</title>
        <link rel="stylesheet" href="./styles/index.css"> 
      </head>
      <body>
        <div class="container">
          <h1>Available Quizzes</h1>
          <ul>
            ${links}
          </ul>
        </div>
      </body>
    </html>`;

  const indexFilePath = path.join(OUTPUT_DIR, 'index.html');
  await writeHtml(indexFilePath, indexContent);
}


/**
 * Býr til HTML fyrir spurningalista. (css, html, js)
 * @param {Object} data - Gögnin sem innihalda spurningar og svör.
 * @returns {string} HTML fyrir spurningalista.
 */
export function quizTemplate (data) {
    const { title, questions } = data;
  
    const questionsHTML = questions
      .map((q, index) => {
        // Athugum hvort spurningin hafi löglega uppsetningu
        if (!q.question || !Array.isArray(q.answers)) {
          return '';
        }
  
        const answersHTML = q.answers
          .map((a, i) => `
                <label>
                  <input type="radio" name="question${index}" value="${i}"> 
                  ${a.answer}
                </label>
                </br>
            `)
          .join('');
  
        return `
          <div class="question">
            <p>${q.question}</p>
            <ul>
              ${answersHTML}
            </ul>
          </div>
        `;
      })
      .join('');
  
    const html = `
      <!DOCTYPE html>
      <html lang="is">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/styles/styles.css">  
        <script type="module" src="/scripts/quiz.js"></script> 
      </head>
      <body>
      <div class="container">
        <h1>${title}</h1>
        <form>
          ${questionsHTML}
          <button id="mybtn" type="submit" class="submit-btn">Senda</button>
        </form>
        </div>
      </body>
      </html>
    `;
  
    return html;
  }
  