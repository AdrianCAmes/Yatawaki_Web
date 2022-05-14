import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SymphonyApis from "../apis/symphony-apis";
import UserApi from "../apis/user-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import { dateHourStringToDate } from "../utils/utils";
import AppBarYatawaki from "./components/AppBarYatawaki";
import SymphonyInstrumentsDialog from "./components/SymphonyInstrumentsDialog";
import SymphonySlider from "./components/SymphonySlider";



const YatawakiMenu = () => {
    const [index, setIndex] = useState(0);
    const [resume, setResume] = useState([]);
    const [symphonies, setSymphonies] = React.useState([]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);
    const [loading, setLoading] = React.useState(true);
    const mountedRef = React.useRef(true)

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const childCallback = (value) => {
        setIndex(value);
        //utilizar para mostrar current index
    }

    const selectSlider = () => {
        findInstruments(symphonies[index].idUnlockable);
        setOpenDialog(true);
    }

    const getUserResume = async () => {
        setLoading(true);
        UserApi.resume(gameContext.username)
            .then(response => {
                setResume(response.data);
                setSymphonies(response.data.symphonies);
                gameContext.updateUser(response.data.idUser);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }


    const findInstruments = async (symphonyId) => {
        setLoading(true);

        SymphonyApis.findInstrumentsBySymphonyId(symphonyId)
            .then(response => {
                gameContext.updateInstruments(response.data);
                setLoading(false);
            })
            .catch(err => {
                snackBarContext.onOpen({ severity: "error", message: err });
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    React.useEffect(() => {
        getUserResume();

        return () => {
            mountedRef.current = false
        }

    }, [gameContext.username]);



    return (
        <React.Fragment>
            {loading || gameContext.username === '' ? <CircularProgress style={{ position: 'absolute', right: '50%', top: '50%' }} /> : <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }} elevation={0}>

                <AppBarYatawaki resume={resume}></AppBarYatawaki>

                <SymphonyInstrumentsDialog open={openDialog} handleClose={handleCloseDialog}></SymphonyInstrumentsDialog>


                <SymphonySlider slides={symphonies} passToParent={childCallback} selectSlider={selectSlider} />
                <Box className="container-height" sx={{ backgroundColor: '#E8E8E0', px: '30px', paddingTop: '20px', mx: '30px', marginTop: '50px', height: '100%', borderRadius: '13px;' }}>
                    {symphonies.map((symphony, idx) => (
                        <h1 key={idx} >{idx === index ?
                            <>
                                <Typography fontSize={24} fontWeight={600}>{`${symphony.name} | ${symphony.type}`}</Typography>
                                <Typography fontSize={24} fontWeight={600}>{`${symphony.composer.name}. ${dateHourStringToDate(symphony.composer.deathDate)}`}</Typography>
                                <Typography fontSize={24} fontWeight={600}>{`${symphony.description}.`}</Typography>
                            </>
                            : null}</h1>
                    ))}
                </Box>

            </Paper>
            }
        </React.Fragment>
    )


}

export default YatawakiMenu;