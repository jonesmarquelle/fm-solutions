import React from 'react';
import { useEffect, useState } from 'react'

type SliderProps = {
    ticks: number;
    defaultVal: number;
    onSliderChange: (value: number) => void;
  }

const NumberedSlider: React.FC<SliderProps> = ({ticks, defaultVal, onSliderChange}) => {
    const [sliderValue, setSliderValue] = useState<number>(defaultVal);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number.parseInt(e.currentTarget.value);
        setSliderValue(newVal);
    }

    useEffect(() => {
        onSliderChange(sliderValue);
    }, [sliderValue])

    return (
        <div className='slider-div'>
        <datalist id='ticks'>
            {Array(ticks).fill(0).map((_, i) => 
            <option key={i} value={i} label={(i + 1).toString()} />
            )}
        </datalist>
        <input 
        className="slider-input" 
        type="range"
        defaultValue={sliderValue}
        min={0} 
        max={2} 
        list="ticks"
        onChange={handleSliderChange}/>
        </div>
    )
}

export default NumberedSlider;