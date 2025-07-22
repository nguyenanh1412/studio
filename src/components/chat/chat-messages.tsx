'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Message } from '@/lib/types';
import { ChatMessage } from './chat-message';
import React from 'react';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1">
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
