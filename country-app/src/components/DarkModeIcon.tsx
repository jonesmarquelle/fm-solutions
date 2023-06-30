interface DarkModeIconProps {
    className?: string
}
const DarkModeIcon: React.FC<DarkModeIconProps> = ({className}) => {
    // Created by Three Six Five from the Noun Project (https://thenounproject.com/icon/moon-1813728/)

    return (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" className={className} strokeWidth="8">
            <g transform="translate(0,-952.36218)">
                <path d="M 35.5238,964.36218 C 20.5848,969.89848 12,984.28628 12,1001.1511 c 0,21.6556 17.5554,39.2111 39.211,39.2111 16.8648,0 31.2527,-8.5848 36.789,-23.5238 -4.466,1.7959 -9.3393,2.7143 -14.4477,2.7143 -21.4039,0 -40.7428,-19.3389 -40.7428,-40.74282 0,-5.1085 0.9183,-9.9818 2.7143,-14.4477 z" visibility="visible" display="inline" overflow="visible"/>
            </g>
        </svg>
    )
}

export default DarkModeIcon;