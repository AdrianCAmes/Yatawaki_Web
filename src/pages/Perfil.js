
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Avatar, Grid, Paper, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import avatar from '../assets/avatar.png';
import PropTypes from 'prop-types';
import { Box } from "@mui/system";
import { AvatarCard, SymphonyCard } from "./components/ObjectCard";

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

const Perfil = () => {
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);
    const [achievements, setAchievements] = React.useState([]);
    const [avatars, setAvatars] = React.useState([]);
    const [symphonies, setSymphonies] = React.useState([]);

    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                setSymphonies(response.data.symphonies);
                setAvatars(response.data.avatars);
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

                <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ marginBottom: '30px' }}>ESTADÍSTICAS DEL JUGADOR</Typography>
                <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px' }}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Grid container>
                                <DataTwoColumns sizeLabel={6} sizeValue={6} label='Rango' value={'--'}></DataTwoColumns>
                                <DataTwoColumns sizeLabel={6} sizeValue={6} label='Experiencia' value={'--'}></DataTwoColumns>
                            </Grid>
                        </Grid>
                        <div style={{ borderLeft: '1px solid lightgrey', height: '90px', mx: '10px', marginRight: '30px' }}></div>

                        <Grid item xs={5}>
                            <Grid container>
                                <DataTwoColumns sizeLabel={6} sizeValue={6} label='Monedas' value={profile ? profile.coinsOwned : '--'}></DataTwoColumns>
                                <DataTwoColumns sizeLabel={6} sizeValue={6} label='Notas' value={profile ? profile.notesOwned : '--'}></DataTwoColumns>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <Typography fontWeight={600} className="title-font subtitle-perfil" sx={{ my: '30px' }}>OBJETOS DESBLOQUEADOS</Typography>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: { '&.Mui-disabled': { opacity: 0.3 }, },
                    }}>
                    <Tab label="LOGROS" />
                    <Tab label="SINFONIAS" />
                    <Tab label="AVATARS" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {symphonies.map((symphony, idx) => (
                            <SymphonyCard key={idx} symphony={symphony}></SymphonyCard>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <div style={{ width: '90%', backgroundColor: '#E8E8E0', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {avatars.map((avatar, idx) => (
                            <AvatarCard key={idx} avatar={avatar}></AvatarCard>
                        ))}
                    </div>
                </TabPanel>


                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Box className="hover" sx={buttonStyle}>
                        <Typography className="button-perfil"> Ir a Tienda</Typography>
                    </Box>
                </div>


            </Paper>
        </React.Fragment>
    )


}

export default Perfil;