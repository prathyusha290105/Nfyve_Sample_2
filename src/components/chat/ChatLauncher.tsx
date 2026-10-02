import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export const ChatLauncher: React.FC<ChatLauncherProps> = ({
  isOpen,
  onToggle,
  unreadCount = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close Customer Support chat' : 'Open Customer Support chat'}
        aria-expanded={isOpen}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-[#059669] hover:bg-[#047857] text-white shadow-xl hover:shadow-2xl border-2 border-white/20 flex items-center justify-center cursor-pointer transition-colors relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#10B981]/50"
      >
        {/* Animated Icon Swap */}
        <motion.div
          key={isOpen ? 'close' : 'open'}
          initial={shouldReduceMotion ? {} : { rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.2]" />
          ) : (
            <MessageSquare className="w-6 h-6 text-white stroke-[2.2]" />
          )}
        </motion.div>

        {/* Unread Message / Active Dot Badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}

        {/* Pulse glow ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#10B981] opacity-25 animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};
