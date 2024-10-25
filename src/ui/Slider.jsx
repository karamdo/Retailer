// import { useEffect, useRef, useState } from "react";
import Card from "./Card";

// const colors = ["#0088FE", "#00C49F", "#ffbb28"];
// const delay = 2500;

export default function Slider() {
    return (
        <div className="flex gap-3 overflow-x-hidden px-5">
            {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                <div
                    key={i}
                    className="bg-base-200 hover:bg-base-300 h-96 w-64 shrink-0 rounded-lg border border-stone-400 p-4"
                >
                    <Card />
                </div>
            ))}
        </div>
    );
    // const [index, setIndex] = useState(0);
    // const timeoutRef = useRef(null);

    // function resetTimeout() {
    //     if (timeoutRef.current) {
    //         clearTimeout(timeoutRef.current);
    //     }
    // }

    // useEffect(() => {
    //     resetTimeout();
    //     timeoutRef.current = setTimeout(
    //         () =>
    //             setIndex((prevIndex) =>
    //                 prevIndex === colors.length - 1 ? 0 : prevIndex + 1,
    //             ),
    //         delay,
    //     );

    //     return () => {
    //         resetTimeout();
    //     };
    // }, [index]);

    // return (
    //     <div className="slideshow">
    //         <div
    //             className="slideshowSlider"
    //             style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
    //         >
    //             {colors.map((backgroundColor, index) => (
    //                 <div
    //                     className="slide"
    //                     key={index}
    //                     style={{ backgroundColor }}
    //                 ></div>
    //             ))}
    //         </div>

    //         <div className="slideshowDots">
    //             {colors.map((_, idx) => (
    //                 <div
    //                     key={idx}
    //                     className={`slideshowDot${index === idx ? "active" : ""}`}
    //                     onClick={() => {
    //                         setIndex(idx);
    //                     }}
    //                 ></div>
    //             ))}
    //         </div>
    //     </div>
    // );
}
