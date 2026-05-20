import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Ensure we are receiving multipart form data
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided in the request." },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockAnalysis = `### 🔍 **Key Observations**
- **Bearish Rejection** noted at the 1.0950 psychological resistance level.
- **RSI Divergence** confirmed on the 4H timeframe, suggesting exhaustive buying pressure.
- Large sell-side liquidity gaps identified below the current price action.

### 📈 Market Structure
Price remains within a defined **Bearish Channel**. Market structure shift (MSS) confirmed following the break of the minor internal swing low at 1.0880.

### 🎯 Support & Resistance Levels
- **Resistance 1:** 1.0950 (Institutional Supply)
- **Support 1:** 1.0820 (Previous Demand Zone)
- **Support 2:** 1.0750 (Target Fibonacci Extension)

### 🔮 Theoretical Scenarios
1. **Primary (Bearish):** A clean retest of 1.0880 followed by a drop toward 1.0820.
2. **Secondary (Consolidation):** Price ranges between 1.0850 and 1.0920 before the next directional expansion.`;

    return NextResponse.json(
      { analysis: mockAnalysis },
      { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}