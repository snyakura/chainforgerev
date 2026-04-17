import { AppWrapper } from "@/components/app-wrapper";
import { MarketTicker } from "@/components/market-ticker";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Courses } from "@/components/courses";
import { PaymentMethods } from "@/components/payment-methods";
import { LiveMarket } from "@/components/live-market";
import { NewsFeed } from "@/components/news-feed";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import { LiveChat } from "@/components/live-chat";

export default function Home() {
  return (
    <AppWrapper>
      <main className="min-h-screen">
        <MarketTicker />
        <Header />
        <Hero />
        <Courses />
        <PaymentMethods />
        <LiveMarket />
        <NewsFeed />
        <Testimonials />
        <Footer />
        <LiveChat />
      </main>
    </AppWrapper>
  );
}
