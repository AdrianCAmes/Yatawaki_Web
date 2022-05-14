

import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import moneda from "../../assets/moneda.png";


const SymphonyCard = (props) => {
    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' xs={3} sx={{ p: '30px' }}>
                <Grid item>
                    <Typography align="center" style={{ fontWeight: '600', fontSize: '24px', marginBottom: '10px' }}>{props.symphony.name}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ borderRadius: '10px', maxHeight: '160px', width: '160px', }} src={props.symphony.icon} alt="img" />
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
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={props.avatar.icon} />
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
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={props.achievement.icon} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginBottom: '10px' }}>{props.achievement.description}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

let buttonStyle = { width: '150px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '10px' };

const ItemCard = (props) => {

    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' justifyContent='center' xs={5} sx={{ p: '20px', backgroundColor: '#D8D8D899', borderRadius: '15px', height: '300px', marginBottom:'20px' }}>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px' }} alt="avatar" src={props.item ? props.item.icon : moneda} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginTop: '10px' }}>{props.item ? props.item.description : '--'}</Typography>
                </Grid>
                <Grid item>
                    <Box sx={buttonStyle} className="hover" onClick={() => { props.onClickTrade(props.item) }}>
                        <img src={moneda} height="35px" width="35px" />
                        <Typography marginLeft="10px">{props.item ? props.item.coinsCost : '--'}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const ItemToTradeCard = (props) => {

    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' justifyContent='center' xs={5} sx={{ p: '10px', borderRadius: '15px', height: '300px' }}>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginTop: '10px', fontWeight: '600', }}>{props.item ? props.item.name : '--'}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #777', padding: '1px', marginTop: '10px', }} alt="avatar" src={props.item ? props.item.icon : moneda} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '16px', marginTop: '20px', fontWeight: '600', }}>{props.item ? props.item.description : '--'}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const TutorialCard = (props) => {

    return (
        <React.Fragment>
            <Grid container direction='column' alignItems='center' justifyContent='center' xs={5} sx={{ p: '10px', borderRadius: '15px' }}>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '22px', marginBottom: '10px', fontWeight: '600', }}>{props.item ? props.item.name : '--'}</Typography>
                </Grid>
                <Grid item>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ height: '200px',  border: '1px solid #777', padding: '1px' }} alt="gift" src={props.item ? props.item.icon : moneda} />
                    </div>
                </Grid>
                <Grid item>
                    <Typography align="center" style={{ fontSize: '22px', marginTop: '20px', fontWeight: '600', }}>{props.item ? props.item.description : '--'}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export {
    SymphonyCard,
    AvatarCard,
    AchievementCard,
    ItemCard,
    ItemToTradeCard,
    TutorialCard
};