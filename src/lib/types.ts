export type SupportedLanguage = 'English' | 'Vietnamese' | 'Japanese';
export type UILanguage = 'en' | 'vi' | 'ja';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string; // User message or a loading placeholder for assistant
  detectedLanguage?: SupportedLanguage;
  translations?: {
    english: string;
    vietnamese: string;
    japanese: string;
  };
  isLoading?: boolean;
}
