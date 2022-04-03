import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useState } from "react";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";
import AppBarYatawaki from "./components/AppBarYatawaki";
import SelectInstrumentsDialog from "./components/SelectInstrumentsDialog";
import SymphonySlider from "./components/SymphonySlider";



const YatawakiMenu = () => {
    const [index, setIndex] = useState(0);
    const [symphonies, setSymphonies] = React.useState([]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);
    const [loading, setLoading] = React.useState(true);
    const [loader, setLoader] = React.useState(true);
    const mountedRef = React.useRef(true)

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const childCallback = (value) => {
        setIndex(value);
        //utilizar para mostrar current index
    }

    const onClickSlider = (current) => {
        console.log(symphonies[current])
        //openDialog
    }

    const findSymphonies = async () => {
        setLoading(true);

        if (gameContext.userId == 0 || !gameContext.userId) return;

        UserUnlockableApi.findSymphoniesByUser(gameContext.userId)
            .then(response => {
                setSymphonies(response.data);
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
        findSymphonies();
        setLoader(false);
        return () => {
            mountedRef.current = false
        }

    }, [loader, gameContext.userId]);



    return (
        <React.Fragment>
            {loading ? <CircularProgress /> : <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }} elevation={0}>

                <AppBarYatawaki></AppBarYatawaki>

                <SelectInstrumentsDialog open={openDialog} handleClose={handleCloseDialog}></SelectInstrumentsDialog>


                <SymphonySlider slides={symphonies} passToParent={childCallback} selectSlider={handleClickOpenDialog} />
                <Box className="container-height" sx={{ backgroundColor: '#E8E8E0', px: '30px', paddingTop: '20px', mx: '30px', marginTop: '50px', height: '100%', borderRadius: '13px;' }}>
                    {symphonies.map((symphony, idx) => (
                        <h1 key={idx} >{idx === index ? symphony.description : null}</h1>
                    ))}
                </Box>

            </Paper>
            }
        </React.Fragment>
    )


}

export default YatawakiMenu;