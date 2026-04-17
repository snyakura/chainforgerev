import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PaymentMethods } from "@/components/payment-methods";
import { LiveMarket } from "@/components/live-market";
import { NewsFeed } from "@/components/news-feed";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import { LiveChat } from "@/components/live-chat";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PaymentMethods />
      <LiveMarket />
      <NewsFeed />
      <Testimonials />
      <Footer />
      <LiveChat />
    </main>
  );
}
