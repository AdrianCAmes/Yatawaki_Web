import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import cameraError from "../../assets/error_camera.webp";


const CameraDeniedDialog = (props) => {

    const mountedRef = React.useRef(true);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>


            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} onClose={props.handleClose} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {props.isCameraDenied ?
                        <>
                            <Typography fontWeight={600} fontSize={32} style={{ marginBottom: '15px' }}>
                                Acceso a camara denegada. Por favor revise los permisos.
                            </Typography>
                            <img src={cameraError} height="50%" />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box className="hover" sx={buttonStyle} onClick={() => { navigate(0) }}>
                                    <Typography style={{ fontSize: '30px', color: '#FFF' }}> Realizado</Typography>
                                </Box>
                            </div>
                        </> :
                        <>
                            <Typography fontWeight={600} fontSize={32} style={{ marginBottom: '15px' }}>
                                No se ha detectado jugador. Por favor revisa tu camara.
                            </Typography>
                            <img src={cameraError} height="70%" />

                        </>
                    }
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default CameraDeniedDialog;