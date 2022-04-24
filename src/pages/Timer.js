import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";



const Timer = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    React.useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);


    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                <div>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                </div>
                <div>
                    {!timerOn && time === 0 && (
                        <Button onClick={() => setTimerOn(true)}>Start</Button>
                    )}
                    {timerOn && <Button onClick={() => setTimerOn(false)}>Stop</Button>}
                    {!timerOn && time > 0 && (
                        <Button onClick={() => setTime(0)}>Reset</Button>
                    )}
                    {!timerOn && time > 0 && (
                        <Button onClick={() => setTimerOn(true)}>Resume</Button>
                    )}
                </div>

            </Paper>
        </React.Fragment>
    )


}

export default Timer;