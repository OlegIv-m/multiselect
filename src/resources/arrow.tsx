export function Arrow(props) {
    const angle = props.angle;
    return (
        <svg transform={"rotate("+angle+")"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.click}>
        <path d="M4.45442 10.8122C4.06285 11.1184 3.49722 11.0492 3.19105 10.6576C2.88488 10.2661 2.9541 9.70044 3.34566 9.39427L7.4423 6.191C7.76791 5.9364 8.22507 5.93631 8.55078 6.19078L12.6507 9.39405C13.0424 9.70007 13.1119 10.2657 12.8059 10.6574C12.4998 11.049 11.9342 11.1185 11.5425 10.8125L7.99691 8.04228L4.45442 10.8122Z" fill="#333333"/>
        </svg>
    )
}