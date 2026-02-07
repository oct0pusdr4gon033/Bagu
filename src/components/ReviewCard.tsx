interface ReviewCardProps {
    name: string
    comment: string
    rating: number
}

export default function ReviewCard({ name, comment, rating }: ReviewCardProps) {
    return (
        <div className="border rounded-lg p-5 bg-white">

            {/* Estrellas */}
            <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={`material-symbols-outlined text-base ${i < rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    >
                        star
                    </span>
                ))}
            </div>

            {/* Comentario */}
            <p className="text-sm text-gray-600 mb-3">
                {comment}
            </p>

            {/* Nombre */}
            <span className="text-sm font-medium text-gray-800">
                {name}
            </span>
        </div>
    )
}