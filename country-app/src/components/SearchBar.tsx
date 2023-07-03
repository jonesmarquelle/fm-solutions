interface SearchBarProps {
  className?: string;
  doSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, doSearch }) => {
  return (
    <input
      placeholder="Search for a country..."
      onInput={doSearch}
      className={`flex flex-row items-center gap-4 bg-elementPrimary bg-search-icon bg-left bg-no-repeat p-5 pl-20 text-start text-black placeholder-textInput hover:outline-none focus:outline-none dark:bg-elementPrimary-dark dark:bg-search-icon-dark dark:text-textPrimary-dark dark:placeholder-textPrimary-dark ${className}`}
    ></input>
  );
};

export default SearchBar;
