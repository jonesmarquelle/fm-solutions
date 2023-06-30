import { useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";

const COLOR_SCHEME_QUERY =  '(prefers-color-scheme: dark)'

interface UseDarkModeOutput {
    isDarkMode: boolean,
    toggle: () => void,
    enable: () => void,
    disable: () => void
}

const useDarkMode = (defaultValue?: boolean): UseDarkModeOutput => {
    const isDarkPref = useMediaQuery(COLOR_SCHEME_QUERY);
    const [isDarkMode, setDarkMode] = useState<boolean>(defaultValue ?? isDarkPref ?? false);
    
    useEffect(() => {
        setDarkMode(isDarkPref)
    }, [isDarkPref])

    return {
        isDarkMode,
        toggle: () => setDarkMode(prev => !prev),
        enable: () => setDarkMode(true),
        disable: () => setDarkMode(false),
    };
}

export default useDarkMode;