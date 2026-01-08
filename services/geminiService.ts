// Gemini 1.5 Pro text endpoint (official REST v1beta). Replace with desired model if needed.
// NOTE: Requires API_KEY provided at build/runtime (e.g., Vercel env vars or local .env file).
const apiKey = process.env.API_KEY;
const MODEL = 'models/gemini-1.5-pro';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent`;

interface GeminiPart { text: string }
interface GeminiHistoryItem { role: string; parts: GeminiPart[] }

export const sendMessageToGemini = async (
  message: string,
  history: GeminiHistoryItem[]
): Promise<string> => {
  if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
    return '【系统提示】演示模式：未配置 API_KEY，暂未连接 Gemini。';
  }

  try {
    const body = {
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024
      }
    };

    const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Gemini HTTP Error:', res.status, text);
      return '【系统提示】Gemini 接口响应异常，请稍后再试。';
    }

    const data = await res.json();
    const candidate = data?.candidates?.[0];
    const parts: GeminiPart[] = candidate?.content?.parts;
    const text = parts?.map(p => p.text).join('\n')?.trim();

    if (text) return text;
    return '【系统提示】未能获取到有效回复，请稍后再试。';
  } catch (error) {
    console.error('Gemini Error:', error);
    return '【系统提示】与 Gemini 通讯时出现问题，请稍后再试。';
  }
};
