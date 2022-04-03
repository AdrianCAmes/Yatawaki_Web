import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SnackBarContext from "../../context/snack-bar-context";
import InstrumentCard from "./InstrumentCard";

const SelectInstrumentsDialog = (props) => {

    const [mostrarProgreso, setMostrarProgreso] = React.useState(false);

    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate();
    const mountedRef = React.useRef(true)


    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Dialog PaperProps={{ style: { borderRadius: '50px' } }} open={props.open} onClose={props.handleClose} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px' }}>
                    <Typography fontWeight={600} fontSize={22}>
                        Esta sinfonía requiere de los siguientes tipos de instrumentos:
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {props.instruments.map((instrument, idx) => (
                            <InstrumentCard key={idx} instrument={instrument}></InstrumentCard>
                        ))}
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography style={{ fontSize: '30px', color: '#FFF' }}> Continuar</Typography>
                        </Box>
                    </div>
                </div>
            </Dialog>
        </React.Fragment >
    )
}

export default SelectInstrumentsDialog;