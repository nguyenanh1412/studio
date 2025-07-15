'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatic language detection and translation.
 *
 * - detectAndTranslate - A function that detects the input language and translates it into the other two supported languages.
 * - DetectAndTranslateInput - The input type for the detectAndTranslate function.
 * - DetectAndTranslateOutput - The return type for the detectAndTranslate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAndTranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
});
export type DetectAndTranslateInput = z.infer<typeof DetectAndTranslateInputSchema>;

const DetectAndTranslateOutputSchema = z.object({
  detectedLanguage: z.string().describe('The detected language of the input text.'),
  englishTranslation: z.string().describe('The translation of the input text into English.'),
  vietnameseTranslation: z.string().describe('The translation of the input text into Vietnamese.'),
  japaneseTranslation: z.string().describe('The translation of the input text into Japanese.'),
});
export type DetectAndTranslateOutput = z.infer<typeof DetectAndTranslateOutputSchema>;

export async function detectAndTranslate(input: DetectAndTranslateInput): Promise<DetectAndTranslateOutput> {
  return detectAndTranslateFlow(input);
}

const languageDetectionPrompt = ai.definePrompt({
  name: 'languageDetectionPrompt',
  input: {schema: DetectAndTranslateInputSchema},
  output: {schema: z.object({language: z.string().describe('The detected language of the input text.  Must be one of: English, Vietnamese, Japanese.')})},
  prompt: `Detect the language of the following text.  Respond ONLY with the language name.  The language must be one of: English, Vietnamese, Japanese.

Text: {{{text}}}`,
});

const englishTranslationPrompt = ai.definePrompt({
  name: 'englishTranslationPrompt',
  input: {schema: z.object({text: z.string(), language: z.string()})},
  output: {schema: z.object({translation: z.string().describe('The translation of the input text into English.')})},
  prompt: `Translate the following text into English.

Language: {{{language}}}
Text: {{{text}}}`,
});

const vietnameseTranslationPrompt = ai.definePrompt({
  name: 'vietnameseTranslationPrompt',
  input: {schema: z.object({text: z.string(), language: z.string()})},
  output: {schema: z.object({translation: z.string().describe('The translation of the input text into Vietnamese.')})},
  prompt: `Translate the following text into Vietnamese.

Language: {{{language}}}
Text: {{{text}}}`,
});

const japaneseTranslationPrompt = ai.definePrompt({
  name: 'japaneseTranslationPrompt',
  input: {schema: z.object({text: z.string(), language: z.string()})},
  output: {schema: z.object({translation: z.string().describe('The translation of the input text into Japanese.')})},
  prompt: `Translate the following text into Japanese.

Language: {{{language}}}
Text: {{{text}}}`,
});

const detectAndTranslateFlow = ai.defineFlow(
  {
    name: 'detectAndTranslateFlow',
    inputSchema: DetectAndTranslateInputSchema,
    outputSchema: DetectAndTranslateOutputSchema,
  },
  async input => {
    const languageDetectionResult = await languageDetectionPrompt(input);
    const detectedLanguage = languageDetectionResult.output!.language;

    const englishTranslationResult = await englishTranslationPrompt({text: input.text, language: detectedLanguage});
    const vietnameseTranslationResult = await vietnameseTranslationPrompt({text: input.text, language: detectedLanguage});
    const japaneseTranslationResult = await japaneseTranslationPrompt({text: input.text, language: detectedLanguage});

    return {
      detectedLanguage: detectedLanguage,
      englishTranslation: englishTranslationResult.output!.translation,
      vietnameseTranslation: vietnameseTranslationResult.output!.translation,
      japaneseTranslation: japaneseTranslationResult.output!.translation,
    };
  }
);











































































































































































































































































































