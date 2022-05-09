import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


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
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px' }}>
                    <Typography fontWeight={600} fontSize={22}>
                        Acceso a camara denegada. Por favor revise los permisos.
                    </Typography>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle} onClick={() => {navigate(0)}}>
                            <Typography style={{ fontSize: '30px', color: '#FFF' }}> Realizado</Typography>
                        </Box>
                    </div>
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default CameraDeniedDialog;