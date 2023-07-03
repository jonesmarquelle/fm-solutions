interface SummaryScore {
  category: string;
  score: number;
  icon: string;
  color: string;
}

interface ResultsProps {
  scores: SummaryScore[];
  percentile: number;
  vertical?: boolean;
  className?: string;
}

function hslToHSLA(color: string, opacity: number) {
  return color.replace("hsl", "hsla").replace(")", `, ${opacity})`);
}

const ResultsCard: React.FC<ResultsProps> = ({
  scores,
  percentile,
  vertical,
  className,
}) => {
  const renderVertical = vertical ?? false;
  const avgScore =
    scores.reduce((prev, s) => prev + s.score, 0) / scores.length;

  return (
    <div
      className={`${className} ${
        renderVertical ? "flex-col" : "flex-row rounded-3xl drop-shadow-xl"
      } flex gap-7 bg-white dark:bg-dark-gray`}
    >
      <div
        className={`${
          renderVertical ? "basis-2/5 rounded-b-3xl" : "basis-1/2 rounded-3xl"
        } flex flex-col items-center justify-between gap-4 bg-gradient-to-b from-light-slate-blue to-light-royal-blue p-8 pb-20`}
      >
        <h3 className="text-xl text-light-lavender">Your Result</h3>
        <div
          className={`${
            renderVertical ? "w-1/2" : "w-[70%]"
          } gap- flex aspect-square flex-col items-center justify-center rounded-full bg-gradient-to-b from-violet-blue to-persian-blue p-8`}
        >
          <h6 className="text-6xl font-bold">{avgScore.toFixed(0)}</h6>
          <h3 className="text-slate-400">of 100</h3>
        </div>
        <div className="flex flex-shrink flex-col items-center gap-2">
          <h4 className="text-[27px] font-bold">Great</h4>
          <h3 className="text-center text-lg text-light-lavender">
            You scored higher than {percentile}% of the people who have taken
            these tests.
          </h3>
        </div>
      </div>
      <div
        className={`${
          renderVertical ? "basis-3/5 pt-0" : "basis-1/2 pl-0"
        } flex w-full flex-col items-start gap-4 p-7 text-dark-gray-blue dark:text-white`}
      >
        <h3 className="text-xl font-bold">Summary</h3>
        {scores.map((scoreObj) => (
          <div
            key={scoreObj.category}
            className="flex w-full min-w-[240px] flex-row gap-4 rounded-lg p-3"
            style={{ backgroundColor: hslToHSLA(scoreObj.color, 0.07) }}
          >
            <img src={scoreObj.icon} />
            <p className="font-bold" style={{ color: scoreObj.color }}>
              {scoreObj.category}
            </p>
            <p className="ml-auto whitespace-pre">
              <b>{scoreObj.score}</b>
              <span className="text-gray-400"> / 100</span>
            </p>
          </div>
        ))}
        <button className="mt-auto w-full rounded-full bg-dark-gray-blue from-light-slate-blue to-light-royal-blue p-3 text-lg text-white hover:bg-gradient-to-b">
          Continue
        </button>
      </div>
    </div>
  );
};

export default ResultsCard;
