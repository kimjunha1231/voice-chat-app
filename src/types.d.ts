interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void; // 추가된 부분
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
  resultIndex: number;
}

interface Window {
  webkitSpeechRecognition: {
    new (): SpeechRecognition;
  };
}
