import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
	rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="flex gap-1">
			{Array(fullStars)
				.fill(0)
				.map((_, index) => (
					<Star key={`full-${index}`} size={16} fill="black" />
				))}

			{hasHalfStar && (
				<div className="relative">
					<Star size={16} fill="none" stroke="black" />
					<div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
						<Star size={16} fill="black" />
					</div>
				</div>
			)}

			{Array(emptyStars)
				.fill(0)
				.map((_, index) => (
					<Star key={`empty-${index}`} size={16} fill="none" stroke="black" />
				))}
		</div>
	);
}
