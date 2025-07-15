'use client';

import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import type { UILanguage } from '@/lib/types';
import { uiStrings } from '@/lib/translations';

interface ChatLayoutProps {
  children: React.ReactNode;
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
}

export function ChatLayout({ children, uiLang, setUiLang }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-foreground">
          {uiStrings[uiLang].title}
        </h1>
        <div className="flex items-center gap-2">
          <LanguageToggle uiLang={uiLang} setUiLang={setUiLang} />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
