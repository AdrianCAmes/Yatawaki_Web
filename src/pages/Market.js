
import { ArrowBackIosRounded, TryOutlined } from "@mui/icons-material";
import { Avatar, CircularProgress, Grid, Paper, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import PropTypes from 'prop-types';
import { Box } from "@mui/system";
import { AchievementCard, AvatarCard, ItemCard, SymphonyCard } from "./components/ObjectCard";
import styled from "@emotion/styled";
import ConfirmTradeDialog from "./components/ConfirmTradeDialog";

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

const Market = () => {
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState(null);
    const [unlockable, setUnlockable] = React.useState(null);
    const [achievements, setAchievements] = React.useState([]);
    const [avatars, setAvatars] = React.useState([]);
    const [symphonies, setSymphonies] = React.useState([]);

    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onClickTrade = (tradeUnlockable) => {
        setUnlockable(tradeUnlockable);
        setOpenDialog(true);
    };

    


    const toHome = () => {
        navigate('/perfil')
    };


    const getMarket = async () => {
        setLoading(true);
        UserUnlockableApi.findUserMarket(gameContext.userId)
            .then(response => {
                //console.log(response.data);
                setAchievements(response.data.achievements);
                setAvatars(response.data.avatars);
                setSymphonies(response.data.symphonies);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        getMarket();

    }, [gameContext.userId]);

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <React.Fragment>
            {loading ? <CircularProgress style={{position:'absolute', right:'50%', top:'50%'}}></CircularProgress> :
                <Paper square={true} sx={{ backgroundColor: 'primary.light', padding: '40px' }} elevation={0}>
                    <ConfirmTradeDialog  open={openDialog} handleClose={handleCloseDialog} unlockable={unlockable}>  </ConfirmTradeDialog>
                    <div className="hover" onClick={() => { toHome() }} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <ArrowBackIosRounded fontSize="medium" />
                        <Typography fontWeight={600} fontSize={24} sx={{ marginLeft: '10px' }}>Atrás</Typography>
                    </div>

                    <Typography className="title-font title-perfil">TIENDA DE OBJECTOS</Typography>

                    <CustomTabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto"
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: { '&.Mui-disabled': { opacity: 0.3 }, },
                        }}>
                        <CustomTab label="LOGROS" />
                        <CustomTab label="SINFONIAS" />
                        <CustomTab label="AVATARS" />
                    </CustomTabs>
                    <TabPanel value={value} index={0}>
                        <div style={{ width: '100%', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {achievements.length > 0 ? achievements.map((achievement, idx) => (
                                <ItemCard key={idx} item={achievement} onClickTrade={onClickTrade}></ItemCard>
                            )) : <Typography>No hay logros disponibles</Typography>}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{ width: '100%', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {symphonies.length > 0 ? symphonies.map((symphony, idx) => (
                                <ItemCard key={idx} item={symphony} onClickTrade={onClickTrade}></ItemCard>
                            )) : <Typography>No hay sinfonias disponibles</Typography>}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{ width: '100%', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                            {avatars.length > 0 ? avatars.map((avatar1, idx) => (
                                <ItemCard key={idx} item={avatar1} onClickTrade={onClickTrade}></ItemCard>
                            )) : <Typography>No hay avatars disponibles</Typography>}
                        </div>
                    </TabPanel>


                </Paper>
            }
        </React.Fragment>
    )


}

export default Market;