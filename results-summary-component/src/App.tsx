import "./App.css";
import data from "../data.json";
import ResultsCard from "./components/ResultsCard";
import useMedia from "./hooks/UseMedia";

function App() {
  const isDesktop = useMedia();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ResultsCard
        vertical={!isDesktop}
        scores={data}
        percentile={65}
        className="h-full min-w-fit md:aspect-[710/530] md:h-[510px]"
      />
    </div>
  );
}

export default App;
