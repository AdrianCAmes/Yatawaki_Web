import { Avatar, Box, Dialog, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";
import UserStats from "./UserStats";
import avatar from '../../assets/Logo UPC.png';
import UserApi from "../../apis/user-apis";

const AppBarYatawaki = () => {

    const [resume, setResume] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const gameContext = React.useContext(GameContext);
    const navigate = useNavigate();
    const mountedRef = React.useRef(true)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const getUserResume = async () => {
        setLoading(true);
        UserApi.resume()
            .then(response => {
                setResume(response.data)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {

        getUserResume();

        return () => {
            mountedRef.current = false
        }
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ height: '100px!important', padding: '20px' }}>
                <Grid container justifyContent='space-between' alignItems='center' sx={{ height: '100%!important' }}>
                    <Grid item xs={5}>
                        <Typography className="title-font title-appbar">
                            YATAWAKI
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <UserStats resume={resume}></UserStats>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ height: '80px', width: '80px' }} alt="Remy Sharp" src={resume ? `data:image/jpeg;base64,${resume.icon}` : avatar} />
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
                            <MenuItem>
                                <Typography textAlign="center">Editar Perfil</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center">Mis instrumentos</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center">Mis estadisticas</Typography>
                            </MenuItem>
                            <MenuItem>
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