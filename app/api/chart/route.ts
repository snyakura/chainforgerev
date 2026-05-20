import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Read the incoming form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No image file received" }, { status: 400 });
    }

    // Simulate 2 seconds of artificial AI engine calculation lag
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockAnalysis = `### 🔍 Key Observations
- **Strong Bearish Engulfing Candlestick** identified at the top of the recent structure.
- Price is currently reacting aggressively to a major overhead supply zone.

### 📈 Market Structure
- **Higher-Timeframe Trend:** Bearish. The market is making lower highs and lower lows on the 4H perspective.

### 🎯 Support & Resistance Levels
- 🟥 **Major Resistance:** 1.0920
- 🟩 **Immediate Support:** 1.0750

### 🔮 Theoretical Scenarios
- **📉 Bearish Scenario (Higher Probability):** Continued downside momentum toward the 1.0750 support level.
- **📈 Bullish Scenario (Lower Probability):** Minor corrective retracement back up to 1.0860 before the next leg down.`;

    return NextResponse.json({ analysis: mockAnalysis });

  } catch (error: any) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "Internal execution crash" }, { status: 500 });
  }
}