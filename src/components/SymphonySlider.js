

import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import React, { useState } from "react";


const SymphonySlider = (props) => {
    const [current, setCurrent] = useState(0);
    const length = props.slides.length;

    props.passToParent(current);



    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length-1 : current - 1);
    }

    if (!Array.isArray(props.slides) || props.slides.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <ArrowBackIosRounded className="left-arrow" onClick={prevSlide}/>
            {props.slides.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img className="image" onClick={() => {props.selectSlider(current)}} src={`data:image/jpeg;base64,${slide.icon}`} alt="ha" />)}
                        
                    </div>
                )
            })}
            <ArrowForwardIosRounded className="right-arrow" onClick={nextSlide}/>
        </section>
    )


}

export default SymphonySlider;