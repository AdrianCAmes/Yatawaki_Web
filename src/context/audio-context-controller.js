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
    decreasePitch: null,
    setVolume: null
})

export default AudioContext;

export const AudioContextProvider = (props) => {

    const players = new Tone.Players().toDestination();
    let songsArray = [];
    let pitchShift = new Tone.PitchShift(0).toDestination();

    players.volume.value = 0;
    players.playbackRate = 1;
    let initialBpm = 100;
    let pitchChanged = false;

    const setSongs = (songs) => {
        songsArray = songs;
        for (let song of songs) {
            players.add(song.name, song.track);
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

    const setVolume = (volumePercentage, hand) => {
        let newVolume = 0;
        let position = hand === "right" ? "R" : "L"

        if (volumePercentage === 30) {
            newVolume = -15;
        } else if (volumePercentage === 44) {
            newVolume = -10;
        } else if (volumePercentage === 58) {
            newVolume = -5;
        } else if (volumePercentage === 86) {
            newVolume = 10;
        } else if (volumePercentage == 100) {
            newVolume = 15;
        }

        for (let song of songsArray) {
            if (song.position === position) {
                players.player(song.name).volume.value = newVolume
            }
        }
    }

    const increasePlaybackRate = () => {
        for (let song of songsArray) {
            players.player(song.name).playbackRate = players.player(song.name).playbackRate + 0.5;
        }
    }


    const increasePitch = () => {
        if (!pitchChanged) {
            pitchShift = new Tone.PitchShift(8).toDestination();
            pitchChanged = true;
            players.fan(pitchShift);
        }
    }

    const decreasePitch = () => {
        if (!pitchChanged) {
            pitchChanged = true;
            pitchShift = new Tone.PitchShift(-8).toDestination();
            players.fan(pitchShift);
        }
    }

    const resetPitch = async () => {
        if (pitchChanged) {

            players.disconnect(pitchShift);
            pitchChanged = false;
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
            decreasePitch: decreasePitch,
            setVolume: setVolume
        }}>
            {props.children}
        </AudioContext.Provider>
    )
}