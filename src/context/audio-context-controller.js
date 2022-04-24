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
    setInitialBpm: null
})

export default AudioContext;

export const AudioContextProvider = (props) => {

    const players = new Tone.Players().toDestination();
    let songsArray = [];

    players.volume.value = -10;
    players.playbackRate = 1;
    let initialBpm = 100;

    const setSongs = (songs) => {
        songsArray = songs;
        for (let song of songs) {
            players.add(song.name, song.audio);
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
                players.player(song.name).start();
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
    const pitchShift = new Tone.PitchShift(4).toDestination();
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
        }}>
            {props.children}
        </AudioContext.Provider>
    )
}