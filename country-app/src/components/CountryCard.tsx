import { Country } from "../pages/Home";

export enum Region {
    Africa = "Africa",
    Americas = "Americas",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania"
}

interface CountryCardProps {
    country: Country;
    className?: string;
    onClick?: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, className, onClick }) => {
    const handleClick = () => {
        if (!onClick) return;
        console.log(country);
        onClick(country);
    }
    return (
        <div className={`flex flex-col gap-5 overflow-hidden items-start h-80 w-64 bg-elementPrimary dark:bg-elementPrimary-dark text-textPrimary dark:text-textPrimary-dark ${className}`}
            onClick={handleClick}>
            <img className='h-1/2 min-w-full object-cover' src={country.flagUrl} />
            <p className='font-bold text-md w-full px-4 text-start truncate'>{country.name}</p>
            <div className='flex flex-col items-start px-4 gap-1 text-sm '>
                <p><b>Population: </b>{country.population.toLocaleString('en-US')}</p>
                <p><b>Region: </b>{country.region}</p>
                <p><b>Capital: </b>{country.capital}</p>
            </div>
        </div>
    )
}

export default CountryCard;