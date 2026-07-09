import dotenv from "dotenv";
dotenv.config();

import app from "./app";

console.log("Groq Key:", process.env.GROQ_API_KEY ? "loaded" : "undefined");

const PORT = process.env.PORT || 5000;

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env");
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;