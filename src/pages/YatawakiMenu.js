import { Box, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import { SliderData } from "../components/SliderData";
import SymphonySlider from "../components/SymphonySlider";
import SnackBarContext from "../context/snack-bar-context";



const YatawakiMenu = () => {
    const [index, setIndex] = useState(0);
    const [symphonies, setSymphonies] = React.useState([]);

    const snackBarContext = React.useContext(SnackBarContext);
    const [loading, setLoading] = React.useState(false);
    const [loader, setLoader] = React.useState(true)


    const childCallback = (value) => {
        setIndex(value)
    }

    const findSymphonies = async () => {
        setLoading(true);

        UserUnlockableApi.findSymphoniesByUser()
            .then(response => {
                console.log(response.data);
                setSymphonies(response.data);
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

        setLoading(false)
        setLoader(false)

    }, [loader]);



    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh' }} elevation={0}>
                <Box sx={{ backgroundColor: 'primary.main', height: '100px' }}>{index}</Box>

                <SymphonySlider slides={SliderData} passToParent={childCallback} />
                <Box className="container-height" sx={{ backgroundColor: '#E8E8E0', px: '30px', paddingTop: '20px', mx: '30px', marginTop: '50px',  height: '100%', borderRadius: '13px;' }}>
                    {symphonies.map((symphony, idx) => (
                        <h1 key={idx} >{idx === index ? symphony.description : null}</h1>
                    ))}
                </Box>




            </Paper>
        </React.Fragment>
    )


}

export default YatawakiMenu;