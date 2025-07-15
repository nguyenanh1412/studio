'use client';

import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UILanguage } from '@/lib/types';

interface LanguageToggleProps {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
}

export function LanguageToggle({ uiLang, setUiLang }: LanguageToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUiLang('en')}>
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUiLang('vi')}>
          <span className="mr-2">🇻🇳</span> Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUiLang('ja')}>
          <span className="mr-2">🇯🇵</span> 日本語
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
