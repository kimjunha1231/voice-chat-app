import React from "react";
import styled from "styled-components";

const WindowContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #ffffff;
`;

const MessageContainer = styled.div<{ fromMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.fromMe ? "flex-end" : "flex-start")};
  padding: 5px;
`;
const MessageBubble = styled.div<{ fromMe: boolean }>`
  padding: 10px;
  margin: 5px;
  background-color: ${(props) => (props.fromMe ? "#DCF8C6" : "#f1f1f1")};
  border-radius: 5px;
  max-width: 60%;
`;

const Timestamp = styled.div<{ fromMe: boolean }>`
  font-size: 0.8em;
  color: gray;
  text-align: ${(props) => (props.fromMe ? "right" : "left")};
`;

const UserLabel = styled.div<{ fromMe: boolean }>`
  font-size: 0.9em;
  color: gray;
  text-align: ${(props) => (props.fromMe ? "right" : "left")};
  margin-bottom: 5px;
`;

interface Message {
  text: string;
  fromMe: boolean;
  timestamp: string;
  user: string;
}

interface ChatWindowProps {
  messages: Message[];
  user: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, user }) => {
  return (
    <WindowContainer>
      {messages.map((message, index) => (
        <MessageContainer key={index} fromMe={message.fromMe}>
          <UserLabel fromMe={message.fromMe}>{message.user}</UserLabel>
          <MessageBubble fromMe={message.fromMe}>
            {message.text}
            <Timestamp fromMe={message.fromMe}>{message.timestamp}</Timestamp>
          </MessageBubble>
        </MessageContainer>
      ))}
    </WindowContainer>
  );
};

export default ChatWindow;
