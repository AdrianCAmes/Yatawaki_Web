import { Button, Card, CircularProgress, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import React from "react";
import UserApi from "../apis/user-apis";
import SnackBarContext from "../context/snack-bar-context";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [uniqueIdentifier, setUniqueIdentifier] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate()

    const authenticate = async () => {
        setLoading(true)
        UserApi.authenticate(uniqueIdentifier, password)
            .then(response => {
                console.log(response);
                window.localStorage.setItem('jwt', response.data.jwt);
                snackBarContext.onOpen({
                    severity: "success",
                    message: "Welcome!"
                });
                navigate('/yatawaki');
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
                <Card sx={{ width: ['80%', '60%', '40%', '30%'], padding: 5, borderRadius: 35 + 'px' }}>
                    <Grid container direction='column' justifyContent='center' alignItems='center'>
                        <Typography variant='h4' fontWeight='600' color='secondary.main' textAlign='center'>
                            Welcome
                        </Typography>

                        <TextField label="Nickname or Email" sx={{ width: '80%!important', mt: 2 }} onChange={(event) => setUniqueIdentifier(event.target.value)}></TextField>

                        <TextField sx={{ width: '80%', mt: 4 }}
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
                        <Button variant="contained" color="primary" sx={{ mt: 2, }} size="large" onClick={() => { authenticate() }}>Login</Button>
                    </Grid>
                </Card>
            </Paper>
        </React.Fragment>
    )


}

export default Login;