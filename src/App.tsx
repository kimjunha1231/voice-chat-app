import React, { useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface Message {
  text: string;
  fromMe: boolean;
  timestamp: string;
  user: string;
  type: "text" | "image";
}

const App: React.FC = () => {
  const [messages1, setMessages1] = useState<Message[]>([]);
  const [messages2, setMessages2] = useState<Message[]>([]);
  const [nickname1, setNickname1] = useState<string>("");
  const [nickname2, setNickname2] = useState<string>("");
  const [nicknamesSet, setNicknamesSet] = useState<boolean>(false);

  const handleSetNicknames = () => {
    if (nickname1.trim() !== "" && nickname2.trim() !== "") {
      setNicknamesSet(true);
    }
  };

  const processMessage = (message: string, fromMe: boolean, user: string) => {
    const timestamp = new Date().toLocaleTimeString();
    let newMessage: Message;

    if (message.startsWith("/바다")) {
      newMessage = {
        text: "https://example.com/ocean.jpg",
        fromMe,
        timestamp,
        user,
        type: "image",
      };
    } else {
      newMessage = { text: message, fromMe, timestamp, user, type: "text" };
    }

    return newMessage;
  };

  const addMessage1 = (message: string) => {
    const newMessage = processMessage(message, true, nickname1);
    const newMessageForOther = { ...newMessage, fromMe: false };
    setMessages1([...messages1, newMessage]);
    setMessages2([...messages2, newMessageForOther]);
  };

  const addMessage2 = (message: string) => {
    const newMessage = processMessage(message, true, nickname2);
    const newMessageForOther = { ...newMessage, fromMe: false };
    setMessages2([...messages2, newMessage]);
    setMessages1([...messages1, newMessageForOther]);
  };

  if (!nicknamesSet) {
    return (
      <AppContainer>
        <div>
          <h2>Set Nicknames</h2>
          <Input
            type="text"
            placeholder="User 1 Nickname"
            value={nickname1}
            onChange={(e) => setNickname1(e.target.value)}
          />
          <Input
            type="text"
            placeholder="User 2 Nickname"
            value={nickname2}
            onChange={(e) => setNickname2(e.target.value)}
          />
          <Button onClick={handleSetNicknames}>Start Chatting</Button>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer style={{ flexDirection: "row" }}>
      <ChatContainer>
        <ChatWindow messages={messages1} user={nickname1} />
        <ChatInput addMessage={addMessage1} />
      </ChatContainer>
      <ChatContainer>
        <ChatWindow messages={messages2} user={nickname2} />
        <ChatInput addMessage={addMessage2} />
      </ChatContainer>
    </AppContainer>
  );
};

export default App;
