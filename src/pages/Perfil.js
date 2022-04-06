 
import { Paper } from "@mui/material";
import React from "react"; 
import { useNavigate } from "react-router-dom";
import UserApi from "../apis/user-apis";
import UserUnlockableApi from "../apis/user-unlockable-apis";
import GameContext from "../context/game-context";
import SnackBarContext from "../context/snack-bar-context";



const Perfil = () => {

    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);

    const navigateLogin = () => {
        navigate(`/login`);
    }

    const navigateRegister = () => {
        navigate(`/register`);
    }

    const getUser = async () => {
        setLoading(true);
        UserApi.getUserById(gameContext.userId)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    const getUserUnlockables = async () => {
        setLoading(true);
        UserUnlockableApi.findUserUnlockable(gameContext.userId)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        getUserUnlockables();
        getUser();

    }, [gameContext.userId]);


    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
 
            </Paper>
        </React.Fragment>
    )


}

export default Perfil;