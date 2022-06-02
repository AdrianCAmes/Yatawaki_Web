

import { ArrowBackIosRounded, ArrowForwardIosRounded, MusicNote, VolumeOff } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

const SymphonySlider = (props) => {
    const [current, setCurrent] = useState(0);
    const length = props.slides.length;
    const [play, setPlay] = useState(false);

    props.passToParent(current);

    const [audioElement, setAudioElement] = useState(new Audio());


    const playMusic = () => {
        setAudioElement(new Audio(props.slides[current].previewTrack));
        setPlay(true);
    }

    const pause = () => {
        setPlay(false);
    }
    const nextSlide = () => {
        setAudioElement(new Audio(props.slides[current === length - 1 ? 0 : current + 1].previewTrack));
        setCurrent(current === length - 1 ? 0 : current + 1);

    }

    const prevSlide = () => {
        setAudioElement(new Audio(props.slides[current === 0 ? length - 1 : current - 1].previewTrack));
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    useEffect(() => {
        play ? audioElement.play() : audioElement.pause();

        // This is cleanup of the effect
        return () => {
            audioElement.pause();
        }

    }, [play, current]);
    return (
        <section className="slider">
            <ArrowBackIosRounded className="left-arrow" onClick={prevSlide} />
            {props.slides.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>

                        {index === current && (<img className="image hover" onClick={() => { props.selectSlider(current) }} src={slide.icon} alt="ha" />)}
                        {play ?
                            <Avatar className="hover" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                <VolumeOff onClick={() => { pause() }} />
                            </Avatar> : <Avatar className="hover" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                <MusicNote onClick={() => { playMusic() }} />
                            </Avatar>
                        }
                    </div>
                )
            })}
            <ArrowForwardIosRounded className="right-arrow" onClick={nextSlide} />
        </section>
    )


}

export default SymphonySlider;