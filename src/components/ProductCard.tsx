import { Link } from 'react-router-dom';
import { ProductoCard } from "../models/ProductoCard";

interface ProductCardProps {
    productoCard: ProductoCard;
}

export default function ProductCard({ productoCard }: ProductCardProps) {
    return (
        <Link to={`/product/${productoCard.id}`} className="flex flex-col items-center text-center gap-3 relative group w-full">
            <div className="w-full aspect-[4/5] bg-[#e8e6e1] overflow-hidden relative">
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {productoCard.destacado && (
                        <span className="bg-accent-gold text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase">
                            Destacado
                        </span>
                    )}
                    {productoCard.en_oferta && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase">
                            Oferta
                        </span>
                    )}
                </div>

                <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${productoCard.imagen}')` }}
                />
            </div>

            <h3 className="font-serif text-[#1d1516] text-base group-hover:text-accent-gold transition-colors">
                {productoCard.nombre}
            </h3>

            <div className="flex items-center gap-2">
                {productoCard.en_oferta && productoCard.precio_oferta ? (
                    <>
                        <p className="text-gray-400 text-sm line-through decoration-gray-400">
                            ${productoCard.precio.toFixed(2)}
                        </p>
                        <p className="text-red-600 text-sm font-bold">
                            ${productoCard.precio_oferta.toFixed(2)}
                        </p>
                    </>
                ) : (
                    <p className="text-accent-gold text-sm font-semibold">
                        ${productoCard.precio.toFixed(2)}
                    </p>
                )}
            </div>
        </Link>
    );
}
