import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CHAINFORGE | The Forex Mafia - Trading Signals & Transactions",
  description:
    "Signal provision and seamless transactions for traders. We assist in funding and withdrawing from Deriv, Weltrade, and other brokers. Join the CHAINFORGE family.",
  keywords: [
    "forex signals",
    "crypto trading",
    "deriv funding",
    "weltrade",
    "trading signals",
    "bitcoin",
    "cryptocurrency",
    "forex mafia",
    "chainforge",
  ],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23F7931A'/><text y='65' x='50' text-anchor='middle' fill='white' font-size='50' font-weight='bold'>₿</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7931A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased min-h-screen bg-background selection:bg-blue-500/30`}>
        <ThemeProvider 
          defaultTheme="dark" 
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
