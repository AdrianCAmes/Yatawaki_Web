import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserUnlockableApi from "../../apis/user-unlockable-apis";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";
import { ItemCard, ItemToTradeCard } from "./ObjectCard";

const ConfirmTradeDialog = (props) => {
    const mountedRef = React.useRef(true)
    const navigate = useNavigate()
    const snackBarContext = React.useContext(SnackBarContext);
    const gameContext = React.useContext(GameContext);

    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '180px', height: '40px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };
    let buttonStyleSecondary = { width: '180px', height: '40px', borderRadius: '15px', mx: '40px', backgroundColor: '#D8D8D8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };

    const trade = async () => {
        UserUnlockableApi.trade(gameContext.userId, props.unlockable.idUnlockable)
            .then(response => {
                snackBarContext.onOpen({
                    severity: "success",
                    message: "Éxito"
                });
                navigate(0);
            })
            .catch(err => {
                props.handleClose()
                snackBarContext.onOpen({
                    severity: "error",
                    message: err
                });
            })
            
    }

    return (
        <React.Fragment>
            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} onClose={() => { props.handleClose() }} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography fontWeight={600} fontSize={40} style={{ textAlign: 'center' }}>
                        ¿Estás seguro que deseas canjear el siguiente objecto?
                    </Typography>
                    <ItemToTradeCard item={props.unlockable}></ItemToTradeCard>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box className="hover" onClick={() => { props.handleClose() }} sx={buttonStyleSecondary}>
                            <Typography className="button-perfil2"> Cancelar</Typography>
                        </Box>
                        <Box className="hover" onClick={() => { trade() }} sx={buttonStyle}>
                            <Typography className="button-perfil"> Aceptar</Typography>
                        </Box>
                    </div>
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default ConfirmTradeDialog;