import { Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import * as Tone from "tone";
import chopin from "../assets/songs/Chopin - Nocturne op.9 No.2.mp3"



const Prueba = () => {

    const buffer = new Tone.Buffer(chopin);
    const player = new Tone.Player(buffer).toDestination();
    player.volume.value = -10;

    //velocidad
    player.playbackRate = 1;


    //verificar si player.state == "stoped" para verficiar si la cancion ha terminado

    //Agregar filtros
    const pitchShift = new Tone.PitchShift(4).toDestination();
    const filter = new Tone.Filter("E5").toDestination();

    const start = () => {
        player.start();
        console.log(player.state);

    }
    const stop = () => {
        //player.stop("+0.5"); // stops the source 0.5 seconds from now
        player.stop(); // stops the source 0.5 seconds from now
        console.log(player.state);
    }

    const aumentarVolumen = () => {
        player.volume.value = player.volume.value + 5;
    }
    const bajarVolumen = () => {
        player.volume.value = player.volume.value - 5;
        console.log(player.volume.value);

    }
    const aumentarVelocidad = () => {
        player.playbackRate = player.playbackRate + 0.5;

    }
    const bajarVelocidad = () => {
        player.playbackRate = player.playbackRate - 0.5;

    }
    const filters = () => {
        //agregar filtros
        player.fan(pitchShift);
    }

    const checkTime = () => {
        console.log(buffer.loaded);
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
                <Button variant="contained" onClick={() => { filters() }}>
                    filters
                </Button>
                <Button variant="contained" onClick={() => { checkTime() }}>
                    a
                </Button>


            </Paper>
        </React.Fragment>
    )


}

export default Prueba;