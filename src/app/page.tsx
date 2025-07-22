'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { detectAndTranslate } from '@/ai/flows/detect-and-translate';
import type { Message, UILanguage } from '@/lib/types';
import { ChatLayout } from '@/components/chat/chat-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';

// This is a workaround for server-side rendering environments where crypto is not available.
const getUUID = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Basic fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};


export default function ChatPage() {
  const [messages, setMessages] = useLocalStorage<Message[]>('tri-lingual-messages', []);
  const [uiLang, setUiLang] = useLocalStorage<UILanguage>('tri-lingual-uilang', 'en');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isSending) return;

    setIsSending(true);

    const userMessage: Message = {
      id: getUUID(),
      role: 'user',
      text,
    };

    const loadingMessage: Message = {
      id: getUUID(),
      role: 'assistant',
      isLoading: true,
      text: '...',
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const result = await detectAndTranslate({ text });
      
      const assistantMessage: Message = {
        id: loadingMessage.id,
        role: 'assistant',
        text: '',
        detectedLanguage: result.detectedLanguage as any,
        translations: {
          english: result.englishTranslation,
          vietnamese: result.vietnameseTranslation,
          japanese: result.japaneseTranslation,
        },
        isLoading: false,
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? assistantMessage : msg))
      );
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get translation. Please try again.',
      });
      // Remove user message and loading message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id && msg.id !== loadingMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ChatLayout uiLang={uiLang} setUiLang={setUiLang}>
      <ChatMessages messages={messages} />
      <ChatInput
        onSendMessage={handleSendMessage}
        isSending={isSending}
        uiLang={uiLang}
      />
    </ChatLayout>
  );
}
