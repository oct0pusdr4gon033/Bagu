
import RefinedEssentials from '../../sections/landing/RefinedEssentials';
//import Producto.mock.ts
import { Hero } from '../../sections/landing/Hero'
import { ReviewsSection } from '../../sections/landing/ReviewsSection';
import ContactSupportSection from '../../sections/landing/ContactSupportSection';
import OurStorySection from '../../sections/landing/OurHistory';
import Footer from '../../components/layout/Footer';

export default function LandingPage() {
    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden">
            <Hero />
            <ReviewsSection />
            <RefinedEssentials />
            <ContactSupportSection />
            <OurStorySection />
            <Footer />
        </div>
    )
}
