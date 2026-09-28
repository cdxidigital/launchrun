import type { BusinessProfile, SetupAnswers } from "./domain";

type Patch = {
  offerSummary?: string;
  positioning?: string;
  guarantee?: string;
  messaging?: string;
  tone?: string;
  pageSections?: { id: string; heading: string; body: string }[];
  post?: { title: string; body: string };
  brief?: string;
  opportunities?: { title: string; detail: string }[];
};

function clip(value: string, max = 500): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function askModel(system: string, user: string): Promise<Patch | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(text) as Patch;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

const SYSTEM =
  "You help a founder write plain English for their own business. Return JSON only. Do not invent customers, revenue, reviews, or results. Do not mention models, tokens, or agents. Keep every string under 400 characters.";

export async function shapeMap(answers: SetupAnswers): Promise<Patch | null> {
  return askModel(
    SYSTEM,
    `Improve this business draft. JSON keys: offerSummary, positioning, guarantee, messaging, tone, opportunities (array of {title, detail}, max 3).
Name: ${clip(answers.businessName, 80)}
Goal: ${clip(answers.goal)}
Sells: ${clip(answers.sell)}
For: ${clip(answers.audience)}
Useful because: ${clip(answers.useful)}
Today: ${clip(answers.findBuy)}
Already have: ${clip(answers.have)}`,
  );
}

export async function rewriteOffer(profile: BusinessProfile, name: string): Promise<Patch | null> {
  return askModel(
    SYSTEM,
    `Rewrite the offer in plainer words. JSON keys: offerSummary, positioning, messaging, tone.
Business: ${clip(name, 80)}
Current summary: ${clip(profile.offer.summary)}
Positioning: ${clip(profile.offer.positioning)}
Audience: ${clip(profile.audienceProfile.summary)}`,
  );
}

export async function rewriteSections(
  name: string,
  sections: { id: string; heading: string; body: string }[],
): Promise<Patch | null> {
  return askModel(
    SYSTEM,
    `Rewrite these page sections. Keep the same ids. JSON key pageSections: array of {id, heading, body}. Do not add claims that are not already implied.
Business: ${clip(name, 80)}
Sections: ${clip(JSON.stringify(sections), 2000)}`,
  );
}

export async function draftPost(topic: string, voice: string, name: string): Promise<Patch | null> {
  return askModel(
    SYSTEM,
    `Draft one short social post. JSON key post: {title, body}. No hashtag stuffing. No invented results.
Business: ${clip(name, 80)}
Voice: ${clip(voice, 200)}
Topic: ${clip(topic, 300)}`,
  );
}

export async function writeBrief(facts: string): Promise<Patch | null> {
  return askModel(
    SYSTEM,
    `Write a weekly business brief in 4 short sentences. JSON key brief (string). Use only these facts: ${clip(facts, 1200)}`,
  );
}
