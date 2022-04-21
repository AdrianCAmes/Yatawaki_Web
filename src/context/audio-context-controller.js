import { createContext } from "react";
import * as Tone from "tone";

const AudioContext = createContext({
    start: null,
    stop: null,
    increaseVolume: null,
    decreaseVolume: null,
    increasePlaybackRate: null,
    decreasePlaybackRate: null,
    setSongs: null

})

export default AudioContext;

export const AudioContextProvider = (props) => {

    const players = new Tone.Players().toDestination();
    let songs_array = [];

    players.volume.value = -10;
    players.playbackRate = 1;

    const setSongs = (songs) => {
        songs_array = songs;
        for (let song of songs) {
            players.add(song.name, song.url);
        }
        console.log('added songs');

    }

    const start = () => {

        if (players.loaded) {
            for (let song of songs_array) {
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

    const increasePlaybackRate = () => {
        for (let song of songs_array) {
            players.player(song.name).playbackRate = players.player(song.name).playbackRate + 0.5;
        }
    }
    const decreasePlaybackRate = () => {
        for (let song of songs_array) {
            players.player(song.name).playbackRate = players.player(song.name).playbackRate - 0.5;
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
            setSongs: setSongs
        }}>
            {props.children}
        </AudioContext.Provider>
    )
}