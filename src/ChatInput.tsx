import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f1f1f1;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
`;

interface ChatInputProps {
  addMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ addMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported");
    } else {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript =
          event.results[event.resultIndex][0].transcript.trim();
        setInputValue(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      addMessage(inputValue);
      setInputValue("");
    }
  };

  const startListening = () => {
    if (!isListening) {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type a message"
      />
      <Button onClick={startListening} disabled={isListening}>
        🎤 Start
      </Button>
      <Button onClick={stopListening} disabled={!isListening}>
        🛑 Stop
      </Button>
      <Button onClick={handleSend}>Send</Button>
    </InputContainer>
  );
};

export default ChatInput;
