import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function extractCRMRecords(records: any[]) {

  const prompt = `
You are an AI CRM data extraction engine.

Convert these CSV records into GrowEasy CRM format.

Rules:

Allowed crm_status:
GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

Return ONLY a JSON array. No markdown, no code fences, no explanation.

Fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description


CSV DATA:

${JSON.stringify(records)}
`;

  const response = await client.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: "You extract CRM records accurately. You respond with raw JSON only."
      },
      {
        role: "user",
        content: prompt
      }
    ],

    temperature: 0

  });

  const raw = response.choices[0].message.content || "[]";

  // Llama sometimes wraps output in ```json fences despite instructions — strip before parsing
  const cleaned = raw.replace(/```json|```/g, "").trim();

  return JSON.parse(cleaned);

}