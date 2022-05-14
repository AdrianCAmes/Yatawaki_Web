import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConcertApis from "../apis/concert-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import GameResults from "./components/GameResults";
import NewUnlockable from "./components/NewUnlockable";


const GameResume = () => {

    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);

    const [showFinal, setShowFinal] = React.useState(false);
    const [unlockables, setUnlockables] = React.useState([]);
    const [currentUnlockable, setCurrentUnlockable] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [rank, setRank] = React.useState(null);
    const [showRank, setShowRank] = React.useState(false);
    const [resultsFinal, setResultsFinal] = React.useState(null);
    const navigate = useNavigate()
    const { state } = useLocation();


    const nextItem = () => {
        if (currentIndex < unlockables.length) {
            setCurrentIndex(currentIndex + 1);
            setCurrentUnlockable(unlockables[currentIndex]);
        } else {
            if (rank && showRank) {
                setCurrentUnlockable(rank);
                setShowRank(false)
            } else {
                setShowFinal(true);
            }
        }
    }

    const toMenu = () => {
        navigate('/menu')
    }

    const concertComplete = async () => {

        const aresults = {
            "idConcert": state.idConcert,
            "gainedExperience": (state.points * state.gesturesCompleted) / 20,
            "points": state.points > 0 ? state.point : 0,
            "accuracyRate": state.accuracyRate,
            "gesturesCompleted": state.gesturesCompleted,
            "gainedCoins": (state.points * state.gesturesCompleted) / 150,
            "symphonyName": state.symphonyName
        }

        // const aresults = {
        //     "idConcert": 1,
        //     "gainedExperience": 324,
        //     "points": 234,
        //     "accuracyRate": 234,
        //     "gesturesCompleted": 23,
        //     "gainedCoins": 2341,
        //     "symphonyName": "Symphony No9"
        // }

        setResultsFinal(aresults);

        ConcertApis.concertComplete(aresults.idConcert, aresults.points, aresults.accuracyRate, aresults.gesturesCompleted, aresults.gainedExperience, aresults.gainedCoins)
            .then(response => {
                console.log(response.data);

                if (!response.data.newRank && !response.data.unlockedObjects) {
                    setShowFinal(true);
                } else if (response.data.unlockedObjects) {
                    setUnlockables(response.data.unlockedObjects);
                    setCurrentUnlockable(response.data.unlockedObjects[0]);
                } else if (response.data.newRank) {
                    setRank(response.data.newRank);
                    setShowRank(true);
                } else {
                    setShowFinal(true);
                }

            })
            .catch(err => {
                setShowFinal(true);
                console.log(err);
            })

    }

    React.useEffect(() => {
        concertComplete();
    }, []);





    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Paper sx={{ backgroundColor: '#FFED66', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
                {showFinal ? <GameResults results={resultsFinal}></GameResults>
                    : <NewUnlockable unlockable={currentUnlockable}></NewUnlockable>}

                {showFinal ? <Box className="hover" sx={buttonStyle} onClick={() => { toMenu() }}>
                    <Typography className="title-button" fontSize='40px!important'> Aceptar</Typography>
                </Box>
                    : <Box className="hover" sx={buttonStyle} onClick={() => { nextItem() }}>
                        <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                    </Box>}
            </Paper>
        </React.Fragment >
    )
}

export default GameResume;