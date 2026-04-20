export async function GET() {
  try {
    const res = await fetch(
      "https://api.tradingeconomics.com/calendar?c=guest:guest&f=json",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    // Clean and standardize the data for the frontend
    const events = data.map((e: any) => ({
      title: e.Event,
      country: e.Country,
      date: new Date(e.Date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: new Date(e.Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      impact: e.Importance >= 3 ? "High" : e.Importance === 2 ? "Medium" : "Low",
      actual: e.Actual,
      forecast: e.Forecast,
      previous: e.Previous,
      currency: e.Currency,
    }));

    return Response.json(events);
  } catch (error) {
    console.error("Calendar API error:", error);
    return Response.json({ error: "Failed to fetch calendar" }, { status: 500 });
  }
}