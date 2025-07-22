'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

import { detectAndTranslate } from '@/ai/flows/detect-and-translate';
import type { Message, UILanguage } from '@/lib/types';
import { ChatLayout } from '@/components/chat/chat-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [uiLang, setUiLang] = useState<UILanguage>('en');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isSending) return;

    setIsSending(true);

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      text,
    };

    const loadingMessage: Message = {
      id: uuidv4(),
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
