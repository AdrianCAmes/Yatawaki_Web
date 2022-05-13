import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PauseMenu = (props) => {
    const mountedRef = React.useRef(true)
    const navigate = useNavigate();
  

    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px',alignContent: 'center' }}>
                    <Typography fontWeight={600} fontSize={50} style={{ textAlign: 'center' }}>
                        Juego Pausado
                    </Typography>
                    <div style={{ height: '10%'}}></div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography onClick={() => {props.resume()}} style={{ fontSize: '30px', color: '#FFF' }}> Continuar </Typography>
                        </Box>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography onClick={() => {navigate(0)}} style={{ fontSize: '30px', color: '#FFF' }}> Reiniciar </Typography>
                        </Box>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography onClick={() => {props.exit()}} style={{ fontSize: '30px', color: '#FFF' }}> Salir</Typography>
                        </Box>
                    </div>
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default PauseMenu;