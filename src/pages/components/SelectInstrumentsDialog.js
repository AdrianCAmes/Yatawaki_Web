import { Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SnackBarContext from "../../context/snack-bar-context";

const SelectInstrumentsDialog = (props) => {

    const [mostrarProgreso, setMostrarProgreso] = React.useState(false);

    const snackBarContext = React.useContext(SnackBarContext);
    const navigate = useNavigate();
    const mountedRef = React.useRef(true)


    const findInstruments = async () => {
        setMostrarProgreso(true)

    }

    React.useEffect(() => {

        return () => {
            mountedRef.current = false
        }
    }, []);

    return (
        <React.Fragment>
            <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding:'50px' }}>
                    <Typography fontWeight={600} fontSize={22}>
                        Esta sinfonía requiere de los siguientes tipos de instrumentos:
                    </Typography>
                    <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center' }}>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                        <p>a</p>
                    </div>
                </div>
            </Dialog>
        </React.Fragment >
    )
}

export default SelectInstrumentsDialog;