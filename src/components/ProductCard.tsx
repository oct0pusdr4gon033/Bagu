// components/ProductCard.tsx
import { ProductoCard } from "../models/ProductoCard";

interface ProductCardProps {
    productoCard: ProductoCard;
}

export default function ProductCard({ productoCard }: ProductCardProps) {
    return (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="w-full aspect-[4/5] bg-[#e8e6e1] overflow-hidden">
                <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${productoCard.imagen}')` }}
                />
            </div>

            <h3 className="font-serif text-[#1d1516] text-base">
                {productoCard.nombre}
            </h3>

            <p className="text-accent-gold text-sm font-semibold">
                ${productoCard.precio.toFixed(2)}
            </p>
        </div>
    );
}
