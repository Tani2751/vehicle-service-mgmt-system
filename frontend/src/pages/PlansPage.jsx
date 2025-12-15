import Header from "../components/Header";
import FAQSection from "../components/HomePage_Section/FAQSection";
import { FooterSection } from "../components/HomePage_Section/FooterSection";
import TestimonialSection from "../components/HomePage_Section/TestimonialSection";
import { ComparsionSection } from "../components/PlansPage_Sections/ComparsionSection";
import { PricingSection } from "../components/PlansPage_Sections/PricingSection";


export function PlansPage() {
    return (
        <main>
            <Header />
            <PricingSection />
            <ComparsionSection />
            <TestimonialSection />
            <FAQSection />
            <FooterSection />
        </main>
    )
}