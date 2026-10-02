import React, { useEffect, useRef } from 'react';
import { Phone, Mail, Calendar, Sparkles } from 'lucide-react';
import { ChatMessage, SuggestedQuestion } from '../../data/chatbotKnowledge';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  suggestedQuestions: SuggestedQuestion[];
  onSelectSuggestedQuestion: (questionText: string) => void;
  onBookAppointmentClick: () => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  suggestedQuestions,
  onSelectSuggestedQuestion,
  onBookAppointmentClick,
}) => {
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, suggestedQuestions]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scroll bg-[#F7F0E7]/60">
      {/* Messages */}
      {messages.map((message) => {
        const isBot = message.sender === 'bot';

        return (
          <div
            key={message.id}
            className={`flex items-end gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
          >
            {/* Bot Avatar */}
            {isBot && (
              <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm border border-white">
                <span className="font-serif font-bold text-xs">N5</span>
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[82%] sm:max-w-[78%] px-3.5 py-2.5 shadow-sm text-xs leading-relaxed ${
                isBot
                  ? 'bg-white text-[#211A18] rounded-2xl rounded-bl-xs border border-[#D6B16A]/30'
                  : 'bg-[#059669] text-white rounded-2xl rounded-br-xs font-medium'
              }`}
            >
              <div className="whitespace-pre-line">{message.text}</div>

              {/* Bot Message Action Buttons if present */}
              {isBot && message.actionButtons && message.actionButtons.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#D6B16A]/20 flex flex-wrap gap-1.5">
                  {message.actionButtons.map((btn, idx) => {
                    if (btn.type === 'phone' && btn.value) {
                      return (
                        <a
                          key={idx}
                          href={`tel:${btn.value}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#401724] text-[#FFFAF4] text-[10px] font-semibold hover:bg-[#571f31] transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#F0C46B]" />
                          <span>{btn.label}</span>
                        </a>
                      );
                    }

                    if (btn.type === 'email' && btn.value) {
                      return (
                        <a
                          key={idx}
                          href={`mailto:${btn.value}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#401724] text-[#FFFAF4] text-[10px] font-semibold hover:bg-[#571f31] transition-colors"
                        >
                          <Mail className="w-3 h-3 text-[#F0C46B]" />
                          <span>{btn.label}</span>
                        </a>
                      );
                    }

                    if (btn.type === 'booking') {
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={onBookAppointmentClick}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#059669] text-white text-[10px] font-semibold hover:bg-[#047857] shadow-xs cursor-pointer transition-colors"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>{btn.label}</span>
                        </button>
                      );
                    }

                    return null;
                  })}
                </div>
              )}

              {/* Timestamp */}
              <div
                className={`text-[9px] mt-1 text-right tabular-nums ${
                  isBot ? 'text-[#211A18]/50' : 'text-white/70'
                }`}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-end gap-2.5 justify-start animate-in fade-in duration-150">
          <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm border border-white">
            <span className="font-serif font-bold text-xs">N5</span>
          </div>
          <div className="bg-white rounded-2xl rounded-bl-xs border border-[#D6B16A]/30 px-3.5 py-2.5 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-bounce" />
          </div>
        </div>
      )}

      {/* Suggested Questions Chips */}
      {suggestedQuestions.length > 0 && !isTyping && (
        <div className="pt-2 animate-in fade-in duration-200">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#401724]/70 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D6B16A]" />
            <span>Suggested Inquiries</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectSuggestedQuestion(q.text)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-[#F7F0E7] text-[#401724] border border-[#D6B16A]/50 text-xs font-medium text-left shadow-xs hover:border-[#059669] transition-all cursor-pointer active:scale-95"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={scrollEndRef} />
    </div>
  );
};
