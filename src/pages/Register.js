import { Button, Card, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import React from "react";
import UserApi from "../apis/user-apis";
import SnackBarContext from "../context/snack-bar-context";


const Register = () => {
    const [nickname, setNickname] = React.useState(null);
    const [firstname, setFirstname] = React.useState(null);
    const [lastname, setLastname] = React.useState(null);
    const [mail, setMail] = React.useState(null);
    const [birthDate, setBirthDate] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const snackBarContext = React.useContext(SnackBarContext);

    const register = async () => {
        setLoading(true)
        UserApi.register(nickname, password, firstname, lastname, mail, birthDate)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                snackBarContext.onOpen({
                    severity: "error",
                    message: err
                });
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.main', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ width: ['90%', '60%', '40%', '30%'], padding: 5, borderRadius: 35 + 'px' }}>
                    <Grid container direction='column' justifyContent='center' alignItems='center'>
                        <Typography variant='h4' fontWeight='600' color='secondary.main' textAlign='center'>
                            Register
                        </Typography>

                        <TextField label="Nickname" sx={{ width: '80%!important', mt: 2 }} onChange={(event) => setNickname(event.target.value)}></TextField>
                        <TextField label="First Name" sx={{ width: '80%!important', mt: 2 }} onChange={(event) => setFirstname(event.target.value)}></TextField>
                        <TextField label="Last Name" sx={{ width: '80%!important', mt: 2 }} onChange={(event) => setLastname(event.target.value)}></TextField>
                        <TextField label="Mail" sx={{ width: '80%!important', mt: 2 }} onChange={(event) => setMail(event.target.value)}></TextField>
                        <TextField label="Birthday" type="date" sx={{ width: '80%!important', mt: 2 }} InputLabelProps={{ shrink: true, }} onChange={(event) => setBirthDate(event.target.value)}/>
                        <TextField sx={{ width: '80%', mt: 2 }}
                            type="password"
                            label="Password"
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
                        <Button variant="contained" color="primary" sx={{ mt: 2, }} size="large" onClick={() => { register() }}>Register</Button>
                    </Grid>
                </Card>
            </Paper>
        </React.Fragment>
    )


}

export default Register;