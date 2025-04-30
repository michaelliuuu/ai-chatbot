# AI Chatbot
<img width="1440" alt="Screenshot 2025-04-30 at 12 36 42 PM" src="https://github.com/user-attachments/assets/0104eedb-ad6d-4386-8a43-7e2517491b0a" />

## Overview
This is a simple AI chatbot currently powered by Google's AI Gemini that is capable of handling user's FAQs.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js

## Installation
1. Clone the repository
   ```sh
   git clone https://github.com/michaelliuuu/ai-chatbot.git
   cd ai-chatbot
   ```
2. Get a free API Key at [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)
3. Install dependencies
   ```sh
   npm install
   ```
4. Create a .env file in the chatbot-backend folder and add your API key:
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Start the backend server
   ```sh
   cd chatbot-backend
   node server.js
   ```

## License
This project is licensed under the MIT License.
