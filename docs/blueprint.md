# **App Name**: Tri-Lingual Messenger

## Core Features:

- Chat Interface: Clean chat interface with input box, chat bubbles, and language indicators.
- Automatic Language Detection: Automatically detect the input language (Vietnamese, Japanese, or English) using Gemini AI.
- Real-time Translation: Translate the input message into the other two languages (Vietnamese, Japanese, or English) using Gemini AI. The LLM will use a 'translation quality' tool to choose different methods of translation in case the first translation isn't understandable.
- Translation Display: Display the translated messages in distinct chat bubbles with language flags.
- Local Message Storage: Store all messages locally in the browser using localStorage.
- UI Language Toggle: Allow the user to optionally switch the UI language between Vietnamese, English and Japanese. UI language saved using localStorage.

## Style Guidelines:

- Primary color: Indigo (#4F46E5) to bring a sense of professionalism and precision.
- Background color: Light gray (#F9FAFB) for a clean, modern look that won't distract.
- Accent color: Purple (#A855F7) to draw attention to key features like the send button or language toggles.
- Body and headline font: 'Inter', a grotesque-style sans-serif. Note: currently only Google Fonts are supported.
- Use clear and recognizable flag icons to denote language in each chat bubble.
- Responsive layout to work on both mobile and desktop devices, mimicking a standard messaging app interface.
- Subtle animations for new message arrival and translation loading to provide a smooth user experience.