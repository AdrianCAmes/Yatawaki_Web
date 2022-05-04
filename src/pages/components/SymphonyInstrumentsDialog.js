import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InstrumentApis from "../../apis/instrument-apis";
import GameContext from "../../context/game-context";
import InstrumentCard from "./InstrumentCard";
import SelectInstrumentsDialog from "./SelectInstrumentsDialog";

const SymphonyInstrumentsDialog = (props) => {

    const [loading, setLoading] = React.useState(true);
    const mountedRef = React.useRef(true);
    const gameContext = React.useContext(GameContext);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [instruments, setInstruments] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [selectedIdx, setSelectedIdx] = React.useState(null);
    const navigate = useNavigate();


    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const selectInstrument = (instrument, idx) => {
        InstrumentApis.findInstrumentsByName(instrument.name)
            .then(response => {
                setSelectedIdx(idx)
                setSelected(instrument);
                setInstruments(response.data);
                setOpenDialog(true);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
    }

    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <SelectInstrumentsDialog open={openDialog} handleClose={handleCloseDialog} instruments={instruments} selected={selected} selectedIdx={selectedIdx}></SelectInstrumentsDialog>

            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} onClose={props.handleClose} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px' }}>
                    <Typography fontWeight={600} fontSize={22}>
                        Esta sinfonía requiere de los siguientes instrumentos. Personalice su orquesta dando click en uno de ellos.
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                        {gameContext.instruments.map((instrument, idx) => (
                            <InstrumentCard onClick={() => { selectInstrument(instrument, idx) }} key={idx} instrument={instrument}></InstrumentCard>
                        ))}
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle} onClick={() => {navigate('/game')}}>
                            <Typography style={{ fontSize: '30px', color: '#FFF' }}> Continuar</Typography>
                        </Box>
                    </div>
                </div>
            </Dialog>

        </React.Fragment >
    )
}

export default SymphonyInstrumentsDialog;