

import { ArrowBackIosRounded, ArrowForwardIosRounded, MusicNote, VolumeOff } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import chopin from "../../assets/songs/Chopin - Nocturne op.9 No.2.mp3";
import mozart from "../../assets/songs/mozart.mp3";

let audios = [chopin, mozart];

const SymphonySlider = (props) => {
    const [current, setCurrent] = useState(0);
    const length = props.slides.length;
    const [play, setPlay] = useState(false);

    props.passToParent(current);

    const [audioElement, setAudioElement] = useState(new Audio(mozart));



    const playMusic = () => {
        setPlay(true);
    }

    const pause = () => {
        setPlay(false);
    }
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setAudioElement(new Audio(audios[current % 2]));

    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setAudioElement(new Audio(audios[current % 2]));
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

                        {index === current && (<img className="image hover" onClick={() => { props.selectSlider(current) }} src={`data:image/jpeg;base64,${slide.icon}`} alt="ha" />)}
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