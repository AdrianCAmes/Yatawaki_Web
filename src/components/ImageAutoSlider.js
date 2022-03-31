import React from "react";

import slider1 from "../assets/slider-1.png";
import slider2 from "../assets/slider-2.png";
import slider3 from "../assets/slider-3.png";

const images = [slider1, slider2, slider3];

export default function ImageAutoSlider() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === images.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 2000);
        return () => {
            clearInterval(interval);
        };
    }, [currentIndex])

    return (
        <div>
            <img style={{ maxHeight: '500px', maxWidth: '500px' }} src={images[currentIndex]} />
        </div>
    )
}


