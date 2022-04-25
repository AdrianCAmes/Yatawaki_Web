import { CircularProgress, Dialog, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import piano from '../assets/piano.png';
import viola from '../assets/viola.png';
import chello from '../assets/chello.png';
import oboe from '../assets/oboe.png';
import arpa from '../assets/arpa.png';
import calibracion from '../assets/calibracion.png';
import guitar from '../assets/guitar.png';
import { PauseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import chopin from "../assets/songs/Chopin - Nocturne op.9 No.2.mp3"
import mozart from "../assets/songs/mozart.mp3"
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { useNavigate } from "react-router-dom";
import AudioController from "../context/audio-context-controller";

let buttonStyle = { width: '150px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '20px' };


const Game = () => {
    const navigate = useNavigate();
    const audioController = React.useContext(AudioController);


    let response = {
        "name": "Symphony n9",
        "initialBpm": 120,
        "songDuration": 120,
        "instruments": [
            { "name": "Piano", "image": piano, "position": "L", "audio": chopin },
            { "name": "Violin", "image": viola, "position": "L", "audio": chopin },
            { "name": "Chello", "image": chello, "position": "R", "audio": mozart },
            { "name": "Guitar", "image": guitar, "position": "R", "audio": mozart },
        ]
    }

    //progreso de la cancion
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const songDuration = 120; //segundos
    const initialBPM = 120; //bpm
    const [speed, setSpeed] = useState(10);

    //estados de animaciones
    const [animatePiano, setAnimatePiano] = useState(false);
    const [animateViolin, setAnimateViolin] = useState(false);
    const [animateChello, setAnimateChello] = useState(false);
    const [animateGuitar, setAnimateGuitar] = useState(false);

    const animateLeft = () => {
        setAnimateViolin(true);
        setAnimatePiano(true);
    }

    const animateRight = () => {
        setAnimateGuitar(true);
        setAnimateChello(true);
    }

    const stopAnimationLeft = () => {
        setAnimateViolin(false);
        setAnimatePiano(false);
    }

    const stopAnimationRight = () => {
        setAnimateGuitar(false);
        setAnimateChello(false);
    }

    const toRegister = () => {
        navigate('/login')
    };

    const startGame = () => {
        setOpen(false);
        animateLeft();
        animateRight();
        setTimerOn(true);
        audioController.start();
    }

    const setVariablesGame = () => {
        console.log("empezando el juego...");
        audioController.setSongs(response.instruments);
        audioController.setInitialBpm(response.initialBpm);
    }

    const changeSpeed = (newBpm) => {
        setSpeed((newBpm * 10) / initialBPM);
        audioController.setBPM(newBpm);
        console.log((newBpm * 10) / initialBPM)
    }

    React.useEffect(() => {
        let interval = null;

        if (timerOn) {
            //default speed = 10
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + speed);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn, speed]);


    // Cuando el porcentaje sea 100%, dirigir a resumen
    // React.useEffect(() => {
    //     if (Math.round((Math.floor((time / 1000)) / songDuration) * 100) > 100) {
    //         toRegister()
    //     }
    // }, [time]);


    const renderSwitch = (param) => {
        switch (param.name) {
            case 'Piano':
                return <div>
                    <img id="hola" style={{ position: 'absolute', left: '8%', top: '15%', height: '230px', }} src={param.image} className={`piano ${animatePiano ? "pianoAnimation" : ""}`} ></img>
                </div>
            case 'Guitar':
                return <div>
                    <img style={{ position: 'absolute', left: '52%', top: '29%', height: '170px' }} className={`guitar ${animateGuitar ? "guitarAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '10%', height: '170px' }} className={`guitar ${animateGuitar ? "guitarAnimation" : ""}`} src={param.image} ></img>
                </div>
            case 'Violin':
                return <div>
                    <img style={{ position: 'absolute', left: '18%', top: '45%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '25%', top: '30%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '34%', top: '17%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '28%', top: '60%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '32%', top: '48%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '39%', top: '36%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.image} ></img>
                </div>
            case 'Chello':
                return <div>
                    <img style={{ position: 'absolute', left: '58%', top: '43%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '60%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '70%', top: '20%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.image} ></img>
                    <img style={{ position: 'absolute', left: '75%', top: '43%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.image} ></img>
                </div>;
            default:
                return '';
        }
    }

    //modelo

    const URL = "https://teachablemachine.withgoogle.com/models/F6a7piIOE/";
    let model, webcam, ctx, ctx2, labelContainer, maxPredictions;
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 400;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementsByClassName("canvas");
        console.log(canvas)
        canvas[1].width = size; canvas[1].height = size;
        canvas[0].width = 250; canvas[0].height = 250;
        ctx = canvas[0].getContext("2d");
        ctx2 = canvas[1].getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
        setLoading(false);
    }

    const loop = async () => {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    const predict = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        drawPose(pose);
    }

    const drawPose = async (pose) => {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            ctx2.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx2);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx2);
            }
        }
    }

    //seteo variables iniciales de juego
    React.useEffect(() => {
        setVariablesGame();
    }, []);




    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100%', width: '100%', padding: '10px' }} elevation={0}>
                <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66', padding: '30px', display: 'flex', alignItems: 'center' } }} open={open} onClose={() => { setOpen(false) }} fullWidth maxWidth="lg">

                    <div style={{ width: '100%', marginBottom: '20px' }}>
                        <Typography fontWeight='600' fontSize="30px!important"> Calibra tu cuerpo con la cámara web:</Typography>
                    </div>

                    {loading ? <Box className="hover" sx={buttonStyle} onClick={() => { init() }}>
                        <Typography className="title-button" fontSize="30px!important" > Iniciar</Typography>
                    </Box> : ''}
                    {loading && <CircularProgress style={{ marginTop: '30px' }}></CircularProgress>}

                    <canvas style={{ height: '300px!important', width: '300px!important' }} className="canvas"></canvas>
                    {!loading && <img style={{ position: 'absolute', height: '400px', width: '400px', top: '95px' }} src={calibracion} />}
                    <div id="label-container"></div>
                    {!loading ? <Box className="hover" sx={buttonStyle} onClick={() => { startGame() }}>
                        <Typography className="title-button" fontSize="30px!important" > Realizado</Typography>
                    </Box> : ''}
                </Dialog>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'flex' }}> Ahora tocando: {response.name}</Typography>


                    <Box sx={{ width: '30%' }}>
                        <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.round((Math.floor((time / 1000)) / songDuration) * 100)}%</Typography>
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Typography> */}
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.floor((time / 1000))}-</Typography> */}
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.floor((time / 1000))} segundos</Typography> */}
                        <LinearProgress variant="determinate" value={(Math.floor((time / 1000)) / songDuration) * 100} style={{ height: '10px', borderRadius: 5 }} />
                    </Box>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box className="hover" style={{ backgroundColor: '#FF5E5B', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
                            <PauseRounded style={{ color: '#FFF', fontSize: '50px' }} />
                        </Box>
                    </div>
                </div>
                {response.instruments.map((instrument, idx) => (
                    <div key={idx}>{renderSwitch(instrument)}</div>
                ))}
                <canvas style={{ position: 'absolute', left: '40%', top: '62%', borderRadius: '30px', visibility: !open ? 'visible' : 'hidden' }} className={`canvas ${!open ? "canvasAnimation" : ""}`}></canvas>
                <button style={{ position: 'absolute', left: '40%', top: '62%', borderRadius: '30px' }} onClick={() => { stopAnimationLeft() }}>stop left</button>
                <button style={{ position: 'absolute', left: '40%', top: '66%', borderRadius: '30px' }} onClick={() => { animateLeft() }}>start Left</button>
                <button style={{ position: 'absolute', left: '45%', top: '62%', borderRadius: '30px' }} onClick={() => { stopAnimationRight() }}>stop Right</button>
                <button style={{ position: 'absolute', left: '45%', top: '66%', borderRadius: '30px' }} onClick={() => { animateRight() }}>start right</button>
                <button style={{ position: 'absolute', left: '50%', top: '66%', borderRadius: '30px' }} onClick={() => { changeSpeed(200) }}>hightBPM</button>
                <button style={{ position: 'absolute', left: '50%', top: '62%', borderRadius: '30px' }} onClick={() => { changeSpeed(initialBPM) }}>restartBPM</button>
                <button style={{ position: 'absolute', left: '50%', top: '70%', borderRadius: '30px' }} onClick={() => { changeSpeed(80) }}>lowBPM</button>

            </Paper>
        </React.Fragment>
    )


}

export default Game;