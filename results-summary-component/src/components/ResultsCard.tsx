interface SummaryScore {
    category: string,
    score: number,
    icon: string,
    color: string,
}

interface ResultsProps {
    scores: SummaryScore[],
    percentile: number,
    vertical?: boolean,
    className?: string,
}

function hslToHSLA(color: string, opacity: number) {
    return color.replace("hsl", "hsla").replace(")", `, ${opacity})`)
}

const ResultsCard: React.FC<ResultsProps> = ({scores, percentile, vertical, className}) => {
    const renderVertical = vertical ?? false;
    const avgScore = scores.reduce((prev, s) => prev + s.score, 0) / scores.length;

    return (
        <div className={`${className} ${renderVertical ? "flex-col" : "flex-row rounded-3xl drop-shadow-xl" } flex gap-7 bg-white dark:bg-dark-gray`}>
            <div className={`${renderVertical ? "rounded-b-3xl basis-2/5" : "rounded-3xl basis-1/2"} flex flex-col gap-4 justify-between p-8 pb-20 items-center bg-gradient-to-b from-light-slate-blue to-light-royal-blue`}>
                <h3 className="text-xl text-light-lavender">
                    Your Result
                </h3>
                <div className={`${renderVertical ? "w-1/2" : "w-[70%]"} flex flex-col aspect-square gap- p-8 items-center justify-center rounded-full bg-gradient-to-b from-violet-blue to-persian-blue`}>
                    <h6 className="text-6xl font-bold">{avgScore.toFixed(0)}</h6>
                    <h3 className="text-slate-400">of 100</h3>
                </div>
                <div className="flex flex-col items-center flex-shrink gap-2">
                    <h4 className="text-[27px] font-bold">Great</h4>
                    <h3 className="text-lg text-light-lavender text-center">You scored higher than {percentile}% of the people who have taken these tests.</h3>
                </div>
            </div>
            <div className={`${renderVertical ? "pt-0 basis-3/5" : "pl-0 basis-1/2"} w-full flex flex-col gap-4 p-7 items-start dark:text-white text-dark-gray-blue`}>
                <h3 className="text-xl font-bold">Summary</h3>
                {scores.map((scoreObj) =>
                    <div key={scoreObj.category} className="flex flex-row w-full min-w-[240px] p-3 gap-4 rounded-lg" style={{backgroundColor: hslToHSLA(scoreObj.color, 0.07)}}>
                        <img src={scoreObj.icon}/>
                        <p className="font-bold" style={{color: scoreObj.color}}>{scoreObj.category}</p>
                        <p className="ml-auto whitespace-pre"><b>{scoreObj.score}</b><span className="text-gray-400">  / 100</span></p>
                    </div>
                )}
                <button className="rounded-full w-full p-3 mt-auto bg-dark-gray-blue text-white text-lg hover:bg-gradient-to-b from-light-slate-blue to-light-royal-blue">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default ResultsCard;
