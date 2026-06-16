import { Link } from "react-router-dom";

export default function NavLink({ name }) {
	let to;

	if (name === "Home") to = "/";
	else if (name === "Shop") to = "/shop";
	else to = null;

	if (!to) {
		return (
			<span className="p-3 font-medium text-[17px] text-gray-400 cursor-not-allowed">
				{name}
			</span>
		);
	}

	return (
		<Link to={to} className="p-3 font-medium text-[17px] hover:text-blue-500 transition">
			{name}
		</Link>
	);
}
