import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import chopin from "../assets/songs/Chopin - Nocturne op.9 No.2.mp3"
import mozart from "../assets/songs/mozart.mp3"
import AudioController from "../context/audio-context-controller";



const Prueba = () => {

    const audioController = React.useContext(AudioController);
    const [started, setStarted] = useState(false);

    const start = async () => {
        await Tone.start();
        audioController.start();
        setStarted(true);
    }

    const stop = () => {
        audioController.stop();
        setStarted(false);
    }

    const aumentarVolumen = () => {
        audioController.increaseVolume();
    }
    const bajarVolumen = () => {
        audioController.decreaseVolume();
    }
    const aumentarVelocidad = () => {
        audioController.increasePlaybackRate();
    }
    const bajarVelocidad = () => {
        audioController.decreasePlaybackRate();
    }

    const setSongs = () => {
        let songs = [{ "name": "chopin", "url": chopin }, { "name": "mozart", "url": mozart }]
        audioController.setSongs(songs);
    }




    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }}>
                <Button variant="contained" onClick={() => { start() }}>
                    play
                </Button>
                <Button variant="contained" onClick={() => { stop() }}>
                    stop
                </Button>
                <Button variant="contained" onClick={() => { aumentarVolumen() }}>
                    +
                </Button>
                <Button variant="contained" onClick={() => { bajarVolumen() }}>
                    -
                </Button>
                <Button variant="contained" onClick={() => { aumentarVelocidad() }}>
                    subir velocidad
                </Button>
                <Button variant="contained" onClick={() => { bajarVelocidad() }}>
                    bajar velocidad
                </Button>
                <Button variant="contained" onClick={() => { setSongs() }}>
                    canciones
                </Button>


                {started ? 'activo' : 'pausa'}


            </Paper>
        </React.Fragment>
    )


}

export default Prueba;