import { useEffect, useState } from "react";
import countriesData from "../data.json" assert { type: "json" };
import Select from "react-select";
import CountryCard, { Region } from "../components/CountryCard";
import SearchBar from "../components/SearchBar";

export interface Country {
  name: string;
  alpha3Code: string;

  flagUrl: string;
  population: number;
  region: Region;
  capital: string;

  subregion: string;
  nativeName: string;
  tld: string;
  currencies: string[];
  languages: string[];

  borders: string[];
  borderCountries?: Country[];
}

const buildLookup = (countries: Country[]): Map<string, Country> => {
  return new Map(countries.map((c) => [c.alpha3Code, c]));
};

const buildLinkedCountries = (
  countries: Country[],
  lookup: Map<string, Country>
): Country[] => {
  return countries.map((c) => {
    return {
      ...c,
      borderCountries: c.borders?.reduce(
        (prev: Country[], c_code: string): Country[] => {
          const findCountry = lookup.get(c_code);
          if (!findCountry) return prev;
          return [...prev, findCountry];
        },
        []
      ),
    };
  });
};

const spoofCountries = (): Country[] => {
  const countriesResult = countriesData.map((country: any): Country => {
    return {
      name: country.name,
      alpha3Code: country.alpha3Code,
      flagUrl: "./images/chopper.jpg",
      population: country.population.toLocaleString(),
      region: country.region as Region,
      capital: country.capital,
      subregion: country.subregion,
      nativeName: country.nativeName,
      tld: country.topLevelDomain,
      currencies: country.currencies?.map(
        (c: { name: string; symbol: string }) => `${c.name} (${c.symbol})`
      ),
      languages: country.languages?.map((l: { name: string }) => l.name),
      borders: country.borders,
    };
  });

  return buildLinkedCountries(countriesResult, buildLookup(countriesResult));
};

const fetchCountries = async (): Promise<Country[]> => {
  return fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((countriesRes) =>
      countriesRes.map((country: any): Country => {
        console.log(country);
        return {
          name: country.name.common,
          alpha3Code: country.cca3,
          flagUrl: country.flags.png,
          population: country.population.toLocaleString(),
          region: country.region as Region,
          capital: country.capital,
          subregion: country.subregion,
          nativeName: country.name.nativeName?.common,
          tld: country.tld?.[0],
          currencies: Object.keys(country.currencies ?? []).map(
            (key: string) => {
              const { name, symbol } = country.currencies[key];
              return `${name}(${symbol})`;
            }
          ),
          languages: Object.values(country.languages ?? []),
          borders: country.borders,
        };
      })
    )
    .then((cList: Country[]) => buildLinkedCountries(cList, buildLookup(cList)))
    .catch((e) => {
      console.log(e);
      return spoofCountries();
    });
};

function Home({
  setSelectedCode,
  setLookup,
}: {
  setSelectedCode: (country: string) => void;
  setLookup: (map: Map<string, Country>) => void;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    const updateCountries = async () => {
      const newCountries = await fetchCountries(); //import.meta.env.DEV ? spoofCountries() : await fetchCountries();
      setCountries(newCountries);
    };
    updateCountries();
  }, []);

  useEffect(() => {
    setLookup(buildLookup(countries));
  }, [countries]);

  const [region, setRegion] = useState<Region>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedCountries, setDisplayedCountries] =
    useState<Country[]>(countries);

  useEffect(() => {
    setDisplayedCountries(
      filterSearch(filterRegion(countries, region), searchQuery)
    );
  }, [region, searchQuery, countries]);

  const filterRegion = (countries: Country[], region?: Region) => {
    if (!region) return countries;
    return countries.filter((country) => country.region === region);
  };

  const filterSearch = (countries: Country[], query?: string) => {
    if (!query) return countries;
    return countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const options = Object.values(Region).map((v) => {
    return { value: v, label: v as string };
  });

  return (
    <>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
        <SearchBar
          className="interactive-component h-16 w-full lg:w-[480px]"
          doSearch={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <Select
          className="interactive-component z-10 mr-auto h-16 w-52 text-start lg:ml-auto lg:mr-0"
          options={options}
          onChange={(nv, _) => setRegion(nv?.value as Region)}
          classNames={{
            placeholder: () => "dark:text-textPrimary-dark text-textPrimary",
            valueContainer: () => "dark:text-textPrimary-dark text-textPrimary",
            singleValue: () => "dark:text-textPrimary-dark text-textPrimary",
            control: () => "dark:bg-elementPrimary-dark bg-elementPrimary",
            menuList: () =>
              "interactive-component dark:bg-elementPrimary-dark bg-elementPrimary",
            option: () =>
              "hover:bg-backgroundPrimary-dark hover:text-white dark:text-textPrimary-dark text-textPrimary",
          }}
          styles={{
            control: (styles) => ({
              ...styles,
              height: "64px",
              padding: "10px",
              borderWidth: "0px",
              boxShadow: "none",
              backgroundColor: "",
              transition: "none",
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: "",
              color: "",
              ":hover": {
                backgroundColor: "",
                color: "",
              },
            }),
            placeholder: (styles) => ({ ...styles, color: "" }),
            singleValue: (styles) => ({ ...styles, color: "" }),
            menu: (styles) => ({ ...styles, backgroundColor: "transparent" }),
            indicatorSeparator: () => ({ hidden: "true" }),
          }}
        />
      </div>

      <div className="mr-auto box-border flex h-full w-fit flex-wrap justify-center gap-20 overflow-y-auto sm:justify-start">
        {displayedCountries.map((country) => (
          <CountryCard
            className="interactive-component transition-shadow duration-500 hover:shadow-2xl"
            key={country.name}
            country={country}
            onClick={(c) => setSelectedCode(c.alpha3Code)}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
