//#region node_modules/.nitro/vite/services/ssr/assets/ai.server-CRpVIJtj.js
function clip(value, max = 500) {
	return value.replace(/\s+/g, " ").trim().slice(0, max);
}
async function askModel(system, user) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return null;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .3,
				max_tokens: 800,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
		if (!res.ok) return null;
		const text = (await res.json()).choices?.[0]?.message?.content ?? "";
		const parsed = JSON.parse(text);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null;
	}
}
var SYSTEM = "You help a founder write plain English for their own business. Return JSON only. Do not invent customers, revenue, reviews, or results. Do not mention models, tokens, or agents. Keep every string under 400 characters.";
async function shapeMap(answers) {
	return askModel(SYSTEM, `Improve this business draft. JSON keys: offerSummary, positioning, guarantee, messaging, tone, opportunities (array of {title, detail}, max 3).
Name: ${clip(answers.businessName, 80)}
Goal: ${clip(answers.goal)}
Sells: ${clip(answers.sell)}
For: ${clip(answers.audience)}
Useful because: ${clip(answers.useful)}
Today: ${clip(answers.findBuy)}
Already have: ${clip(answers.have)}`);
}
async function rewriteOffer(profile, name) {
	return askModel(SYSTEM, `Rewrite the offer in plainer words. JSON keys: offerSummary, positioning, messaging, tone.
Business: ${clip(name, 80)}
Current summary: ${clip(profile.offer.summary)}
Positioning: ${clip(profile.offer.positioning)}
Audience: ${clip(profile.audienceProfile.summary)}`);
}
async function rewriteSections(name, sections) {
	return askModel(SYSTEM, `Rewrite these page sections. Keep the same ids. JSON key pageSections: array of {id, heading, body}. Do not add claims that are not already implied.
Business: ${clip(name, 80)}
Sections: ${clip(JSON.stringify(sections), 2e3)}`);
}
async function draftPost(topic, voice, name) {
	return askModel(SYSTEM, `Draft one short social post. JSON key post: {title, body}. No hashtag stuffing. No invented results.
Business: ${clip(name, 80)}
Voice: ${clip(voice, 200)}
Topic: ${clip(topic, 300)}`);
}
async function writeBrief(facts) {
	return askModel(SYSTEM, `Write a weekly business brief in 4 short sentences. JSON key brief (string). Use only these facts: ${clip(facts, 1200)}`);
}
//#endregion
export { draftPost, rewriteOffer, rewriteSections, shapeMap, writeBrief };
