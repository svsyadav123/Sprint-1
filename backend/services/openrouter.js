import OpenAI from "openai";

const responseGuidance = {
  Low: "Keep the response concise and focused on the direct answer.",
  Medium: "Give a clear, balanced response with enough explanation to be useful.",
  High: "Give a thorough response with useful detail, examples, and careful reasoning when appropriate.",
};

function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey || apiKey === "YOUR_KEY_HERE") throw new Error("OpenRouter API key is not configured.");
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:5173",
      "X-Title": "ZeroMind",
    },
  });
}

function profileInstructions(ai, modelPreference) {
  const type = ai.type === "Other" && ai.customType ? ai.customType : ai.type;
  return [
    `You are ${ai.name}, a personalized AI created in ZeroMind.`,
    `Type: ${type}.`,
    `Purpose: ${ai.purpose}.`,
    `Personality: ${ai.personality}.`,
    `Behavior: ${ai.behavior || "Be helpful, accurate, and respectful."}.`,
    `Learning topics: ${ai.learningTopics.join(", ")}. These are personalization context only; do not claim to learn autonomously from the internet.`,
    responseGuidance[modelPreference] || responseGuidance.Medium,
  ].join("\n");
}

function historyMessages(messages) {
  return messages.map((message) => ({
    role: message.sender === "ai" ? "assistant" : "user",
    content: message.text || "[Image message]",
  }));
}

function currentContent(content, image) {
  if (!image) return content;
  return [
    ...(content ? [{ type: "text", text: content }] : []),
    { type: "image_url", image_url: { url: image.dataUrl } },
  ];
}

function responseText(result) {
  const content = result.choices?.[0]?.message?.content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) return content.map((part) => part?.text || "").join(" ").trim();
  return "";
}

export async function generateResponse({ ai, messages, content, image, modelPreference }) {
  const client = getClient();
  const result = await client.chat.completions.create({
    model: process.env.OPENROUTER_MODEL || "openrouter/free",
    messages: [
      { role: "system", content: profileInstructions(ai, modelPreference) },
      ...historyMessages(messages),
      { role: "user", content: currentContent(content, image) },
    ],
  });
  const text = responseText(result);
  if (!text) throw new Error("OpenRouter returned an empty response.");
  return text;
}
