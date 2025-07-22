'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/lib/types';
import { ChatMessage } from './chat-message';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
        <div className="p-4 md:p-6 space-y-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">
                Start a conversation by typing a message below.
              </p>
            </div>
          )}
        </div>
    </ScrollArea>
  );
}
