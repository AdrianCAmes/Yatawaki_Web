
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Avatar, CircularProgress, Grid, Paper, Tab, Tabs, tabsClasses, Typography, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import PropTypes from 'prop-types';
import { Box } from "@mui/system";
import { AchievementCard, AvatarCard, SymphonyCard } from "./components/ObjectCard";
import styled from "@emotion/styled";

function DataTwoColumns(props) {
    const label = props.label;
    const value = props.value;
    const sizeLabel = props.sizeLabel;
    const sizeValue = props.sizeValue;
    return (
        <React.Fragment>
            <Grid item xs={sizeLabel} sx={{ marginBottom: '10px' }}>
                <Typography fontWeight={600} fontSize="20px">{label}:</Typography>
            </Grid>
            <Grid item xs={sizeValue} sx={{ marginBottom: '10px' }}>
                <Typography fontSize="20px">{value}</Typography>
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
    sizeLabel: 4,
    sizeValue: 8
};

let buttonStyle = { width: '180px', height: '40px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };
let buttonStyleSecondary = { width: '180px', height: '40px', borderRadius: '15px', mx: '40px', backgroundColor: '#D8D8D8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const CustomTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#FFF49B!important',
    },
});

const CustomTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: '600!important',
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Kubots!important',
    fontSize: '25px',
    '&:hover': {
        color: '#FF5E5B',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#FF5E5B',
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

const Perfil = () => {
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);
    const [achievements, setAchievements] = React.useState([]);
    const [avatars, setAvatars] = React.useState([]);
    const [symphonies, setSymphonies] = React.useState([]);

    const [isEditing, setIsEditing] = React.useState(false);
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [nickname, setNickname] = React.useState('');

    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const toHome = () => {
        navigate('/menu')
    };

    const toMarket = () => {
        navigate('/market')
    };

    const editProfile = () => {
        let finalFirstName = firstname === '' ? profile.firstname : firstname;
        let finalLastName = lastname === '' ? profile.lastname : lastname;
        let finalMail = mail === '' ? profile.mail : mail;
        let finalNickname = nickname === '' ? profile.nickname : nickname;
        
        updateUser(finalFirstName, finalLastName, finalNickname, finalMail);
    };

    const getUser = async () => {
        setLoading(true);
        UserApi.getUserProfileById(gameContext.userId)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    const updateUser = async (finalFirstName, finalLastName, finalNickname, finalMail) => {
        //console.log(gameContext.userId)
        UserApi.updateuser(gameContext.userId, finalFirstName, finalLastName, finalNickname, finalMail)
            .then(response => {
                console.log(response.data);
                setIsEditing(false);
                snackBarContext.onOpen({
                    severity: "success",
                    message: "Perfil Editado correctamente"
                });
                getUser();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getUserUnlockables = async () => {
        setLoading(true);
        UserUnlockableApi.findUserUnlockable(gameContext.userId)
            .then(response => {
                setSymphonies(response.data.symphonies);
                setAvatars(response.data.avatars);
                setAchievements(response.data.achievements);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        getUserUnlockables();
        getUser();

    }, [gameContext.userId]);


    return (
        <React.Fragment>
            {loading ? <CircularProgress style={{ position: 'absolute', right: '50%', top: '50%' }}></CircularProgress> :
                <Paper square={true} sx={{ backgroundColor: 'primary.light', padding: '40px' }} elevation={0}>
                    <div className="hover" onClick={() => { toHome() }} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <ArrowBackIosRounded fontSize="medium" />
                        <Typography fontWeight={600} fontSize={24} sx={{ marginLeft: '10px' }}>Atrás</Typography>
                    </div>

                    <Typography className="title-font title-perfil">PERFIL DE JUGADOR</Typography>

                    <Grid container>
                        <Grid item xs={4} align="center">
                            <Avatar sx={{ height: '150px', width: '150px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={profile ? profile.avatar.icon : null} />
                            <Typography sx={{ marginTop: '15px', fontWeight: '600', fontSize: '23px' }}>{profile ? profile.avatar.name : '--'}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ marginBottom: '30px' }}>DATOS PERSONALES</Typography>
                            <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px' }}>
                                <Grid container>
                                    {isEditing ?
                                        <>
                                            <Grid item xs={4} sx={{ marginBottom: '10px' }}>
                                                <Typography fontWeight={600} fontSize="20px">Nombres:</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ marginBottom: '10px' }}>
                                                <TextField
                                                    onChange={(event) => setFirstname(event.target.value)}
                                                    sx={{ width: '80%', backgroundColor: '#FFF', }} defaultValue={profile ? profile.firstname : '--'}></TextField>
                                            </Grid>

                                            <Grid item xs={4} sx={{ marginBottom: '10px' }}>
                                                <Typography fontWeight={600} fontSize="20px">Apellidos:</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ marginBottom: '10px' }}>
                                                <TextField
                                                    onChange={(event) => setLastname(event.target.value)}
                                                    sx={{ width: '80%', backgroundColor: '#FFF', }} defaultValue={profile ? profile.lastname : '--'}></TextField>
                                            </Grid>

                                            <Grid item xs={4} sx={{ marginBottom: '10px' }}>
                                                <Typography fontWeight={600} fontSize="20px">Correo:</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ marginBottom: '10px' }}>
                                                <TextField
                                                    onChange={(event) => setMail(event.target.value)}
                                                    sx={{ width: '80%', backgroundColor: '#FFF', }} defaultValue={profile ? profile.mail : '--'}></TextField>
                                            </Grid>

                                            <Grid item xs={4} sx={{ marginBottom: '10px' }}>
                                                <Typography fontWeight={600} fontSize="20px">Nickname:</Typography>
                                            </Grid>
                                            <Grid item xs={8} sx={{ marginBottom: '10px' }}>
                                                <TextField
                                                    onChange={(event) => setNickname(event.target.value)}
                                                    sx={{ width: '80%', backgroundColor: '#FFF', }} defaultValue={profile ? profile.nickname : '--'}></TextField>
                                            </Grid>
                                        </>
                                        :
                                        <>
                                            <DataTwoColumns label='Nombres' value={profile ? profile.firstname : '--'}></DataTwoColumns>
                                            <DataTwoColumns label='Apellidos' value={profile ? profile.lastname : '--'}></DataTwoColumns>
                                            <DataTwoColumns label='Correo' value={profile ? profile.mail : '--'}></DataTwoColumns>
                                            <DataTwoColumns label='Nickname' value={profile ? profile.nickname : '--'}></DataTwoColumns>
                                        </>
                                    }
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        {isEditing ?
                            <>
                                <Box className="hover" onClick={() => { setIsEditing(false) }} sx={buttonStyleSecondary}>
                                    <Typography className="button-perfil2"> Cancelar</Typography>
                                </Box>
                                <Box className="hover" onClick={() => { editProfile() }} sx={buttonStyle}>
                                    <Typography className="button-perfil"> Aceptar</Typography>
                                </Box>
                            </>
                            :
                            <Box className="hover" onClick={() => { setIsEditing(true) }} sx={buttonStyle}>
                                <Typography className="button-perfil"> Editar</Typography>
                            </Box>
                        }
                    </div>

                    <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ marginBottom: '30px' }}>ESTADÍSTICAS DEL JUGADOR</Typography>
                    <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px' }}>
                        <Grid container>
                            <Grid item xs={5}>
                                <Grid container>
                                    <DataTwoColumns sizeLabel={6} sizeValue={6} label='Rango' value={profile ? `${profile.userRank.rank.name} (${profile.userRank.rank.level})` : '--'}></DataTwoColumns>
                                    <DataTwoColumns sizeLabel={6} sizeValue={6} label='Experiencia' value={profile ? profile.userRank.currentExperience : '--'}></DataTwoColumns>
                                </Grid>
                            </Grid>
                            <div style={{ borderLeft: '1px solid lightgrey', height: '90px', mx: '10px', marginRight: '30px' }}></div>

                            <Grid item xs={5}>
                                <Grid container>
                                    <DataTwoColumns sizeLabel={6} sizeValue={6} label='Monedas' value={profile ? profile.coinsOwned : '--'}></DataTwoColumns>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>

                    <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ my: '30px' }}>OBJETOS DESBLOQUEADOS</Typography>
                    <CustomTabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: { '&.Mui-disabled': { opacity: 0.3 }, },
                        }}>
                        <CustomTab label="LOGROS" />
                        <CustomTab label="SINFONIAS" />
                        <CustomTab label="AVATARS" />
                    </CustomTabs>
                    <TabPanel value={value} index={0}>
                        <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {achievements.length > 0 ? achievements.map((achievement, idx) => (
                                <AchievementCard key={idx} achievement={achievement}></AchievementCard>
                            )) : <Typography>No cuentas con logros</Typography>}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {symphonies.length > 0 ? symphonies.map((symphony, idx) => (
                                <SymphonyCard key={idx} symphony={symphony}></SymphonyCard>
                            )) : <Typography>No cuentas con sinfonias</Typography>}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {avatars.length > 0 ? avatars.map((avatar1, idx) => (
                                <AvatarCard key={idx} avatar={avatar1}></AvatarCard>
                            )) : <Typography>No cuentas con avatars</Typography>}
                        </div>
                    </TabPanel>


                    <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => { toMarket() }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography className="button-perfil"> Ir a Tienda</Typography>
                        </Box>
                    </div>


                </Paper>
            }
        </React.Fragment>
    )


}

export default Perfil;