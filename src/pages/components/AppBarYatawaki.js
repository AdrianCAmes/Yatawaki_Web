import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserStats from "./UserStats";
import avatar from '../../assets/Logo UPC.png';
import GameContext from "../../context/game-context";

const AppBarYatawaki = (props) => {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const gameContext = React.useContext(GameContext);

    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const logout = () => {
        gameContext.logout();
        window.localStorage.removeItem('jwt');
        navigate('/');
    };

    const toPerfil = () => {
        navigate('/perfil');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <React.Fragment>
            <Box sx={{ height: '100px!important', padding: '20px' }}>
                <Grid container justifyContent='space-between' alignItems='center' sx={{ height: '100%!important' }}>
                    <Grid item xs={6}>
                        <Typography className="title-font title-appbar">
                            YATAWAKI
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <UserStats resume={props.resume}></UserStats>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ height: '80px', width: '80px' }} alt="Remy Sharp" src={props.resume ? props.resume.icon : avatar} />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => { toPerfil() }}>
                                <Typography textAlign="center">Perfil</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/tutorial') }}>
                                <Typography textAlign="center">Tutorial</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { logout() }}>
                                <Typography textAlign="center">Cerrar Sesion</Typography>
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>

            </Box>
        </React.Fragment >
    )
}

export default AppBarYatawaki;