import { CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import React from "react";
import SnackBarContext from "../context/snack-bar-context";
import { useNavigate } from "react-router-dom";
import logo_upc from '../assets/Logo UPC.png';
import { Box } from "@mui/system";
import ImageAutoSlider from "../components/ImageAutoSlider";
import AuthApi from "../apis/auth-apis";
import GameContext from "../context/game-context";

let buttonStyle = { width: '400px', height: '70px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };

const Login = () => {
    const [uniqueIdentifier, setUniqueIdentifier] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);
    const navigate = useNavigate()

    const authenticate = async () => {
        setLoading(true);
        AuthApi.authenticate(uniqueIdentifier, password)
            .then(response => {
                window.localStorage.setItem('jwt', response.data.jwt);
                snackBarContext.onOpen({
                    severity: "success",
                    message: "Bienvenido!"
                });
                gameContext.updateUser(1);
                navigate('/menu')
            })
            .catch(err => {
                snackBarContext.onOpen({
                    severity: "error",
                    message: "Por favor, ingresa las credenciales correctas"
                });
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }} elevation={0}>
                <Typography textAlign='center' className="title-font title-login" >LOG IN</Typography>

                <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs={5} >
                        <Box sx={{justifyContent:'center', alignContent:'center', display:'flex', height:'400px'}}>
                            <ImageAutoSlider></ImageAutoSlider>
                        </Box>

                    </Grid>

                    <Grid item xs={7} container direction='column' justifyContent='center' alignItems='center'>

                        <TextField placeholder="Escribe tu usuario" sx={{ width: '80%!important', mt: 2, backgroundColor: '#FFF' }} onChange={(event) => setUniqueIdentifier(event.target.value)}></TextField>

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
                        <Box sx={buttonStyle} onClick={() => { authenticate() }}>
                            <Typography className="title-button"> Iniciar</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <img src={logo_upc} alt="Logo" className="image-upc" />

            </Paper>
        </React.Fragment>
    )


}

export default Login;