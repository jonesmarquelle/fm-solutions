import { Country } from "./Home";

interface DetailProps {
  className?: string;
  country: Country;
  setSelectedCode: (country?: string) => void;
}

const Detail: React.FC<DetailProps> = ({
  className,
  country,
  setSelectedCode,
}) => {
  return (
    <>
      <div
        className={`flex h-full w-full flex-col gap-6 overflow-y-scroll text-textPrimary dark:text-textPrimary-dark lg:gap-14 lg:overflow-y-auto ${className}`}
      >
        <button
          className="interactive-component relative mr-auto box-border flex h-8 w-24 flex-row items-center rounded-sm bg-elementPrimary  py-2 pl-12 text-xs dark:bg-elementPrimary-dark"
          onClick={() => setSelectedCode(undefined)}
        >
          <span className="absolute -top-1 left-4 h-6 text-start text-3xl">
            ←
          </span>{" "}
          Back
        </button>
        <div className="flex flex-col items-center lg:flex-row lg:gap-24">
          <img
            className="component h-fit w-full object-contain lg:w-[43%]"
            src={country.flagUrl}
          />
          <div className="flex w-full flex-col gap-6 py-12 text-start text-sm">
            <h3 className="text-start text-lg font-bold">{country.name}</h3>
            <div className="flex w-full flex-col gap-8 lg:flex-row">
              <div className="flex flex-col items-start gap-2 lg:w-1/2">
                <p>
                  <b>Native Name: </b>
                  {country.nativeName}
                </p>
                <p>
                  <b>Population: </b>
                  {country.population}
                </p>
                <p>
                  <b>Region: </b>
                  {country.region}
                </p>
                <p>
                  <b>Sub Region: </b>
                  {country.subregion}
                </p>
                <p>
                  <b>Capital: </b>
                  {country.capital}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p>
                  <b>Top Level Domain: </b>
                  {country.tld}
                </p>
                <p>
                  <b>Currencies: </b>
                  {country.currencies?.join(", ") ?? ""}
                </p>
                <p>
                  <b>Languages: </b>
                  {country.languages?.join(", ") ?? ""}
                </p>
              </div>
            </div>

            {country.borderCountries ? (
              <div className="flex flex-col items-start gap-4 lg:flex-row">
                <h4 className="text-md w-36 text-start font-bold">
                  Border Countries:
                </h4>
                <div className="flex flex-row flex-wrap items-start gap-1">
                  {country.borderCountries?.map((c: Country) => (
                    <button
                      className="component h-7 w-24 truncate text-ellipsis rounded-sm bg-elementPrimary py-0 text-xs transition-all duration-500 hover:min-w-fit dark:bg-elementPrimary-dark"
                      key={c.alpha3Code}
                      onClick={() => setSelectedCode(c.alpha3Code)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
