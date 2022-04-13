import { AddBox, Star } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React from "react";
import solIcon from "../../assets/sol.png"
import monedaIcon from "../../assets/moneda.png"

const UserStats = (props) => {
 
    const mountedRef = React.useRef(true)


    React.useEffect(() => {

        return () => {
            mountedRef.current = false
        }
    }, []);

    const styles = {
        typography: {
            fontSize: 18,
            color: '#FFF',
            fontWeight: 600,
            position: "relative",
            top: "-42px",
            right: "-20px"

        }
    };

    return (
        <React.Fragment>
            <Grid container spacing={3} justifyContent='space-between' alignItems='center'>
                <Grid item xs={6}>
                    <div style={{ backgroundColor: '#D8D8D8', borderRadius: '10px', height: '45px', width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px', paddingLeft: '4px' }}>
                        <div >
                            <Star style={{ color: '#4285F4', fontSize: "50px", marginTop: '35px' }}></Star>
                            <Typography style={styles.typography}>{props.resume ? props.resume.level : '-'}</Typography>
                        </div>
                        <Typography style={{ fontSize: '30px', fontWeight: '600' }}> {props.resume ? props.resume.currentExperience : '-'}</Typography>
                        <div></div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ backgroundColor: '#D8D8D8', borderRadius: '10px', height: '45px', width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '3px', paddingLeft: '4px' }}>
                        <AddBox style={{ color: '#34A853', fontSize: "55px", marginLeft:'-15px' }}></AddBox>
                        <Typography style={{ fontSize: '30px', fontWeight: '600' }}> {props.resume ? props.resume.coinsOwned : '-'}</Typography>
                        <img width='30px' src={monedaIcon} alt="moneda" />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default UserStats;