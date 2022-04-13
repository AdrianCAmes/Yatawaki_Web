import { Box, Dialog, Paper, Typography } from "@mui/material";
import React from "react";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";
import fondo from '../../assets/fondo-unlockable.png'
import unlockable from '../../assets/ejemplo-unlockable.png'

const NewUnlockable = (props) => {


    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);




    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Typography className="title-font height-size" color='secondary' lineHeight='100px'>¡Felicidades!</Typography>
            <Typography className="title-font height-size2" lineHeight='50px'>Has desbloqueado un objeto</Typography>
            <div style={{ height: '50vh', width: '50vw', marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <img src={fondo} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                <img src={unlockable} style={{ position: 'absolute', maxHeight: '30vh', maxWidth: '20vh', height: '50%', width: '50%' }} />
            </div>

            <Box height='50px' width='50vw' style={{ borderRadius: '20px', backgroundColor: '#00CECB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginTop: '30px' }}>
                <Typography className="title-font" fontSize='40px'>Frederic Chopin Avatar</Typography>
            </Box>
        </React.Fragment >
    )
}

export default NewUnlockable;