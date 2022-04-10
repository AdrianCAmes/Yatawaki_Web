import { Paper, Typography } from "@mui/material";
import React from "react";
import piano from '../assets/piano.png';
import viola from '../assets/viola.png';
import chello from '../assets/chello.png';
import oboe from '../assets/oboe.png';
import arpa from '../assets/arpa.png';
import { PauseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

const Game = () => {

    let instruments = [
        { "nombre": "Piano", "asset": piano },
        { "nombre": "Harp", "asset": arpa },
        { "nombre": "Violin", "asset": viola },
        { "nombre": "Viola", "asset": viola },
        { "nombre": "Chello", "asset": chello },
        { "nombre": "Oboe", "asset": oboe },
    ]

    const renderSwitch = (param) => {
        switch (param.nombre) {
            case 'Piano':
                return <div>
                    <img style={{ position: 'absolute', left: '16%', top: '44%', height: '170px', transform: 'rotate(-60deg)' }} src={param.asset} ></img>
                </div>
            case 'Harp':
                return <div>
                    <img style={{ position: 'absolute', left: '20%', top: '28%', height: '160px', transform: 'rotate(-40deg)' }} src={param.asset} ></img>
                </div>
            case 'Oboe':
                return <div>
                    <img style={{ position: 'absolute', left: '42%', top: '18%', height: '100px', transform: 'rotate(-45deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '52%', top: '18%', height: '100px', transform: 'rotate(-45deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '47%', top: '18%', height: '100px', transform: 'rotate(-45deg)' }} src={param.asset} ></img>
                </div>
            case 'Violin':
                return <div>
                    <img style={{ position: 'absolute', left: '26%', top: '56%', height: '130px', transform: 'rotate(60deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '29%', top: '46%', height: '130px', transform: 'rotate(80deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '35%', top: '38%', height: '130px', transform: 'rotate(100deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '34%', top: '62%', height: '130px', transform: 'rotate(60deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '36%', top: '55%', height: '130px', transform: 'rotate(80deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '39%', top: '50%', height: '130px', transform: 'rotate(100deg)' }} src={param.asset} ></img>
                </div>
            case 'Viola':
                return <div>
                    <img style={{ position: 'absolute', left: '41%', top: '34%', height: '150px', transform: 'rotate(120deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '44%', top: '45%', height: '150px', transform: 'rotate(120deg) ' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '47%', top: '32%', height: '150px', transform: 'rotate(130deg) ' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '50%', top: '45%', height: '150px', transform: 'rotate(140deg) ' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '53%', top: '34%', height: '150px', transform: 'rotate(140deg) ' }} src={param.asset} ></img>
                </div>;
            case 'Chello':
                return <div>
                    <img style={{ position: 'absolute', left: '54%', top: '46%', height: '200px', transform: 'rotate(30deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '58%', top: '56%', height: '200px', transform: 'rotate(45deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '61%', top: '29%', height: '200px', transform: 'rotate(30deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '69%', top: '41%', height: '200px', transform: 'rotate(45deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '59%', top: '67%', height: '200px', transform: 'rotate(60deg)' }} src={param.asset} ></img>
                    <img style={{ position: 'absolute', left: '73%', top: '56%', height: '200px', transform: 'rotate(60deg)' }} src={param.asset} ></img>
                </div>;
            default:
                return '';
        }
    }



    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100%', width: '100%', padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'flex' }}> Ahora tocando: Symphony No. 9</Typography>
                    <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> 0% Completado</Typography>
                    <div style={{flex:1, display: 'flex', justifyContent:'flex-end'}}>
                        <Box className="hover" style={{ backgroundColor: '#FF5E5B', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
                            <PauseRounded style={{ color: '#FFF', fontSize: '50px' }} />
                        </Box>
                    </div>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', fontSize: '60px', lineHeight: '0px' }}>.</div>
                {instruments.map((instrument, idx) => (
                    <div>{renderSwitch(instrument)}</div>
                ))}
            </Paper>
        </React.Fragment>
    )


}

export default Game;