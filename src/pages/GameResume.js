import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import GameResults from "./components/GameResults";
import NewUnlockable from "./components/NewUnlockable";


const GameResume = () => {



    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);




    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Paper sx={{ backgroundColor: '#FFED66', height: '100vh', display:'flex', alignItems:'center', flexDirection:'column', padding:'20px' }}>
                {/* <NewUnlockable></NewUnlockable> */}
                <GameResults></GameResults>
                <Box className="hover" sx={buttonStyle} onClick={() => {  }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </Paper>
        </React.Fragment >
    )
}

export default GameResume;