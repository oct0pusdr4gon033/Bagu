
import { ProductoCard } from '../../models/ProductoCard'
import RefinedEssentials from '../../sections/landing/RefinedEssentials';
//import Producto.mock.ts
import { Hero } from '../../sections/landing/Hero'
import { ReviewsSection } from '../../sections/landing/ReviewsSection';
import ContactSupportSection from '../../sections/landing/ContactSupportSection';
import OurStorySection from '../../sections/landing/OurHistory';
import Footer from '../../components/layout/Footer';
export default function LandingPage() {

    //A FUTURO TRAER DE UN ARCHIVO MOCK
    const productos: ProductoCard[] = [
        new ProductoCard(1, "Producto 1", 100, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"),
        new ProductoCard(2, "Producto 2", 200, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"),
        new ProductoCard(3, "Producto 3", 300, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"),
    ];
    return (
        <div className="bg-background-dark text-white font-display overflow-x-hidden">

            <Hero />
            <ReviewsSection />
            <RefinedEssentials productoCard={productos} />
            <ContactSupportSection />
            <OurStorySection />
            <Footer />
        </div>
    )
}
