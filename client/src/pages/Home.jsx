import SEOHead from '../seo/SEOHead.jsx';
import { CONFIG } from '../config.js';
import { homeMeta } from '../data/seoPages.js';
import { commonFaqs, homeFaqIds } from '../data/faqs.js';
import { localBusinessSchema, webSiteSchema, faqSchema } from '../seo/schema.js';
import Hero from '../components/Hero.jsx';
import QuickBooking from '../components/QuickBooking.jsx';
import ServiceSection from '../components/ServiceSection.jsx';
import FleetSection from '../components/FleetSection.jsx';
import RouteSection from '../components/RouteSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import TravelSection from '../components/TravelSection.jsx';
import ReviewSection from '../components/ReviewSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import FAQSection from '../components/FAQSection.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import MapSection from '../components/MapSection.jsx';

export default function Home() {
  const faqs = homeFaqIds.map((i) => commonFaqs[i]);
  return (
    <>
      <SEOHead {...homeMeta} path="/" schemas={[localBusinessSchema(CONFIG.siteUrl), webSiteSchema(CONFIG.siteUrl), faqSchema(faqs)]} />
      <Hero />
      <QuickBooking />
      <ServiceSection />
      <FleetSection />
      <RouteSection />
      <WhyChooseUs />
      <TravelSection />
      <ReviewSection />
      <AboutSection />
      <FAQSection faqs={faqs} />
      <ContactCTA />
      <MapSection />
    </>
  );
}
