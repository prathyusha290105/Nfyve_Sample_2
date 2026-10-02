import React from 'react';
import { Minus, MoreVertical, ShieldCheck, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  onMinimize: () => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  userName?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMinimize,
  onToggleMenu,
  isMenuOpen,
  userName = 'Guest',
}) => {
  return (
    <div className="bg-[#059669] text-white px-4 py-3.5 flex items-center justify-between shadow-md relative z-20 rounded-t-2xl">
      {/* Concierge Avatar & Title */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner overflow-hidden">
            <span className="font-serif font-bold text-base tracking-tighter">N5</span>
          </div>
          {/* Active online status indicator */}
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white ring-1 ring-emerald-900"
            title="Online and ready to assist"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-sm leading-tight text-white">Customer Support</h3>
            <span title="Verified NFYVE Concierge" className="inline-flex">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            </span>
          </div>
          <span className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            NFYVE Begumpet Sanctuary · {userName}
          </span>
        </div>
      </div>

      {/* Action Icons: Menu & Minimize */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="Chat options menu"
          aria-expanded={isMenuOpen}
          className={`p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isMenuOpen ? 'bg-white/20' : ''
          }`}
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize chat window"
          className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
