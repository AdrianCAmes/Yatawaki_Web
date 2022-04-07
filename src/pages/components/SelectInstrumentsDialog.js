import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import GameContext from "../../context/game-context";
import SnackBarContext from "../../context/snack-bar-context";
import InstrumentCard from "./InstrumentCard";

const SelectInstrumentsDialog = (props) => {


    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const snackBarContext = React.useContext(SnackBarContext);

    const selectInstrument = (newInstrument) => {
       gameContext.updateInstrumentsByIndex(newInstrument, props.selectedIdx);
       snackBarContext.onOpen({ severity: "success", message: 'Instrumento Seleccionado' });
       props.handleClose();
    }



    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} onClose={props.handleClose}  fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px' }}>
                    <Typography fontWeight={600} fontSize={22}>
                        Seleccione el/la {props.selected ? props.selected.name : '--'} que desee en su orquesta 
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                        {props.instruments.map((instrument, idx) => (
                            <InstrumentCard key={idx} instrument={instrument} onClick={() => { selectInstrument(instrument) }}></InstrumentCard>
                        ))}
                    </div>

                </div>
            </Dialog>
        </React.Fragment >
    )
}

export default SelectInstrumentsDialog;