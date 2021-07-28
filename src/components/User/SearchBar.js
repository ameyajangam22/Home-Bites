import { useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
const SearchBar = (props) => {
	const history = useHistory();
	const handleChange = (e) => {
		const { name, value } = e.target;
		props.onChange(value);
	};
	return (
		<div>
			<div class="bg-white flex items-center rounded-md border-2 border-gray-200">
				<input
					class="rounded-l-md w-full px-6 text-gray-700 leading-tight 
                    focus:outline-none"
					id="search"
					type="text"
					placeholder="Search"
					onChange={handleChange}
				></input>
				<div class="p-4">
					<button
						onClick={() => {
							props.handleClick(true);
						}}
						class="bg-black text-white rounded-md p-2 hover:bg-gray-700
                    transition ease-in-out duration-200 focus:outline-none w-14 h-14 flex items-center justify-center"
					>
						<SearchIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
