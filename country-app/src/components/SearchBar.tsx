interface SearchBarProps {
    className?: string
    doSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({className, doSearch}) => {
    return (
        <input 
        placeholder='Search for a country...'
        onInput={doSearch}
        className={`flex flex-row p-5 pl-20 bg-search-icon dark:bg-search-icon-dark bg-no-repeat bg-left items-center text-start hover:outline-none focus:outline-none gap-4 bg-elementPrimary dark:bg-elementPrimary-dark text-black dark:text-textPrimary-dark placeholder-textInput dark:placeholder-textPrimary-dark ${className}`}>
        </input>
    )
}

export default SearchBar;