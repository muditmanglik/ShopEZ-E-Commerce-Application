export default function ProductSkeleton() {
	return (
		<div className="bg-blush rounded-2xl shadow-lg animate-pulse">
			<div data-testid="skeleton-image" className="w-[256px] h-[256px]" />
			<div className="p-4 flex flex-col gap-2">
				<div data-testid="skeleton-bar" className="h-5 bg-gray-300 rounded w-3/4" />
				<div data-testid="skeleton-bar" className="h-4 bg-gray-300 rounded w-1/2" />
				<div data-testid="skeleton-bar" className="h-10 bg-gray-300 rounded w-full mt-2" />
			</div>
		</div>
	);
}
