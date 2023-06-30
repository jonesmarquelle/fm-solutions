import { Country } from './Home';

interface DetailProps {
    className?: string,
    country: Country,
    setSelectedCode: (country?: string) => void,
}

const Detail: React.FC<DetailProps> = ({className, country, setSelectedCode}) => {
    return (
        <>
            <div className={`flex flex-col w-full h-full gap-6 lg:gap-14 dark:text-textPrimary-dark text-textPrimary overflow-y-scroll lg:overflow-y-auto ${className}`}>
                <button 
                className='relative interactive-component rounded-sm flex flex-row mr-auto box-border w-24 h-8 py-2 pl-12  text-xs items-center dark:bg-elementPrimary-dark bg-elementPrimary'
                onClick={() => setSelectedCode(undefined)}>
                    <span className='absolute -top-1 left-4 text-3xl h-6 text-start'>←</span> Back
                </button>
                <div className='flex flex-col lg:flex-row items-center lg:gap-24'>
                    <img className='component w-full lg:w-[43%] object-contain h-fit' src={country.flagUrl}/>
                    <div className='flex flex-col w-full text-sm text-start gap-6 py-12'>
                        <h3 className='text-lg font-bold text-start'>{country.name}</h3>
                        <div className='flex flex-col lg:flex-row w-full gap-8'>
                            <div className='flex flex-col gap-2 lg:w-1/2 items-start'>
                                <p><b>Native Name: </b>{country.nativeName}</p>
                                <p><b>Population: </b>{country.population}</p>
                                <p><b>Region: </b>{country.region}</p>
                                <p><b>Sub Region: </b>{country.subregion}</p>
                                <p><b>Capital: </b>{country.capital}</p>
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <p><b>Top Level Domain: </b>{country.tld}</p>
                                <p><b>Currencies: </b>{country.currencies?.join(", ") ?? ""}</p>
                                <p><b>Languages: </b>{country.languages?.join(", ") ?? ""}</p>
                            </div>
                        </div>
                        
                        {country.borderCountries ? (
                            <div className='flex flex-col lg:flex-row gap-4 items-start'>
                                <h4 className='w-36 text-md font-bold text-start'>Border Countries:</h4>
                                <div className='flex flex-row flex-wrap gap-1 items-start'>
                                    {country.borderCountries?.map((c: Country) => 
                                        <button 
                                        className='component rounded-sm w-24 hover:min-w-fit transition-all duration-500 h-7 truncate text-ellipsis py-0 text-xs dark:bg-elementPrimary-dark bg-elementPrimary' 
                                        key={c.alpha3Code}
                                        onClick={() => setSelectedCode(c.alpha3Code)}>
                                            {c.name}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : undefined}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;