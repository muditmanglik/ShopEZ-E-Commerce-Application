import { Search } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SearchBar({ setCategoryURL }) {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {

			e.preventDefault();
			navigate("/shop");

			if (typeof setCategoryURL === "function") {
				if (query.trim() !== "") {
					setCategoryURL(`https://dummyjson.com/products/search?q=${query}`);
				} else {
					setCategoryURL("all");
				}
			}

		}
	};

	return (
		<div className="flex items-center gap-1">
			<Search data-testid="search-icon" />
			<input
				className="bg-blush p-2 rounded-xl w-[300px]"
				placeholder="Search for products"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}
