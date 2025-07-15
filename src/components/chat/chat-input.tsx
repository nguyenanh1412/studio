'use client';

import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { UILanguage } from '@/lib/types';
import { uiStrings } from '@/lib/translations';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isSending: boolean;
  uiLang: UILanguage;
}

export function ChatInput({ onSendMessage, isSending, uiLang }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={uiStrings[uiLang].placeholder}
          className="pr-20 min-h-[52px] resize-none"
          rows={1}
          disabled={isSending}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 disabled:bg-primary/50"
          disabled={isSending || !text.trim()}
          aria-label={uiStrings[uiLang].send}
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
