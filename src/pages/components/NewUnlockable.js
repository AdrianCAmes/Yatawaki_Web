import { Box, Typography } from "@mui/material";
import React from "react";
import fondo from '../../assets/fondo-unlockable.png'

const NewUnlockable = (props) => {


    return (
        <React.Fragment>
            <Typography className="title-font height-size" color='secondary' lineHeight='100px'>¡Felicidades!</Typography>
            <Typography className="title-font height-size2" lineHeight='50px'>Has desbloqueado un objeto</Typography>
            <div style={{ height: '50vh', width: '50vw', marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <img src={fondo} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                <img src={props.unlockable ? props.unlockable.icon : null} style={{ position: 'absolute', maxHeight: '30vh', maxWidth: '20vh', height: '50%', width: '50%' }} />
            </div>

            <Box height='50px' width='50vw' style={{ borderRadius: '20px', backgroundColor: '#00CECB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginTop: '30px' }}>
                <Typography className="title-font" fontSize='40px'>{props.unlockable ? props.unlockable.name : null}</Typography>
            </Box>
        </React.Fragment >
    )
}

export default NewUnlockable;