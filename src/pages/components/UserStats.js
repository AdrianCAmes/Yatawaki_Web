import { Box, Dialog, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";

const UserStats = (props) => {

    const [mostrarProgreso, setMostrarProgreso] = React.useState(false);

    const gameContext = React.useContext(GameContext);
    const navigate = useNavigate();
    const mountedRef = React.useRef(true)


    React.useEffect(() => {

        return () => {
            mountedRef.current = false
        }
    }, []);

    return (
        <React.Fragment>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item xs={4}>
                    <div style={{ backgroundColor: '#D8D8D8', borderRadius: '10px', height: '40px', width: '80%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        133
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ backgroundColor: '#D8D8D8', borderRadius: '10px', height: '40px', width: '80%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        8
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ backgroundColor: '#D8D8D8', borderRadius: '10px', height: '40px', width: '80%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                      {props.resume ? props.resume.coinsOwned : '--'}
                    </div>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default UserStats;