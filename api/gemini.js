// api/gemini.js  (Node runtime, ESM)
import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel Node functions parse JSON body for you when header is application/json
    const { prompt, systemInstruction } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      ...(systemInstruction && { config: { systemInstruction } }),
    });

    return res.status(200).json({ text: result.text });
  } catch (err) {
    console.error('API function error:', err);
    return res.status(500).json({ error: 'Failed to call Gemini API' });
  }
}
