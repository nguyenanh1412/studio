// src/ai/flows/evaluate-translation-quality.ts
'use server';

/**
 * @fileOverview Flow for evaluating the quality of translation and suggesting alternative translation methods.
 *
 * - evaluateTranslationQuality - A function that evaluates the quality of the translated text.
 * - EvaluateTranslationQualityInput - The input type for the evaluateTranslationQuality function.
 * - EvaluateTranslationQualityOutput - The return type for the evaluateTranslationQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateTranslationQualityInputSchema = z.object({
  originalText: z.string().describe('The original text that was translated.'),
  translatedText: z.string().describe('The translated text to evaluate.'),
  sourceLanguage: z.string().describe('The language of the original text (e.g., English, Vietnamese, Japanese).'),
  targetLanguage: z.string().describe('The language of the translated text (e.g., English, Vietnamese, Japanese).'),
});
export type EvaluateTranslationQualityInput = z.infer<typeof EvaluateTranslationQualityInputSchema>;

const EvaluateTranslationQualityOutputSchema = z.object({
  qualityScore: z.number().describe('A numerical score representing the quality of the translation (e.g., 1-10).'),
  isUnderstandable: z.boolean().describe('Whether the translated text is understandable.'),
  suggestedImprovement: z.string().describe('Suggestion on how to improve the translated text, or alternative translation methods.'),
});
export type EvaluateTranslationQualityOutput = z.infer<typeof EvaluateTranslationQualityOutputSchema>;

export async function evaluateTranslationQuality(input: EvaluateTranslationQualityInput): Promise<EvaluateTranslationQualityOutput> {
  return evaluateTranslationQualityFlow(input);
}

const evaluateTranslationQualityPrompt = ai.definePrompt({
  name: 'evaluateTranslationQualityPrompt',
  input: {schema: EvaluateTranslationQualityInputSchema},
  output: {schema: EvaluateTranslationQualityOutputSchema},
  prompt: `You are an expert in translation quality assessment.

You are provided with an original text, its translated version, the source language, and the target language.
Your task is to evaluate the quality of the translation and provide feedback.

Original Text ({sourceLanguage}): {{{originalText}}}
Translated Text ({targetLanguage}): {{{translatedText}}}

Consider the following aspects when evaluating the translation:
- Accuracy: Does the translation accurately convey the meaning of the original text?
- Fluency: Is the translation natural and easy to read in the target language?
- Understandability: Is the translation understandable to a native speaker of the target language?
- Style: Does the translation maintain the style and tone of the original text?

Based on your evaluation, provide:
1. A quality score (1-10, higher is better).
2. A boolean value indicating whether the translated text is understandable.
3. Suggestions on how to improve the translation, or alternative translation methods if the translation is not understandable.

{{json examples='{
  "qualityScore": 7,
  "isUnderstandable": true,
  "suggestedImprovement": "The translation is generally good, but the phrasing could be more natural. Consider rephrasing \"...\" to \"...\" for better fluency."
}'}}

`, // Add example to help the model structure the output in the requested format.
});

const evaluateTranslationQualityFlow = ai.defineFlow(
  {
    name: 'evaluateTranslationQualityFlow',
    inputSchema: EvaluateTranslationQualityInputSchema,
    outputSchema: EvaluateTranslationQualityOutputSchema,
  },
  async input => {
    const {output} = await evaluateTranslationQualityPrompt(input);
    return output!;
  }
);
