import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ConcertApis from "../apis/concert-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import GameResults from "./components/GameResults";
import NewUnlockable from "./components/NewUnlockable";


const GameResume = () => {



    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);

    const [loading, setLoading] = React.useState(true);
    const [showFinal, setShowFinal] = React.useState(false);
    const [unlockables, setUnlockables] = React.useState([]);
    const [currentUnlockable, setCurrentUnlockable] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [rank, setRank] = React.useState(null);
    const [showRank, setShowRank] = React.useState(false);
    const navigate = useNavigate()


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
        setLoading(true);

        ConcertApis.concertComplete()
            .then(response => {
                if (!response.data.newRank && !response.data.unlockedObjects) {
                    setShowFinal(true)
                }
                if (response.data.unlockedObjects) {
                    setUnlockables(response.data.unlockedObjects);
                    setCurrentUnlockable(response.data.unlockedObjects[0]);
                }
                if (response.data.newRank) {
                    setRank(response.data.newRank);
                    setShowRank(true);
                }

            })
            .catch(err => {
                toMenu();
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }


    React.useEffect(() => {
        concertComplete();
    }, []);

    const results = {
        "idConcert": 1,
        "gainedExperience": 700,
        "points": 684,
        "accuracyRate": 88,
        "gesturesCompleted": 14,
        "gainedCoins": 110

    }



    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Paper sx={{ backgroundColor: '#FFED66', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>

                {showFinal ? <GameResults results={results}></GameResults>
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