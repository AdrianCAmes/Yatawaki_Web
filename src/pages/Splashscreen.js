import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo_upc from '../assets/Logo UPC.png';


let buttonStyle = { width: '500px', height: '120px', borderRadius: '20px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', };

const Splashscreen = () => {

    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }


    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container justifyContent="center">
                    <Typography className="title-font title-logo" > YATAWAKI</Typography>
                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mt: 9 }}>
                        <Grid item>
                            <Box className="hover" onClick={() => { navigateRegister() }} sx={buttonStyle}>
                                <Typography className="title-font title-button" > REGISTRATE</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box className="hover" sx={buttonStyle} onClick={() => { navigateLogin() }}>
                                <Typography className="title-font title-button" > LOGIN</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <img src={logo_upc} alt="Logo" className="image-upc" />

                </Grid>
            </Paper>
        </React.Fragment>
    )


}

export default Splashscreen;