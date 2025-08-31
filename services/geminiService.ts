// services/geminiService.ts
export const callGemini = async (prompt: string, systemInstruction?: string): Promise<string> => {
  try {
    const r = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemInstruction }),
    });
    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      throw new Error(data.error || `Request failed with status ${r.status}`);
    }
    const data = await r.json();
    return data.text;
  } catch (e) {
    console.error('Gemini proxy call failed:', e);
    return 'Sorry, I’m having trouble connecting right now. Please try again later.';
  }
};
