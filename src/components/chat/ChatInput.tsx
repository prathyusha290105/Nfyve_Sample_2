import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white border-t border-[#D6B16A]/30 flex items-center gap-2 rounded-b-2xl relative z-10"
    >
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message or inquiry..."
        disabled={disabled}
        aria-label="Type message for Customer Support"
        className="flex-1 px-3.5 py-2 text-xs text-[#211A18] placeholder-[#211A18]/45 bg-[#F7F0E7]/60 rounded-full border border-[#D6B16A]/40 focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all"
      />
      <button
        type="submit"
        disabled={!inputText.trim() || disabled}
        aria-label="Send message"
        className="w-8 h-8 rounded-full bg-[#059669] hover:bg-[#047857] disabled:opacity-40 disabled:hover:bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] active:scale-95"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
};
