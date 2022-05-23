import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import sinfonia from '../assets/sinfonia-ejemplo.png'

import PropTypes from 'prop-types';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import GameContext from "../context/game-context";


let buttonStyle = { width: '500px', height: '80px', borderRadius: '20px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', };
let buttonStyle2 = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };
let boxStyle = { borderRadius: '20px', backgroundColor: '#00CECB', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginTop: '20px', padding: '10px' };

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


const TutorialResume = () => {
    const gameContext = React.useContext(GameContext);

    const [results, setResultsFinal] = React.useState(null);
    const [paso, setPaso] = React.useState(1);
    const navigate = useNavigate();
    const nextPaso = () => {
        setPaso((prev) => prev + 1);
    }

    React.useEffect(() => {
        const aresults = {
            "idConcert": 1,
            "gainedExperience": 324,
            "points": 234,
            "accuracyRate": 234,
            "gesturesCompleted": 23,
            "gainedCoins": 2341,
            "symphonyName": "Symphony No9"
        }
        setResultsFinal(aresults)
    }, []);

    const pasoFinal = () => {
        updateTutorial()
    }

    const updateTutorial = async () => {
        UserApi.updateShowTutorial(gameContext.userId)
            .then(response => {
                console.log(response.data)
                navigate('/menu')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#000', height: '100%', width: '100%', padding: '10px', opacity: '0.6', position: 'absolute', zIndex: '2' }} >
            </div>
            <div style={{ backgroundColor: '#FFED66', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '20px' }} >
                <Typography className="title-font height-size" color='secondary' lineHeight='150px'>Completado</Typography>
                <Typography className="title-font height-size2" lineHeight='50px' sx={{ marginBottom: '20px' }}>Has tocado {results ? results.symphonyName : '--'}</Typography>

                <Grid container style={{ visibility: paso === 1 ? 'visible' : 'hidden' }}>
                    <Grid item xs={6} display='flex' alignItems='center' justifyContent='center'>
                        <div style={{ width: '90%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={sinfonia} style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', borderRadius: '20px' }} />
                        </div>
                    </Grid>
                    <Grid item xs={6} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Divider style={{ width: '90%', marginTop: '30px' }}>
                            <FacebookShareButton url={window.location.href} title={`He conseguido ${results ? results.points : '--'} puntos y ${results ? Math.round(results.accuracyRate, 2) : '--'}% de precisión en ${results ? results.symphonyName : '--'}.\nPrueba YATAWAKI en:`}>
                                <FacebookIcon size={50} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton url={window.location.href} title={`He conseguido ${results ? results.points : '--'} puntos y ${results ? Math.round(results.accuracyRate, 2) : '--'}% de precisión en ${results ? results.symphonyName : '--'}.\nPrueba YATAWAKI en:`}>
                                <WhatsappIcon size={50} round={true} />
                            </WhatsappShareButton>

                            <TwitterShareButton url={window.location.href} title={`He conseguido ${results ? results.points : '--'} puntos y ${results ? Math.round(results.accuracyRate, 2) : '--'}% de precisión en ${results ? results.symphonyName : '--'}.\nPrueba  YATAWAKI en:`}>
                                <TwitterIcon size={50} round={true} />
                            </TwitterShareButton>
                        </Divider>
                    </Grid>

                </Grid>

                <Box className="hover" sx={buttonStyle} >
                    <Typography className="title-button" fontSize='40px!important'> Aceptar </Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '20%', top: '25%', zIndex: `${paso === 1 ? '3' : '1'}`, visibility: paso === 1 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '60vw', borderRadius: '30px', padding: '30px' }} className={`${paso === 1 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">FELICIDADES!</Typography>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Has culminado tu primera partida</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '2%', top: '28%', zIndex: `${paso === 2 ? '3' : '1'}`, visibility: paso === 2 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', padding:'30px', width: '45vw', borderRadius: '30px'}} className={`${paso === 2 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">En la parte derecha de la pantalla podrás observar tus resultados obtenidos</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '19.2%', zIndex: `${paso === 2 ? '3' : '1'}`, visibility: paso === 2 ? 'visible' : 'hidden', height: '50vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 2 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '2%', top: '27%', zIndex: `${paso === 3 ? '3' : '1'}`, visibility: paso === 3 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '45vw', borderRadius: '30px', padding: '30px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Tus puntos, gestos completados y porcentaje de precisión son un indicador de tu desempeño a lo largo de la partida</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '10%', zIndex: `${paso === 3 ? '3' : '1'}`, visibility: paso === 3 ? 'visible' : 'hidden', height: '50vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '28.5%', zIndex: `${paso === 3 && '1'}`, visibility: paso === 3 ? 'visible' : 'hidden', height: '50vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '2%', top: '27%', zIndex: `${paso === 4 ? '3' : '1'}`, visibility: paso === 4 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '45vw', borderRadius: '30px', padding: '30px' }} className={`${paso === 4 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Puedes usar las monedas obtenidas para canjearlas por objetos desbloqueables en la tienda</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '15%', zIndex: `${paso === 4 && '1'}`, visibility: paso === 4 ? 'visible' : 'hidden', height: '50vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 4 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%'>

                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '37.5%', zIndex: `${paso === 4 ? '3' : '1'}`, visibility: paso === 4 ? 'visible' : 'hidden', height: '20vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 4 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            </div>
            

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '2%', top: '30%', zIndex: `${paso === 5 ? '3' : '1'}`, visibility: paso === 5 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '45vw', borderRadius: '30px', padding: '30px' }} className={`${paso === 5 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Junta experiencia para subir de rango y sé un experto en dirección orquestal</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '15%', zIndex: `${paso === 5 && '1'}`, visibility: paso === 5 ? 'visible' : 'hidden', height: '50vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 5 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '48.5%', zIndex: `${paso === 5 ? '3' : '1'}`, visibility: paso === 5 ? 'visible' : 'hidden', height: '20vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 5 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">

                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '2%', top: '30%', zIndex: `${paso === 6 ? '3' : '1'}`, visibility: paso === 6 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '45vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 6 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">¡Recuerda que mientras mejores sean tus resultados, más probabilidades tienes de desbloquear objetos más exclusivos!</Typography>
                <Box className="hover" sx={buttonStyle2} onClick={() => { pasoFinal() }}>
                    <Typography className="title-button" fontSize='40px!important'> Terminar </Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '50%', top: '33%', zIndex: `${paso === 6 ? '3' : '1'}`, visibility: paso === 6 ? 'visible' : 'hidden', height: '20vh', width: '50vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 6 ? 'canvasAnimation' : ''}`}>
                <Grid container>
                    <Grid item xs={12} padding="10px">

                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Puntos' value={results ? results.points : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Gestos completados' value={results ? results.gesturesCompleted : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Porcentaje de precisión' value={results ? `${Math.round(results.accuracyRate, 2)}%` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Monedas' value={results ? `+${Math.round(results.gainedCoins)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                        <Box height='50px' width='90%' style={boxStyle}>
                            <Grid container justifyContent='center'>
                                <DataTwoColumns label='Experiencia' value={results ? `+${Math.round(results.gainedExperience)}` : '--'}></DataTwoColumns>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>

        </React.Fragment>
    )


}

export default TutorialResume;