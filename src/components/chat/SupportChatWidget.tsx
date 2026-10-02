import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChatLauncher } from './ChatLauncher';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { ChatMenu } from './ChatMenu';
import {
  ChatMessage,
  SuggestedQuestion,
  INITIAL_SUGGESTED_QUESTIONS,
  getBotResponse,
} from '../../data/chatbotKnowledge';
import { NFYVE_CONTACT } from '../../data/nfyveData';

interface SupportChatWidgetProps {
  onBookClick: () => void;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({ onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userName, setUserName] = useState('Guest');
  const [unreadCount, setUnreadCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: '👋 Hi! Welcome to NFYVE – The Change. How can we help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [suggestedQuestions, setSuggestedQuestions] = useState<SuggestedQuestion[]>(
    INITIAL_SUGGESTED_QUESTIONS
  );

  // Synthesize pleasant luxury notification chime using Web Audio API
  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 note

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  // Handle sending a message (user or suggested question)
  const handleSendMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setIsMenuOpen(false);

    // Natural bot response delay (500ms - 800ms)
    setTimeout(() => {
      const responseData = getBotResponse(text, onBookClick);
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: responseData.actionButtons,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (responseData.followUpQuestions && responseData.followUpQuestions.length > 0) {
        setSuggestedQuestions(responseData.followUpQuestions);
      } else {
        setSuggestedQuestions(INITIAL_SUGGESTED_QUESTIONS.slice(0, 3));
      }

      playChime();

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, 650);
  };

  const handleToggleWidget = () => {
    if (!isOpen) {
      setIsOpen(true);
      setUnreadCount(0);
    } else {
      setIsOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleBookAppointmentClick = () => {
    onBookClick();
    // Do not close chat unless requested, but give feedback
    const botConfirm: ChatMessage = {
      id: 'bot-book-' + Date.now(),
      sender: 'bot',
      text: 'Navigating to the appointment reservation section. You can select your preferred pillar, date, and time slot right there!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, botConfirm]);
  };

  const handleOpenPopOut = () => {
    const popoutUrl = `${window.location.origin}${window.location.pathname}#contact`;
    const popup = window.open(
      popoutUrl,
      'NFYVESupportWindow',
      'width=420,height=640,resizable=yes,scrollbars=yes,status=no'
    );
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // If popup blocker intervened, inform user cleanly
      const notice: ChatMessage = {
        id: 'bot-popout-' + Date.now(),
        sender: 'bot',
        text: `Browser popup was restricted. You can contact our Begumpet concierge directly at ${NFYVE_CONTACT.phoneDisplay} or use our main booking form!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, notice]);
    }
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <ChatLauncher
        isOpen={isOpen}
        onToggle={handleToggleWidget}
        unreadCount={unreadCount}
      />

      {/* 2. Responsive Chat Window with Animated Entrance */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.88, y: 24, transformOrigin: 'bottom right' }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-22 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[390px] h-[540px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-[#D6B16A]/50 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="NFYVE Customer Support Chat"
          >
            {/* Header */}
            <ChatHeader
              onMinimize={() => {
                setIsOpen(false);
                setIsMenuOpen(false);
              }}
              onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
              isMenuOpen={isMenuOpen}
              userName={userName}
            />

            {/* Options Menu & Modals */}
            <ChatMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              userName={userName}
              onUpdateUserName={(name) => {
                setUserName(name);
                const botGreeting: ChatMessage = {
                  id: 'bot-name-' + Date.now(),
                  sender: 'bot',
                  text: `Pleased to assist you, ${name}! What would you like to know about our Begumpet transformation sanctuary?`,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                };
                setMessages((prev) => [...prev, botGreeting]);
              }}
              soundEnabled={soundEnabled}
              onToggleSound={() => {
                setSoundEnabled((prev) => {
                  const next = !prev;
                  if (next) playChime();
                  return next;
                });
              }}
              messages={messages}
              onOpenPopOut={handleOpenPopOut}
            />

            {/* Chat Conversation Body */}
            <ChatMessageList
              messages={messages}
              isTyping={isTyping}
              suggestedQuestions={suggestedQuestions}
              onSelectSuggestedQuestion={handleSendMessage}
              onBookAppointmentClick={handleBookAppointmentClick}
            />

            {/* Input Bar */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
