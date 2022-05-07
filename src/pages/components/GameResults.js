import { Box, Dialog, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";
import sinfonia from '../../assets/sinfonia-ejemplo.png'
import PropTypes from 'prop-types';

function DataTwoColumns(props) {
    const label = props.label;
    const value = props.value;
    const sizeLabel = props.sizeLabel;
    const sizeValue = props.sizeValue;
    return (
        <React.Fragment>
            <Grid item xs={sizeLabel} >
                <Typography fontWeight={600} fontSize="25px" className="title-font">{label}:</Typography>
            </Grid>
            <Grid item xs={sizeValue} >
                <Typography fontSize="25px" className="title-font">{value}</Typography>
            </Grid>
        </React.Fragment>
    )
}

DataTwoColumns.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    sizeLabel: PropTypes.number,
    sizeValue: PropTypes.number
};

DataTwoColumns.defaultProps = {
    sizeLabel: 9,
    sizeValue: 3
};

const GameResults = (props) => {


    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);




    let buttonStyle = { borderRadius: '20px', backgroundColor: '#00CECB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginTop: '20px', padding: '10px' };


    return (
        <React.Fragment>
            <Typography className="title-font height-size" color='secondary' lineHeight='150px'>Completado</Typography>
            <Typography className="title-font height-size2" lineHeight='50px' sx={{ marginBottom: '20px' }}>Has tocado Symphony No9</Typography>

            <Grid container>
                <Grid item xs={6} display='flex' alignItems='center' justifyContent='center'>
                    <div style={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={sinfonia} style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', borderRadius: '20px' }} />
                    </div>
                </Grid>
                <Grid item xs={6} padding="10px">
                    <Box height='50px' width='90%' style={buttonStyle}>
                        <Grid container justifyContent='center'>
                            <DataTwoColumns label='Puntos' value={props.results ? props.results.points : '--'}></DataTwoColumns>
                        </Grid>
                    </Box>
                    <Box height='50px' width='90%' style={buttonStyle}>
                        <Grid container justifyContent='center'>
                            <DataTwoColumns label='Gestos completados' value={props.results ? props.results.gesturesCompleted : '--'}></DataTwoColumns>
                        </Grid>
                    </Box>
                    <Box height='50px' width='90%' style={buttonStyle}>
                        <Grid container justifyContent='center'>
                            <DataTwoColumns label='Porcentaje de precisión' value={props.results ? `${Math.round(props.results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                        </Grid>
                    </Box>
                    <Box height='50px' width='90%' style={buttonStyle}>
                        <Grid container justifyContent='center'>
                            <DataTwoColumns label='Monedas' value={props.results ? `+${Math.round(props.results.gainedCoins)}` : '--'}></DataTwoColumns>
                        </Grid>
                    </Box>
                    <Box height='50px' width='90%' style={buttonStyle}>
                        <Grid container justifyContent='center'>
                            <DataTwoColumns label='Experiencia' value={props.results ? `+${Math.round(props.results.gainedExperience)}` : '--'}></DataTwoColumns>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>


        </React.Fragment >
    )
}

export default GameResults;