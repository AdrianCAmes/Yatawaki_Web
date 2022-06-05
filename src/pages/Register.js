import { Box, Checkbox, CircularProgress, Dialog, Divider, FormControlLabel, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { ArrowBackIosRounded, Lock } from "@mui/icons-material";
import React from "react";
import UserApi from "../apis/user-apis";
import SnackBarContext from "../context/snack-bar-context";
import { useNavigate } from "react-router-dom";
import ImageAutoSlider from "../components/ImageAutoSlider";
import logo_upc from '../assets/Logo UPC.png';
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useAuth } from "../context/auth-context";
import { getAnalytics, logEvent } from "firebase/analytics";
import { analytics } from "../config/init-firebase";

let buttonStyle = { width: ['200px', '200px', '300px'], height: '60px', borderRadius: '15px', mx: 'auto', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };

const Register = () => {
    const [nickname, setNickname] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [openTerminos, setOpenTerminos] = React.useState(false)

    const [nicknameError, setNicknameError] = React.useState(false);
    const [firstnameError, setFirstnameError] = React.useState(false);
    const [lastnameError, setLastnameError] = React.useState(false);
    const [mailError, setMailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const [step, setStep] = React.useState(1);
    const [terms, setTerms] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate()

    const { register } = useAuth()



    const submit = async () => {

        let errorExist = false;

        if (nickname === "" || nickname === null) {
            setNicknameError(true);
            errorExist = true;
        }
        if (password === "" || password === null) {
            setPasswordError(true);
            errorExist = true;
        }


        if (errorExist) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Completa todas los campos"
            });
        } else if (!/[a-zA-Z]/.test(password)) {
            setPasswordError(true);
            snackBarContext.onOpen({
                severity: "error",
                message: "Tu contraseña no tiene letras"
            });
        } else if (!/\d/.test(password)) {
            setPasswordError(true);
            snackBarContext.onOpen({
                severity: "error",
                message: "Tu contraseña no tiene numeros"
            });
        } else if (password.length < 8) {
            setPasswordError(true);
            snackBarContext.onOpen({
                severity: "error",
                message: "Por favor ingresa mas de 8 caracteres"
            });
        } else if (terms === false) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Por favor acepte los términos y condiciones"
            });
        } else {
            setLoading(true);

            register(mail, password)
                .then((response) => {
                    console.log(response)
                })
                .then(() => {
                    registerBack()
                })
                .catch((error) => {
                    snackBarContext.onOpen({
                        severity: "error",
                        message: "Correo ya existe"
                    });
                })
                .finally(() => setLoading(false))
        }


    }

    const registerBack = async () => {
        UserApi.register(nickname, password, firstname, lastname, mail)
            .then(() => {
                snackBarContext.onOpen({
                    severity: "success",
                    message: "Registrado correctamente"
                });
                navigate('/login');
            })
            .catch(err => {
                console.log(err)
                snackBarContext.onOpen({
                    severity: "error",
                    message: err.mensaje
                });
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    const nextStep = () => {

        let errorExist = false;

        if (firstname === "" || firstname === null) {
            setFirstnameError(true);
            errorExist = true;
        }
        if (lastname === "" || lastname === null) {
            setLastnameError(true);
            errorExist = true;
        }
        if (mail === "" || mail === null) {
            setMailError(true);
            errorExist = true;
        }

        if (errorExist) {
            snackBarContext.onOpen({
                severity: "error",
                message: "Completa todas los campos"
            });
        } else {
            setStep(step + 1);
        }

    }
    const toSplashscreen = () => {
        navigate('/');
        logEvent(analytics, 'back_button_from_register_page');
    };

    const fillFields = (response) => {
        var decoded = jwt_decode(response.credential);

        snackBarContext.onOpen({
            severity: "success",
            message: "Datos obtenidos de google"
        });

        setFirstname(decoded.given_name);
        setLastname(decoded.family_name);
        setMail(decoded.email)
    };

    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100%' }} elevation={0}>
                <div className="hover" onClick={() => { toSplashscreen();}} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', margin: '20px', position: 'absolute' }}>
                    <ArrowBackIosRounded fontSize="medium" />
                    <Typography fontWeight={600} fontSize={24} sx={{ marginLeft: '10px' }}>Atrás</Typography>
                </div>
                <Typography textAlign='center' className="title-font title-login" >REGISTRO</Typography>

                <Grid container justifyContent='center' alignItems='center' height='60vh'>
                    <Grid item xs={5} >
                        <Box sx={{ justifyContent: 'center', alignContent: 'center', display: 'flex', height: '400px' }}>
                            <ImageAutoSlider></ImageAutoSlider>
                        </Box>

                    </Grid>

                    <Grid item xs={7}>

                        {step === 1 ? ( <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <GoogleLogin onSuccess={(response) => { fillFields(response);  logEvent(analytics, 'google_registration_completed')}}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}>

                                </GoogleLogin>

                                {/* <div className="hover" style={{ width: '80%', height: '50px', display: 'flex', justifyContent: 'start', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #C3D8EE' }}>
                                    <img style={{ height: '35px', marginLeft: '10px' }} src={googleIcon} alt="google" />
                                    <Typography marginLeft='20px' color='#757575'>Registrate con Google</Typography>
                                </div> */}

                                <Divider sx={{ width: '80%', mt: 2, }}>O</Divider>

                                <TextField error={firstnameError} placeholder="Ingresa tu nombre" sx={{ width: '80%', mt: 2, backgroundColor: '#FFF' }} onChange={(event) => setFirstname(event.target.value)} value={firstname}></TextField>
                                <TextField error={lastnameError} placeholder="Ingresa tu apelido" sx={{ width: '80%', mt: 2, backgroundColor: '#FFF' }} onChange={(event) => setLastname(event.target.value)} value={lastname}></TextField>
                                <TextField error={mailError} placeholder="Ingresa tu correo electronico" sx={{ width: '80%', mt: 2, backgroundColor: '#FFF' }} onChange={(event) => setMail(event.target.value)}  onClick={() =>logEvent(analytics, 'email_field_register_page') }value={mail}></TextField>

                                <Box className="hover" sx={buttonStyle} onClick={() => { nextStep(); logEvent(analytics,'next_button_register_page', {value: 1} )}}>
                                    <Typography className="title-button"> Siguiente</Typography>
                                </Box>
                            </div>
                        ) : null}

                        {step === 2 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="hover" onClick={() => { setStep(1) }} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '80%' }}>
                                    <ArrowBackIosRounded fontSize="small" />
                                    <Typography fontWeight={600} fontSize={20} sx={{ marginLeft: '10px' }}>Regresar a datos personales</Typography>
                                </div>
                                <TextField error={nicknameError} placeholder="Ingresa tu usuario" sx={{ width: '80%', mt: 2, backgroundColor: '#FFF' }} onChange={(event) => setNickname(event.target.value)} onClick={() => logEvent(analytics, 'username_field_register_page')}></TextField>

                                <TextField sx={{ width: '80%', mt: 2, backgroundColor: '#FFF' }} type="password" error={passwordError} label="Contraseña" onChange={(event) => setPassword(event.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                    }}

                                />

                                <div style={{ width: '80%' }}>
                                    <FormControlLabel display={'inline'} sx={{ alignSelf: 'self-start' }} control={<Checkbox checked={terms} onClick={() => { setTerms(!terms) }} />} label={"Estoy de acuerdo con los términos y condiciones"} />
                                    <Typography onClick={() => { setOpenTerminos(true); logEvent(analytics,'view_terms_and_conditions_register_page') }} fontWeight='600' className="hover" display={'inline'}>Ver aquí</Typography>
                                </div>

                                <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={openTerminos} onClose={() => { setOpenTerminos(false) }} scroll={'body'} maxWidth={'md'}>
                                    <div style={{ backgroundColor: '#FFED66', padding: '50px' }}>
                                        <Typography fontWeight={600} fontSize={28} style={{ textAlign: 'center' }}>
                                            Términos y Condiciones
                                        </Typography>
                                        <p style={{ fontSize: 24 }}>
                                            Su privacidad es importante para nosotros. Es política de la Universidad Peruana de Ciencias Aplicadas (UPC) respetar su privacidad con respecto a cualquier información que podamos recopilar de usted a través de nuestra aplicación, Yatawaki.
                                            <br /><br />
                                            Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. La recopilamos por medios justos y legales, con su conocimiento y consentimiento. También le informamos por qué lo recopilamos y cómo se utilizará.
                                            <br /><br />
                                            Solo conservamos la información recopilada durante el tiempo que sea necesario para brindarle el servicio solicitado. Los datos que almacenamos, los protegeremos dentro de los medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, divulgación, copia, uso o modificación no autorizados.
                                            <br /><br />
                                            Dada la naturaleza del proyecto presentado, es importante recopilar el correo electrónico personal del usuario proporcionado por él para analizar sus interacciones con las funcionalidades que ofrece Yatawaki. Estos datos serán utilizados únicamente para el proceso de validación de la tesis “Orquesta con Detección de Movimientos del Cuerpo Mediante Body Tracking”. Si tiene alguna pregunta sobre cómo se utilizarán estos datos, no dude en escribirnos un correo electrónico a yatawaki@gmail.com.
                                            <br /><br />
                                            No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando lo exija la ley.
                                            <br /><br />
                                            Nuestra aplicación puede vincularse a sitios externos que no son operados por nosotros. Tenga en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios, y no podemos aceptar responsabilidad alguna por sus respectivas políticas de privacidad.
                                            <br /><br />
                                            Usted es libre de rechazar nuestra solicitud de su información personal, en el entendimiento de que es posible que no podamos brindarle algunos de los servicios que desea.
                                            <br /><br />
                                            Su uso continuado de nuestra aplicación se considerará como la aceptación de nuestras prácticas en materia de privacidad e información personal. Si tiene alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, no dude en contactarnos.

                                        </p>

                                        <Box className="hover" sx={buttonStyle} onClick={() => { setOpenTerminos(false) }}>
                                            <Typography className="title-button"> Entendido</Typography>
                                        </Box>
                                    </div>
                                </Dialog>

                                {loading && <CircularProgress />}
                                <Box className="hover" sx={buttonStyle} onClick={() => { submit(); logEvent(analytics,'register_button_register_page') }}>
                                    <Typography className="title-button"> Registrarme</Typography>
                                </Box>
                            </div>
                        ) : null}




                    </Grid>
                </Grid>
                <img src={logo_upc} alt="Logo" className="image-upc" />

            </Paper>
        </React.Fragment >
    )


}

export default Register;