

import { Grid, Typography } from "@mui/material";
import React from "react";


const InstrumentCard = (props) => {


    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' xs={3} sx={{marginTop:'30px'}} className="hover" onClick={props.onClick}>
                <Grid item>
                    <Typography style={{fontWeight:'600', fontSize:'30px', marginBottom:'10px'}}>{props.instrument.shortDescription}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ border: '1px solid #000', borderRadius: '10px', padding:'10px', height: '160px',  width:'120px', display:'flex', justifyContent:'center' }}>
                        <img height='140px' src={props.instrument.icon} alt="img" />
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )


}

export default InstrumentCard;