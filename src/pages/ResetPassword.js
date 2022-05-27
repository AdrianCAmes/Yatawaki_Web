import { CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { ArrowBackIosRounded, Lock } from "@mui/icons-material";
import React from "react";
import SnackBarContext from "../context/snack-bar-context";
import { useLocation, useNavigate } from "react-router-dom";
import logo_upc from '../assets/Logo UPC.png';
import { Box } from "@mui/system";
import ImageAutoSlider from "../components/ImageAutoSlider";
import { useAuth } from "../context/auth-context";
import UserApi from "../apis/user-apis";
import GameContext from "../context/game-context";

let buttonStyle = { width: '400px', height: '70px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
    const [password, setPassword] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { resetPassword } = useAuth();
    const query = useQuery();

    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate()

    const toSplashscreen = () => {
        navigate('/login')
    };

    const gameContext = React.useContext(GameContext)


    const submit = async () => {
        if (!/[a-zA-Z]/.test(password)) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Tu contraseña no tiene letras"
            });
        } else if (!/\d/.test(password)) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Tu contraseña no tiene numeros"
            });
        } else if (password.length < 8) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Por favor ingresa mas de 8 caracteres"
            });
        } else {
            setLoading(true);
            resetPassword(query.get('oobCode'), password)
                .then((response) => {
                    console.log(response)
                    snackBarContext.onOpen({
                        severity: "success",
                        message: "Contraseña actualizada con éxito  "
                    });
                    resetBack()
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                    snackBarContext.onOpen({
                        severity: "error",
                        message: err.message
                    });
                })
                .finally(() => {
                    setLoading(false);
                })
        }


    }

    const resetBack = async () => {
        UserApi.updatePassword(gameContext.emailToUpdate, password)

    }

    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }} elevation={0}>
                <div className="hover" onClick={() => { toSplashscreen() }} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', margin: '20px', position: 'absolute' }}>
                    <ArrowBackIosRounded fontSize="medium" />
                    <Typography fontWeight={600} fontSize={24} sx={{ marginLeft: '10px' }}>Atrás</Typography>
                </div>
                <Typography textAlign='center' className="title-font title-login" >YATAWAKI</Typography>

                <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs={5} >
                        <Box sx={{ justifyContent: 'center', alignContent: 'center', display: 'flex', height: '400px' }}>
                            <ImageAutoSlider></ImageAutoSlider>
                        </Box>

                    </Grid>

                    <Grid item xs={7} container direction='column' justifyContent='center' alignItems='center'>
                        <Typography fontWeight={600} fontSize={16}>Ingresa tu nueva Contraseña</Typography>

                        <TextField sx={{ width: '80%', mt: 4, backgroundColor: '#FFF' }}
                            type="password"
                            label="Contraseña"
                            onChange={(event) => setPassword(event.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}

                        />
                        {loading && <CircularProgress />}

                        <Box className="hover" sx={buttonStyle} onClick={() => { submit() }}>
                            <Typography className="title-button"> Actualizar </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <img src={logo_upc} alt="Logo" className="image-upc" />

            </Paper>
        </React.Fragment>
    )


}

export default ResetPassword;