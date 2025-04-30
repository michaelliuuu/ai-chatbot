const chatbotToggler = document.getElementById("chat-icon");
const chatbot = document.getElementById("chatbot-container");
const messageInput = document.getElementById("message-input");
const chatBody = document.querySelector(".chat-body");
const submitMessageButton = document.getElementById("submit-message");

// Toggle to open and close the chatbot
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

// API setup
const BACKEND_URL = "https://ai-chatbot-tgcl.onrender.com"
const API_URL = `${BACKEND_URL}/chat`; // Point to your backend


const userData = {
    message: null
};

// Generate a bot response from Gemini
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userData.message })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        messageElement.innerText = data.response;
    } catch (error) {
        console.error(error);
        messageElement.innerText = "Error fetching response.";
    } finally {
        incomingMessageDiv.classList.remove("thinking");
    }
};

// Uncomment if using ChatGPT API 
// const generateBotResponse = async (incomingMessageDiv) => {
//     const messageElement = incomingMessageDiv.querySelector(".message-text");
//     // Prepare the request payload for OpenAI API
//     const requestPayload = {
//         model: "gpt-3.5-turbo",  // You can replace with other models
//         messages: [
//             { role: "system", content: "You are a helpful chatbot." },
//             { role: "user", content: userData.message }
//         ],
//         temperature: 0.7
//     };

//     try {
//         // Send request to OpenAI API
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${API_KEY}`
//             },
//             body: JSON.stringify(requestPayload)
//         });

//         // Handle response from OpenAI API
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.error.message);
//         }

//         // Extract the bot's response
//         const apiResponseText = data.choices[0].message.content.trim();

//         // Update the message text in the chat
//         messageElement.innerText = apiResponseText;
//     } catch (error) {
//         console.log(error);
//         messageElement.innerText = "Sorry, something went wrong!";
//     } finally {
//         incomingMessageDiv.classList.remove("thinking");
//     }
// }

// Create message element with dynamic classes and return it
const createMessageElement = (content, classes) => {
    const div = document.createElement("div");
    div.classList.add("message", classes);
    div.innerHTML = content;
    return div;
}

// Handle outgoing user messages
const handleOutGoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    messageInput.dispatchEvent(new Event("input"));

    const messageContent = `<div class="message-text">${userData.message}</div>`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);

    // Simulate bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `<i class='fas fa-robot'></i>
                                <div class="message-text">
                                    <div class="thinking-indicator">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

// Handle 'Enter' key press for sending messages
messageInput.addEventListener("keydown", (e) => { 
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage) {
        handleOutGoingMessage(e);
    }
});

submitMessageButton.addEventListener("click", (e) => handleOutGoingMessage(e));
