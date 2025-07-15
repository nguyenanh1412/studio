'use client';

import { cn } from '@/lib/utils';
import type { Message, SupportedLanguage } from '@/lib/types';
import { LANGUAGES } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface ChatMessageProps {
  message: Message;
}

const LanguageHeader = ({ language }: { language: SupportedLanguage }) => (
  <div className="flex items-center gap-2 text-sm font-semibold mb-1">
    <span>{LANGUAGES[language]?.flag}</span>
    <span>{language}</span>
  </div>
);

const UserMessage = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 justify-end">
    <Card className="bg-primary text-primary-foreground max-w-sm sm:max-w-md md:max-w-lg">
      <CardContent className="p-3">
        <p className="whitespace-pre-wrap">{text}</p>
      </CardContent>
    </Card>
    <div className="p-2 rounded-full bg-muted border">
      <User className="w-5 h-5 text-muted-foreground" />
    </div>
  </div>
);

const AssistantMessage = ({ message }: { message: Message }) => {
  if (message.isLoading) {
    return (
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-muted border">
          <Bot className="w-5 h-5 text-muted-foreground" />
        </div>
        <Card className="bg-card max-w-sm sm:max-w-md md:max-w-lg">
          <CardContent className="p-3 space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!message.translations || !message.detectedLanguage) return null;

  const translationsToShow = (
    Object.keys(LANGUAGES) as SupportedLanguage[]
  ).filter((lang) => lang !== message.detectedLanguage);

  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-muted border">
        <Bot className="w-5 h-5 text-muted-foreground" />
      </div>
      <Card className="bg-card max-w-sm sm:max-w-md md:max-w-lg">
        <CardContent className="p-3">
          <div className="space-y-4">
            {translationsToShow.map((lang) => (
              <div key={lang}>
                <LanguageHeader language={lang} />
                <p className="whitespace-pre-wrap text-foreground/90">
                  {message.translations?.[lang.toLowerCase() as keyof typeof message.translations]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  return (
    <div
      className={cn(
        'flex items-end w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {isUser ? <UserMessage text={message.text} /> : <AssistantMessage message={message} />}
    </div>
  );
}
