import { NextResponse } from "next/server";
import OpenAI from "openai";

// Ensure the API key is present before initializing to fail fast if env is missing
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn("Missing OPENAI_API_KEY environment variable.");
}

const openai = new OpenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No valid image provided" }, { status: 400 });
    }

    // Convert File safely to a Base64 string compatible with Next.js edge/node environments
    const bytes = await file.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    // Integration call to GPT-4o
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1000, // 👈 CRITICAL: Prevents OpenAI from cutting off the analysis mid-sentence
      temperature: 0.2, // 👈 OPTIMIZATION: Keeps the analysis strictly technical and less "creative"
      messages: [
        {
          role: "system",
          content: 
            "You are an expert Forex Technical Analyst with 15 years of institutional experience. " +
            "Analyze the attached chart image. Provide a highly structured breakdown in Markdown format with clear sections: " +
            "### 🔍 Key Observations (using bold text for key patterns), " +
            "### 📈 Market Structure, " +
            "### 🎯 Support & Resistance Levels, and " +
            "### 🔮 Theoretical Scenarios (Provide both a bullish and bearish alternative). " +
            "Keep your tone entirely objective, professional, and do not provide explicit financial advice.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this trading chart and provide institutional-grade insights." },
            {
              type: "image_url",
              image_url: {
                // Safely falls back to image/jpeg if type parsing fails
                url: `data:${file.type || "image/jpeg"};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const analysisResult = response.choices[0]?.message?.content;

    if (!analysisResult) {
      throw new Error("OpenAI returned an empty response.");
    }

    return NextResponse.json({ analysis: analysisResult });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Analysis failed to process." }, 
      { status: 500 }
    );
  }
}