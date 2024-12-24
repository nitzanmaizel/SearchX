import React, { useRef } from 'react';
import IconWrapper from './IconWrapper';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('This browser does not support SpeechRecognition API.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event);
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended.');
    };

    recognitionRef.current.start();
  };

  return <IconWrapper type='mic' onClick={handleVoiceSearch} color='blue' />;
};

export default VoiceSearch;
