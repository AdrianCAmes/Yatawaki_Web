import { Button, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SnackBarContext from "../context/snack-bar-context";


const Yatawaki = () => {
    
    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate()

    const logout = () => {
        snackBarContext.onOpen({ severity: "success", message: "Successfully Logged Out" });
        window.localStorage.clear();
        navigate('/');
    }

    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.main', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="secondary"  onClick={() => { logout() }}>
                    Logout
                </Button>
            </Paper>
        </React.Fragment>
    )


}

export default Yatawaki;