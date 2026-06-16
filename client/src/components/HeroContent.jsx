import { Link } from "react-router-dom"

export default function HeroContent() {
	return (
		<>
			<div className="pt-[6%] pl-[10%] md:max-w-[70%]">
				<div className="font-[integralCF] text-4xl md:text-8xl  pb-2">
					<h1>LOOK GOOD</h1>
					<h1>FEEL BETTER</h1>
					<h1>SHOP.EZ NOW</h1>
				</div>
				<p className="text-gray-600 pb-5">
					Discover curated fashion at Shop.EZ — designed to match your style and enhance your confidence.
				</p>
				<button className="bg-night text-white px-10 py-3 rounded-2xl">
					<Link to="/shop">
						Shop Now
					</Link>
				</button>
			</div>
			<div></div>
		</>
	)
}