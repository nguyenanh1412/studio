import type { SupportedLanguage, UILanguage } from './types';

export const uiStrings = {
  en: {
    title: 'Tri-Lingual Messenger',
    placeholder: 'Type your message in English, Vietnamese, or Japanese...',
    send: 'Send',
  },
  vi: {
    title: 'Trình nhắn tin ba thứ tiếng',
    placeholder:
      'Nhập tin nhắn của bạn bằng tiếng Việt, tiếng Nhật, hoặc tiếng Anh...',
    send: 'Gửi',
  },
  ja: {
    title: '三か国語メッセンジャー',
    placeholder:
      'メッセージを日本語、ベトナム語、または英語で入力してください...',
    send: '送信',
  },
};

export const LANGUAGES: Record<
  SupportedLanguage,
  { flag: string; code: UILanguage }
> = {
  English: { flag: '🇺🇸', code: 'en' },
  Vietnamese: { flag: '🇻🇳', code: 'vi' },
  Japanese: { flag: '🇯🇵', code: 'ja' },
};
