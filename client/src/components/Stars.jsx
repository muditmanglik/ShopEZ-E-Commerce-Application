import { Star, StarHalf } from "lucide-react";

function floorToHalfStep(value) {
	const floored = Math.floor(value);
	return value - floored >= 0.5 ? floored + 0.5 : floored;
}


export default function Stars({ rating }) {
	const valueForStars = floorToHalfStep(rating);

	const fullStars = Math.floor(valueForStars);
	const hasHalfStar = valueForStars % 1 === 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="flex gap-2">
			<div className="flex items-center gap-0.5 text-yellow-500">
				{Array.from({ length: fullStars }).map((_, i) => (
					<Star key={`full-${i}`} fill="currentColor" stroke="none" size={18} data-testid="full-star" />
				))}
				{hasHalfStar && <StarHalf key="half" fill="currentColor" stroke="none" size={18} data-testid="half-star" />}

				{Array.from({ length: emptyStars }).map((_, i) => (
					<Star key={`empty-${i}`} className="text-gray-300" size={18} data-testid="empty-star" />
				))}
			</div>
			<div className="text-gray-600">({rating})</div>
		</div>

	);
}