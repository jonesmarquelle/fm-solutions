import { useEffect, useState } from "react";
import DarkModeIcon from "./components/DarkModeIcon";
import useDarkMode from "./hooks/useDarkMode";
import Home, { Country } from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  //OK I know this is kind of evil, but my internet is out so i'm cutting corners
  const [selectedCode, setSelectedCode] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [lookup, setLookup] = useState<Map<string, Country>>();

  useEffect(() => {
    if (!selectedCode) return setSelectedCountry(undefined);
    return setSelectedCountry(lookup?.get(selectedCode));
  }, [selectedCode]);

  return (
    <>
      <div
        className={`${
          isDarkMode ? "dark bg-backgroundPrimary-dark" : "bg-backgroundPrimary"
        } flex h-full min-h-screen flex-col items-center overflow-clip`}
      >
        <div className="component flex h-20 w-full flex-row items-center bg-elementPrimary px-8 py-4 text-textPrimary dark:bg-elementPrimary-dark dark:text-textPrimary-dark sm:px-16">
          <span className="text-md font-bold sm:text-2xl">
            Where in the world?
          </span>
          <button
            className="ml-auto flex flex-row items-center gap-2 whitespace-nowrap bg-transparent p-0 text-sm"
            onClick={toggleDarkMode}
          >
            <DarkModeIcon className="h-5 fill-none stroke-textPrimary pt-1 dark:fill-textPrimary-dark dark:stroke-none" />
            Dark Mode
          </button>
        </div>

        <div className="mb-auto flex h-full w-full flex-col items-start gap-12 overflow-clip p-6 sm:p-20">
          {selectedCountry ? (
            <Detail
              country={selectedCountry}
              setSelectedCode={setSelectedCode}
            />
          ) : (
            <Home setSelectedCode={setSelectedCode} setLookup={setLookup} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
