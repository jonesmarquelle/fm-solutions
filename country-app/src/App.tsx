import { useEffect, useState } from 'react';
import DarkModeIcon from './components/DarkModeIcon';
import useDarkMode from './hooks/useDarkMode';
import Home, { Country } from './pages/Home';
import Detail from './pages/Detail';

function App() {
  const {isDarkMode, toggle: toggleDarkMode} = useDarkMode();
  //OK I know this is kind of evil, but my internet is out so i'm cutting corners
  const [selectedCode, setSelectedCode] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [lookup, setLookup] = useState<Map<string, Country>>();

  useEffect(() => {
    if (!selectedCode) return setSelectedCountry(undefined);
    return setSelectedCountry(lookup?.get(selectedCode));
  }, [selectedCode])

  return (
    <>
      <div className={`${isDarkMode ? "dark bg-backgroundPrimary-dark" : "bg-backgroundPrimary"} flex flex-col h-full min-h-screen items-center overflow-clip`}>
        <div className='flex flex-row component h-20 py-4 px-8 sm:px-16 w-full items-center bg-elementPrimary dark:bg-elementPrimary-dark text-textPrimary dark:text-textPrimary-dark'>
          <span className='text-md sm:text-2xl font-bold'>Where in the world?</span>
          <button 
            className='bg-transparent p-0 text-sm flex flex-row items-center whitespace-nowrap ml-auto gap-2'
            onClick={toggleDarkMode}>
              <DarkModeIcon className='h-5 pt-1 stroke-textPrimary dark:stroke-none fill-none dark:fill-textPrimary-dark'/>
              Dark Mode
          </button>
        </div>

        <div className='flex flex-col items-start w-full h-full gap-12 p-6 sm:p-20 overflow-clip mb-auto'>
          {selectedCountry ? <Detail country={selectedCountry} setSelectedCode={setSelectedCode}/> : <Home setSelectedCode={setSelectedCode} setLookup={setLookup}/>}
        </div>
        
      </div>
    </>
  )
}

export default App
