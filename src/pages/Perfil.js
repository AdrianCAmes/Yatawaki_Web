
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import avatar from '../assets/avatar.png';
import PropTypes from 'prop-types';
import { Box } from "@mui/system";

function DataTwoColumns(props) {
    const label = props.label;
    const value = props.value;
    return (
        <React.Fragment>
            <Grid item xs={4} sx={{ marginBottom: '10px' }}>
                <Typography fontWeight={600} fontSize="20px">{label}:</Typography>
            </Grid>
            <Grid item xs={8} sx={{ marginBottom: '10px' }}>
                <Typography fontSize="20px">{value}</Typography>
            </Grid>
        </React.Fragment>
    )
}

DataTwoColumns.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
let buttonStyle = { width: '180px', height: '40px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


const Perfil = () => {

    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);

    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }

    const getUser = async () => {
        setLoading(true);
        UserApi.getUserById(gameContext.userId)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    const getUserUnlockables = async () => {
        setLoading(true);
        UserUnlockableApi.findUserUnlockable(gameContext.userId)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        //getUserUnlockables();
        getUser();

    }, [gameContext.userId]);


    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', padding: '40px' }} elevation={0}>
                <div className="hover" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <ArrowBackIosRounded fontSize="medium" />
                    <Typography fontWeight={600} fontSize={24} sx={{ marginLeft: '10px' }}>Atrás</Typography>
                </div>

                <Typography className="title-font title-perfil">PERFIL DE JUGADOR</Typography>

                <Grid container>
                    <Grid item xs={4} align="center">
                        {/* src={profile ? `data:image/jpeg;base64,${profile.icon}` : avatar} */}
                        <Avatar sx={{ height: '150px', width: '150px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={avatar} />
                        <Typography sx={{ marginTop: '15px', fontWeight: '600', fontSize: '23px' }}>Amadeus Mozart</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ marginBottom: '30px' }}>DATOS PERSONALES</Typography>
                        <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px' }}>
                            <Grid container>
                                <DataTwoColumns label='Nombres' value={profile ? profile.firstname : '--'}></DataTwoColumns>
                                <DataTwoColumns label='Apellidos' value={profile ? profile.lastname : '--'}></DataTwoColumns>
                                <DataTwoColumns label='Correo' value={profile ? profile.mail : '--'}></DataTwoColumns>
                                <DataTwoColumns label='Nickname' value={profile ? profile.nickname : '--'}></DataTwoColumns>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Box className="hover" sx={buttonStyle}>
                        <Typography className="button-perfil"> Editar</Typography>
                    </Box>
                </div>

            </Paper>
        </React.Fragment>
    )


}

export default Perfil;