// ChatbotApp.js
import React, { useState } from "react";
import axios from "axios";
import "./ChatbotApp.css";

const ChatbotApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, user: "user" };
    setMessages([...messages, userMessage]);
    setInputText("");

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://customized-chatbot.onrender.com/ask",
        {},
        {
          headers: {
            accept: "application/json",
            sendQuery: inputText,
          },
        }
      );

      const botResponse = response.data.response;
      const botMessage = { text: botResponse, user: "bot" };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === "bot" ? "bot" : "user"}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Bot is typing...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotApp;
