import { SyntheticEvent } from "react";

interface Props {
  onSearch: Function;
}

const Search = ({ onSearch }: Props) => {
  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    onSearch(target.search.value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-2 text-sm text-white placeholder:text-white border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-cyan-300 bg-transparent"
          placeholder="Search"
        />
        {/* <button
          type="submit"
          className="text-white absolute right-2.5 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> */}
      </div>
    </form>
  );
};

export default Search;
