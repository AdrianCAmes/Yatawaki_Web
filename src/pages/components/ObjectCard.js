

import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";


const SymphonyCard = (props) => {
    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' xs={3} sx={{ p: '30px' }}>
                <Grid item>
                    <Typography align="center" style={{ fontWeight: '600', fontSize: '24px', marginBottom: '10px' }}>{props.symphony.name}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ borderRadius: '10px', maxHeight: '160px', width: '160px', }} src={`data:image/jpeg;base64,${props.symphony.icon}`} alt="img" />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginBottom: '10px' }}>{props.symphony.description}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const AvatarCard = (props) => {
    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' xs={3} sx={{ p: '20px' }}>
                <Grid item>
                    <Typography align="center" style={{ fontWeight: '600', fontSize: '24px', marginBottom: '10px' }}>{props.avatar.name}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={`data:image/jpeg;base64,${props.avatar.icon}`} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginBottom: '10px' }}>{props.avatar.description}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const AchievementCard = (props) => {
    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' xs={3} sx={{ p: '20px' }}>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={`data:image/jpeg;base64,${props.achievement.icon}`} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginBottom: '10px' }}>{props.achievement.description}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export {
    SymphonyCard,
    AvatarCard,
    AchievementCard
};