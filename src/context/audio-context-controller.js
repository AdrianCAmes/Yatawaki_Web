import { createContext } from "react";
import * as Tone from "tone";

const AudioContext = createContext({
    start: null,
    stop: null,
    increaseVolume: null,
    decreaseVolume: null,
    increasePlaybackRate: null,
    decreasePlaybackRate: null,
    setSongs: null,
    setBPM: null,
    setInitialBpm: null,
    increasePitch: null,
    resetPitch: null,
    decreasePitch: null
})

export default AudioContext;

export const AudioContextProvider = (props) => {

    const players = new Tone.Players().toDestination();
    let songsArray = [];
    let pitchShift = new Tone.PitchShift(0).toDestination();


    players.volume.value = -10;
    players.playbackRate = 1;
    let initialBpm = 100;

    const setSongs = (songs) => {
        songsArray = songs;
        for (let song of songs) {
            if (song.name !== 'Piano') {
                players.add(song.name, song.track);
            }
        }
        console.log('added songs');
    }

    const setInitialBpm = (bpm) => {
        initialBpm = bpm;
        console.log(initialBpm, 'initial BPM seted')
    }

    const start = () => {

        if (players.loaded) {
            for (let song of songsArray) {
                if (song.name !== 'Piano') {
                    players.player(song.name).start();
                }

            }
            console.log('started!');

        } else {
            console.log('loading buffer!');
        }


    }

    const stop = () => {
        players.stopAll();
        console.log('stopped');
    }

    const increaseVolume = () => {
        players.volume.value = players.volume.value + 5;
    }

    const decreaseVolume = () => {
        players.volume.value = players.volume.value - 5;
    }

    const increaseVolumeRight = () => {
        for (let song of songsArray) {
            if (song.position === "R") {
                players.player(song.name).volume.value = players.player(song.name).volume.value + 5
            }
        }
    }
    const decreaseVolumeRight = () => {
        for (let song of songsArray) {
            if (song.position === "R") {
                players.player(song.name).volume.value = players.player(song.name).volume.value - 5
            }
        }
    }

    const increaseVolumeLeft = () => {
        for (let song of songsArray) {
            if (song.position === "L") {
                players.player(song.name).volume.value = players.player(song.name).volume.value + 5
            }
        }
    }
    const decreaseVolumeLeft = () => {
        for (let song of songsArray) {
            if (song.position === "L") {
                players.player(song.name).volume.value = players.player(song.name).volume.value - 5
            }
        }
    }

    const increasePlaybackRate = () => {
        for (let song of songsArray) {
            players.player(song.name).playbackRate = players.player(song.name).playbackRate + 0.5;
        }
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    // const increasePitch = async () => {
    //     let maxPitch = 8;
    //     let currentPitch = 0;


    //     while (currentPitch !== maxPitch) {
    //         pitchShift.disconnect().toDestination();
    //         players.fan(pitchShift);
    //         pitchShift = new Tone.PitchShift(currentPitch + 1).toDestination();

    //         await delay(1000).then(() => {
    //             players.fan(pitchShift);
    //             // for (let song of songsArray) {
    //             //     players.player(song.name).fan(pitchShift);
    //             // }
    //         });
    //         currentPitch++;
    //     }
    // }

    const increasePitch = () => {
        pitchShift = new Tone.PitchShift(8).toDestination();
        players.fan(pitchShift);
    }

    const decreasePitch = () => {
        pitchShift = new Tone.PitchShift(-8).toDestination();
        players.fan(pitchShift);
    }

    const resetPitch = () => {
        players.disconnect(pitchShift);
    }

    const decreasePlaybackRate = () => {
        for (let song of songsArray) {
            players.player(song.name).playbackRate = players.player(song.name).playbackRate - 0.5;
        }
    }

    const setBPM = (bpm) => {
        let newPlaybackRate = bpm / initialBpm;
        console.log('newPlaybackRate: ' + newPlaybackRate.toString())
        for (let song of songsArray) {
            players.player(song.name).playbackRate = newPlaybackRate;
        }
    }


    //Agregar filtros
    const filter = new Tone.Filter("E5").toDestination();
    const filters = () => {
        //agregar filtros
        players.fan(pitchShift);
    }


    return (
        <AudioContext.Provider value={{
            start: start,
            stop: stop,
            increaseVolume: increaseVolume,
            decreaseVolume: decreaseVolume,
            increasePlaybackRate: increasePlaybackRate,
            decreasePlaybackRate: decreasePlaybackRate,
            setSongs: setSongs,
            setBPM: setBPM,
            setInitialBpm: setInitialBpm,
            increasePitch: increasePitch,
            resetPitch: resetPitch,
            decreasePitch: decreasePitch
        }}>
            {props.children}
        </AudioContext.Provider>
    )
}