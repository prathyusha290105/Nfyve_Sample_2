import React, { useState } from 'react';
import {
  User,
  Mail,
  Volume2,
  VolumeX,
  ExternalLink,
  PhoneCall,
  Check,
  Copy,
  X,
} from 'lucide-react';
import { NFYVE_CONTACT } from '../../data/nfyveData';
import { ChatMessage } from '../../data/chatbotKnowledge';

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  messages: ChatMessage[];
  onOpenPopOut: () => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
  soundEnabled,
  onToggleSound,
  messages,
  onOpenPopOut,
}) => {
  const [activeModal, setActiveModal] = useState<
    'none' | 'name' | 'transcript' | 'contact'
  >('none');
  const [nameInput, setNameInput] = useState(userName);
  const [emailInput, setEmailInput] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [transcriptNotice, setTranscriptNotice] = useState<string | null>(null);

  if (!isOpen && activeModal === 'none') return null;

  // Format clean text transcript
  const getTranscriptText = (): string => {
    const header = `=== NFYVE – The Change Customer Support Transcript ===\nDate: ${new Date().toLocaleString()}\nVisitor: ${userName}\nSanctuary: Begumpet, Hyderabad (+91 9000023050)\n\n`;
    const body = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'user' ? userName : 'NFYVE Concierge'}:\n${m.text}\n`
      )
      .join('\n');
    return header + body;
  };

  const handleCopyTranscript = async () => {
    try {
      await navigator.clipboard.writeText(getTranscriptText());
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2500);
    } catch {
      // Fallback manual selection
    }
  };

  const handleEmailTranscriptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setTranscriptNotice(
      `Direct server-side email dispatch is pending integration. Your transcript has been prepared—you can copy it to your clipboard directly below:`
    );
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateUserName(nameInput.trim());
      setActiveModal('none');
      onClose();
    }
  };

  return (
    <>
      {/* Menu Overlay Dropdown */}
      {isOpen && activeModal === 'none' && (
        <div className="absolute top-14 right-3 z-30 w-60 bg-[#211A18] text-[#FFFAF4] rounded-xl shadow-2xl border border-[#D6B16A]/50 py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          {/* 1. Change Name */}
          <button
            type="button"
            onClick={() => {
              setNameInput(userName);
              setActiveModal('name');
            }}
            className="w-full px-3.5 py-2.5 text-left text-xs text-[#E8D9C7] hover:text-[#F0C46B] hover:bg-white/5 flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <User className="w-4 h-4 text-[#D6B16A]" />
            <span>Change Name ({userName})</span>
          </button>

          {/* 2. Email Transcript */}
          <button
            type="button"
            onClick={() => {
              setTranscriptNotice(null);
              setActiveModal('transcript');
            }}
            className="w-full px-3.5 py-2.5 text-left text-xs text-[#E8D9C7] hover:text-[#F0C46B] hover:bg-white/5 flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <Mail className="w-4 h-4 text-[#D6B16A]" />
            <span>Email Transcript</span>
          </button>

          {/* 3. Sound On / Off */}
          <button
            type="button"
            onClick={onToggleSound}
            className="w-full px-3.5 py-2.5 text-left text-xs text-[#E8D9C7] hover:text-[#F0C46B] hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#10B981]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#EF4444]" />
              )}
              <span>Notification Sounds</span>
            </div>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                soundEnabled
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-red-950 text-red-300 border border-red-500/40'
              }`}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* 4. Pop Out Widget */}
          <button
            type="button"
            onClick={() => {
              onOpenPopOut();
              onClose();
            }}
            className="w-full px-3.5 py-2.5 text-left text-xs text-[#E8D9C7] hover:text-[#F0C46B] hover:bg-white/5 flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#D6B16A]" />
            <span>Pop Out Window</span>
          </button>

          {/* 5. Contact Support (Replaces "Add chat to your website") */}
          <div className="border-t border-[#D6B16A]/20 my-1" />
          <button
            type="button"
            onClick={() => setActiveModal('contact')}
            className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-[#F0C46B] hover:bg-white/5 flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#F0C46B]" />
            <span>Direct Concierge Call / Email</span>
          </button>
        </div>
      )}

      {/* Sub-Modals for Functional Menu Options */}

      {/* MODAL 1: CHANGE NAME */}
      {activeModal === 'name' && (
        <div className="absolute inset-0 z-40 bg-[#211A18]/95 p-5 flex flex-col justify-center text-[#FFFAF4] rounded-2xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-serif text-base font-medium text-[#F0C46B] flex items-center gap-2">
              <User className="w-4 h-4" /> Change Display Name
            </h4>
            <button
              onClick={() => setActiveModal('none')}
              className="p-1 rounded-full text-[#E8D9C7] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#E8D9C7] mb-3 leading-relaxed">
            How would you like our concierge team to address you in chat?
          </p>
          <form onSubmit={handleSaveName} className="space-y-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name or preferred title"
              className="w-full px-3 py-2 rounded-lg bg-[#2B2320] border border-[#D6B16A]/50 text-sm text-[#FFFAF4] focus:outline-none focus:ring-1 focus:ring-[#F0C46B]"
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-[#E8D9C7] hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-xs font-semibold text-white shadow-sm"
              >
                Save Name
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: EMAIL TRANSCRIPT */}
      {activeModal === 'transcript' && (
        <div className="absolute inset-0 z-40 bg-[#211A18]/95 p-5 flex flex-col justify-between text-[#FFFAF4] rounded-2xl animate-in fade-in duration-150">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-base font-medium text-[#F0C46B] flex items-center gap-2">
                <Mail className="w-4 h-4" /> Chat Transcript
              </h4>
              <button
                onClick={() => setActiveModal('none')}
                className="p-1 rounded-full text-[#E8D9C7] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#E8D9C7] mb-3 leading-relaxed">
              Enter your email address to request a verified transcript of your conversation with NFYVE Concierge:
            </p>

            <form onSubmit={handleEmailTranscriptSubmit} className="space-y-2 mb-3">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 rounded-lg bg-[#2B2320] border border-[#D6B16A]/50 text-xs text-[#FFFAF4] focus:outline-none focus:ring-1 focus:ring-[#F0C46B]"
                required
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-xs font-semibold text-white shadow-sm"
              >
                Request Email Copy
              </button>
            </form>

            {transcriptNotice && (
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-200 leading-snug">
                {transcriptNotice}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#D6B16A]/20">
            <button
              type="button"
              onClick={handleCopyTranscript}
              className="w-full py-2 px-3 rounded-lg bg-[#401724] border border-[#D6B16A]/60 hover:bg-[#571f31] text-xs text-[#FFFAF4] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copiedStatus ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Transcript Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#F0C46B]" />
                  <span>Copy Transcript to Clipboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: DIRECT CONTACT SUPPORT */}
      {activeModal === 'contact' && (
        <div className="absolute inset-0 z-40 bg-[#211A18]/95 p-5 flex flex-col justify-between text-[#FFFAF4] rounded-2xl animate-in fade-in duration-150">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-base font-medium text-[#F0C46B] flex items-center gap-2">
                <PhoneCall className="w-4 h-4" /> Contact Sanctuary Concierge
              </h4>
              <button
                onClick={() => setActiveModal('none')}
                className="p-1 rounded-full text-[#E8D9C7] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#E8D9C7] mb-3 leading-relaxed">
              Prefer speaking with a human wellness consultant directly? Our Begumpet team is available 7 days a week:
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${NFYVE_CONTACT.phone}`}
                className="p-3 rounded-xl bg-[#401724] border border-[#D6B16A]/40 flex items-center gap-3 text-left hover:border-[#F0C46B] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#211A18] flex items-center justify-center text-[#F0C46B] shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-semibold uppercase">
                    Call Direct
                  </span>
                  <span className="font-serif text-sm text-[#FFFAF4] font-bold tabular-nums">
                    {NFYVE_CONTACT.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${NFYVE_CONTACT.email}`}
                className="p-3 rounded-xl bg-[#401724] border border-[#D6B16A]/40 flex items-center gap-3 text-left hover:border-[#F0C46B] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#211A18] flex items-center justify-center text-[#F0C46B] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#E8D9C7]/80 block font-semibold uppercase">
                    Email Inquiry
                  </span>
                  <span className="text-xs text-[#FFFAF4] font-medium">
                    {NFYVE_CONTACT.email}
                  </span>
                </div>
              </a>

              <div className="p-2.5 rounded-xl bg-[#2B2320] border border-[#D6B16A]/20 text-[11px] text-[#E8D9C7]">
                📍 <strong>Begumpet Flagship:</strong> 4th Floor, Kura Towers, Besides Begumpet Old Airport, Hyderabad.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('none')}
            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E8D9C7]"
          >
            Back to Chat
          </button>
        </div>
      )}
    </>
  );
};
