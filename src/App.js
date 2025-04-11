import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
import { useEffect, useRef, useState } from "react";
import React from "react";
import "./App.css";

function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi i'm ChatGPT, How can I help you?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = async () => {
    const text = input;
    setInput("");
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
    console.log(res);
  };

  const queryHandler = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {
        text,
        isBot: false,
      },
      {
        text: res,
        isBot: true,
      },
    ]);
    console.log(res);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      await handleSendMessage();
    }
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="upperSideTop" />
            <span className="brand">ChatGPT</span>
          </div>

          <button className="midBtn" onClick={() => {window.location.reload()}}>
            <img src={addBtn} className="addBtn"></img>
            New Chat
          </button>

          <div className="upperSideBottom" >
            <button className="query" onClick={queryHandler} value={"What is Programming?"}>
              <img src={msgIcon} alt="..." />
              What is Programming?
            </button>

            <button className="query" onClick={queryHandler} value={"What is ChatGPT?"}>
              <img src={msgIcon} alt="..." />
              What is ChatGPT?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItem">
            <img src={home} alt="..." />
            Home
          </div>

          <div className="listItem">
            <img src={saved} alt="..." />
            Saved
          </div>

          <div className="listItem">
            <img src={rocket} alt="..." />
            Upgrade
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          <div className="chat">
            {messages.map((message, index) => {
              <div
                className={`chat ${message.isBot ? "chat bot" : "chat"}`}
                key={index}
              >
                <img
                  className="chatImg"
                  src={message.isBot ? gptImgLogo : userIcon}
                  alt=".."
                />
                <p className="txt">{message.text}</p>
              </div>;
            })}
            <div ref={msgEnd}/>
          </div>
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              className="chatInput"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSendMessage} onKeyDown={handleEnter}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>
            Chatgpt may produce inaccurate about people, place, or facts.ChatGPT
            April Version
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
