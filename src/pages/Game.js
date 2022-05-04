import { CircularProgress, Dialog, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import calibracion from '../assets/calibracion.png';
import { PauseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { useNavigate } from "react-router-dom";
import AudioController from "../context/audio-context-controller";
import PoseContext from "../context/pose-controller";
import PauseMenu from "./components/PauseMenu";
import ConcertApis from "../apis/concert-apis";
import SnackBarContext from "../context/snack-bar-context";

let buttonStyle = { width: '150px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '20px' };


const Game = () => {
    const navigate = useNavigate();
    const audioController = React.useContext(AudioController);
    const poseController = React.useContext(PoseContext);
    const snackBarContext = React.useContext(SnackBarContext);


    // let response = {
    //     "name": "Symphony n9",
    //     "initialBpm": 120,
    //     "songDuration": 120,
    //     "instruments": [
    //         { "name": "Piano", "image": piano, "position": "L", "audio": mozart },
    //         { "name": "Violin", "image": viola, "position": "L", "audio": mozart },
    //         { "name": "Chello", "image": chello, "position": "R", "audio": mozart },
    //         { "name": "Guitar", "image": guitar, "position": "R", "audio": mozart },
    //     ]
    // }

    //progreso de la cancion
    const [time, setTime] = useState(0);
    const [response, setResponse] = useState(null);
    const [timerOn, setTimerOn] = useState(false);
    const [currentBPM, setCurrentBPM] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(72);
    const [songDuration, setSongDuration] = useState(0);

    const [speed, setProgressSpeed] = useState(10);

    const [puntaje, setPuntaje] = useState(0);


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
        poseController.startController(response.initialBpm)
        audioController.start();
    }

    const startConcert = () => {
        let response2 = {
            "idConcert": 72,
            "name": "Nocturne Op 9 No 2",
            "initialBpm": 122,
            "duration": 270,
            "instruments": [
                {
                    "name": "Piano",
                    "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Instruments/Pianos/piano_casio.png",
                    "position": "L",
                    "track": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Multitracks/Piano/piano_casio.mp3"
                },
                {
                    "name": "Violin",
                    "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Instruments/Violins/violin_casio.png",
                    "position": "L",
                    "track": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Multitracks/Violin/violin_casio.mp3"
                },
                {
                    "name": "Cello",
                    "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Instruments/Cellos/cello_casio.png",
                    "position": "R",
                    "track": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Multitracks/Cello/cello_casio.mp3"
                },
                {
                    "name": "Guitar",
                    "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Instruments/Guitars/guitar_casio.png",
                    "position": "R",
                    "track": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Multitracks/Guitar/guitar_casio.mp3"
                }
            ]
        }
        audioController.setSongs(response2.instruments);
        audioController.setInitialBpm(response2.initialBpm);
        setSongDuration(response2.duration)
        setCurrentBPM(response2.initialBpm);
        setResponse(response2);
        // ConcertApis.startConcert()
        //     .then(response => {
        //         //console.log(response.data);
        //         //response = response.data;
        //         setResponse(response.data);
        //         console.log(response);
        //         console.log("empezando el juego...");

        //         audioController.setSongs(response.data.instruments);
        //         audioController.setInitialBpm(response.data.initialBpm);
        //         setSongDuration(response.data.duration)
        //         setCurrentBPM(response.data.initialBpm);

        //     })
        //     .catch(err => {
        //         snackBarContext.onOpen({ severity: "error", message: err });
        //         console.log(err);
        //     })
    }


    React.useEffect(() => {
        let interval = null;

        if (timerOn) {
            //default speed = 10
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + speed);
            }, 9);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn, speed]);


    //Cuando el porcentaje sea 100%, dirigir a resumen
    React.useEffect(() => {
        if (Math.round((Math.floor((time / 1000)) / songDuration) * 100) > 100) {
            //toRegister()
            //alert('tiempo cumplido, por favor refrescar')
            audioController.stop()
            navigate('/game-resume', {
                state: {
                    puntaje: puntaje
                }
            })
        }
    }, [time]);


    const renderSwitch = (param) => {
        switch (param.name) {
            case 'Piano':
                return <div>
                    <img id="hola" style={{ position: 'absolute', left: '8%', top: '15%', height: '230px', }} src={param.icon} className={`piano ${animatePiano ? "pianoAnimation" : ""}`} ></img>
                </div>
            case 'Guitar':
                return <div>
                    <img style={{ position: 'absolute', left: '52%', top: '29%', height: '170px' }} className={`guitar ${animateGuitar ? "guitarAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '10%', height: '170px' }} className={`guitar ${animateGuitar ? "guitarAnimation" : ""}`} src={param.icon} ></img>
                </div>
            case 'Violin':
                return <div>
                    <img style={{ position: 'absolute', left: '18%', top: '45%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '25%', top: '30%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '34%', top: '17%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '28%', top: '60%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '32%', top: '48%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '39%', top: '36%', height: '180px' }} className={`violin ${animateViolin ? "violinAnimation" : ""}`} src={param.icon} ></img>
                </div>
            case 'Cello':
                return <div>
                    <img style={{ position: 'absolute', left: '58%', top: '43%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '60%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '70%', top: '20%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '75%', top: '43%', height: '220px' }} className={`chello ${animateChello ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                </div>;
            default:
                return '';
        }
    }

    //modelo

    const URLRight = "https://teachablemachine.withgoogle.com/models/DpJQ3G2-Y/";
    const URLLeft = "https://teachablemachine.withgoogle.com/models/fRIw5b4gL/";
    let modelRight, webcam, ctx, ctx2, labelContainerRight, maxPredictionsRight, modelLeft, labelContainerLeft, maxPredictionsLeft;
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const init = async () => {
        const modelURLRight = URLRight + "model.json";
        const metadataURLRight = URLRight + "metadata.json";

        const modelURLLeft = URLLeft + "model.json";
        const metadataURLLeft = URLLeft + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        modelRight = await tmPose.load(modelURLRight, metadataURLRight);
        maxPredictionsRight = modelRight.getTotalClasses();
        //modelRight.predict
        modelLeft = await tmPose.load(modelURLLeft, metadataURLLeft);
        maxPredictionsLeft = modelLeft.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 400;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementsByClassName("canvas");
        canvas[1].width = size; canvas[1].height = size;
        canvas[0].width = 300; canvas[0].height = 300;
        ctx = canvas[0].getContext("2d");
        ctx2 = canvas[1].getContext("2d");
        labelContainerRight = document.getElementById("label-container");
        for (let i = 0; i < maxPredictionsRight + maxPredictionsLeft + 1; i++) { // and class labels
            labelContainerRight.appendChild(document.createElement("div"));
        }
        setLoading(false);

    }

    const loop = async () => {
        webcam.update(); // update the webcam frame
        await predict();
        webcam.update();
        await predict2();
        window.requestAnimationFrame(loop);
    }

    const predict = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await modelRight.estimatePose(webcam.canvas);

        // Prediction 2: run input through teachable machine classification model
        const prediction = await modelRight.predict(posenetOutput);

        for (let i = 0; i < maxPredictionsRight; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainerRight.childNodes[i].innerHTML = classPrediction;
        }

        drawPose(pose);
    }

    const predict2 = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element

        const { pose, posenetOutput } = await modelLeft.estimatePose(webcam.canvas);
        const predictionLeft = await modelLeft.predict(posenetOutput);
        poseDecoderLeft(predictionLeft);
        for (let i = 5; i < maxPredictionsLeft + 5; i++) {
            const classPredictionLeft =
                predictionLeft[i - 5].className + ": " + predictionLeft[i - 5].probability.toFixed(2);
            labelContainerRight.childNodes[i].innerHTML = classPredictionLeft;
        }

        // finally draw the poses
        drawPose(pose);
    }

    const changeSpeed = (newBpm) => {
        setProgressSpeed((newBpm * 10) / response.initialBpm);
        audioController.setBPM(newBpm);
        setCurrentBPM(newBpm);
        //console.log((newBpm * 10) / response.initialBpm)
    }

    const setNewBPM = (newBpm) => {
        let upperLimit = response.initialBpm + 70
        let lowerLimit = response.initialBpm - 70
        if (newBpm > upperLimit) {
            //alert('EL BPM EXCEDE LOS LIMITES')
            changeSpeed(upperLimit);
        } else if (newBpm < lowerLimit) {
            //alert('EL BPM EXCEDE LOS LIMITES INFERIORES')
            changeSpeed(lowerLimit);
        } else {
            changeSpeed(newBpm);
        }
    }

    const pause = () => {
        audioController.setBPM(1);
        poseController.pauseController();
        setProgressSpeed((1 * 10) / response.initialBpm);
        stopAnimationLeft();
        stopAnimationRight();
        setOpenDialog(true);
    }

    const resume = () => {
        setOpenDialog(false);
        audioController.setBPM(currentBPM);
        poseController.startController(response.initialBpm);
        setProgressSpeed((currentBPM * 10) / response.initialBpm);
        animateRight();
        animateLeft();
    }

    const navigate2Menu = () => {
        navigate('/menu')
    }

    const calcularPuntajePrecision = (desviacion, patron) => {
        if (patron === 'punzada') {
            if (desviacion > 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 2)
            } else if (desviacion > 0.8 && desviacion < 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 5)
            } else if (desviacion > 0.2 && desviacion < 0.8) {
                setPuntaje((prevPuntaje) => prevPuntaje + 7)
            } else if (desviacion < 0.2) {
                setPuntaje((prevPuntaje) => prevPuntaje + 10)
            }
        } else if (patron === 'triangulo') {
            if (desviacion > 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 4)
            } else if (desviacion > 0.8 && desviacion < 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 8)
            } else if (desviacion > 0.2 && desviacion < 0.8) {
                setPuntaje((prevPuntaje) => prevPuntaje + 12)
            } else if (desviacion < 0.2) {
                setPuntaje((prevPuntaje) => prevPuntaje + 15)
            }
        } else if (patron === 'cruz') {
            if (desviacion > 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 6)
            } else if (desviacion > 0.8 && desviacion < 1.5) {
                setPuntaje((prevPuntaje) => prevPuntaje + 10)
            } else if (desviacion > 0.2 && desviacion < 0.8) {
                setPuntaje((prevPuntaje) => prevPuntaje + 15)
            } else if (desviacion < 0.2) {
                setPuntaje((prevPuntaje) => prevPuntaje + 20)
            }
        }

    }

    const calcularPuntajeBpm = (nuevoBpm) => {
        //calculamos puntaje de limite
        if (nuevoBpm > (response.initialBpm - 10) && (nuevoBpm < (response.initialBpm + 10))) {
            setPuntaje((prevPuntaje) => prevPuntaje + 5)
        } else if (nuevoBpm > (response.initialBpm - 20) && (nuevoBpm < (response.initialBpm + 20))) {
            setPuntaje((prevPuntaje) => prevPuntaje + 3)
        } else if (nuevoBpm > (response.initialBpm - 40) && (nuevoBpm < (response.initialBpm + 40))) {
            setPuntaje((prevPuntaje) => prevPuntaje + 1)
        } else if (nuevoBpm > (response.initialBpm - 70 + (70 * 0.2)) && (nuevoBpm < (response.initialBpm + 70 + (70 * 0.2)))) {
            setPuntaje((prevPuntaje) => prevPuntaje - 10)
        } else if (nuevoBpm > (response.initialBpm - 70 + (70 * 0.5)) && (nuevoBpm < (response.initialBpm + 70 + (70 * 0.5)))) {
            setPuntaje((prevPuntaje) => prevPuntaje - 20)
        } else if (nuevoBpm > (response.initialBpm - 70 + (70 * 0.8)) && (nuevoBpm < (response.initialBpm + 70 + (70 * 0.8)))) {
            setPuntaje((prevPuntaje) => prevPuntaje - 30)
        } else {
            setPuntaje((prevPuntaje) => prevPuntaje - 50)
        }
    }

    const calcularVolumen = (newVolumen, hand) => {
        let volumePercentage = 0;

        if (newVolumen < 0.05) {
            //logica de puntos
            volumePercentage = 100
            hand === "right" ? animateRight() : animateLeft();
            setPuntaje((prevPuntaje) => prevPuntaje - 15);
        } else if (newVolumen > 0.05 && newVolumen < 0.17) {
            volumePercentage = 100;
            hand === "right" ? animateRight() : animateLeft();
        } else if (newVolumen > 0.17 && newVolumen < 0.29) {
            volumePercentage = 86;
            hand === "right" ? animateRight() : animateLeft();
            
        } else if (newVolumen > 0.29 && newVolumen < 0.42) {
            volumePercentage = 72;
            hand === "right" ? animateRight() : animateLeft();
        } else if (newVolumen > 0.42 && newVolumen < 0.54) {
            volumePercentage = 58;
            hand === "right" ? animateRight() : animateLeft();
            setPuntaje((prevPuntaje) => prevPuntaje - 0)
        } else if (newVolumen > 0.54 && newVolumen < 0.65) {
            volumePercentage = 44;
            hand === "right" ? stopAnimationRight() : stopAnimationLeft();
            setPuntaje((prevPuntaje) => prevPuntaje - 15)
        } else {
            volumePercentage = 30;
            hand === "right" ? stopAnimationRight() : stopAnimationLeft();
            setPuntaje((prevPuntaje) => prevPuntaje - 30)
        }

        setCurrentVolume(volumePercentage)
        audioController.setVolume(volumePercentage, hand)
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

    const poseDecoderLeft = async (predictionLeft) => {
        if (predictionLeft) {
            const aux = [];
            for (let i = 0; i < maxPredictionsLeft; i++) {
                if (predictionLeft[i].probability > 0.97) {
                    aux.push(predictionLeft[i].className);
                    if (aux[aux.length] == aux[aux.length - 1]) {
                        aux.pop();
                    }
                }

                //console.log(aux);
                if (aux.length > 0) {
                    let punzadaBpm = poseController.checkPunzada(aux[0]);
                    //let trianguloBpm = poseController.checkTriangulo(aux[0]);
                    //let cruzBpm = poseController.checkCruz(aux[0]);
                    if (punzadaBpm) {
                        calcularPuntajePrecision(poseController.getDesviation(), 'punzada');
                        calcularPuntajeBpm(punzadaBpm);
                        setNewBPM(punzadaBpm);
                        calcularVolumen(poseController.getVolume() / 1000, "left")
                        //hacer algo con el volumen
                        //console.log(poseController.getVolume() / 1000, 'volumen')
                        //setCurrentVolume(poseController.getVolume())
                    }
                    // if (trianguloBpm) {
                    //     calcularPuntajePrecision(poseController.getDesviation(), 'triangulo');
                    //     calcularPuntajeBpm(trianguloBpm);
                    //     setNewBPM(trianguloBpm)
                    //     console.log(poseController.getVolume() / 1000, 'volumen')
                    //     //setCurrentVolume(poseController.getVolume())
                    // }
                    // if (cruzBpm) {
                    //     calcularPuntajePrecision(poseController.getDesviation(), 'cruz');
                    //     calcularPuntajeBpm(cruzBpm);
                    //     setNewBPM(cruzBpm);
                    //     console.log(poseController.getVolume() / 1000, 'volumen')
                    // }


                }

            }

        }
    }

    //seteo variables iniciales de juego
    React.useEffect(() => {
        //setVariablesGame();
        startConcert();
    }, []);




    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100%', width: '100%', padding: '10px' }} elevation={0}>
                <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66', padding: '30px', display: 'flex', alignItems: 'center' } }} open={open} fullWidth maxWidth="lg">

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
                    <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'flex' }}> Ahora tocando: {response ? response.name : '--'}</Typography>


                    <Box sx={{ width: '30%' }}>
                        <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.round((Math.floor((time / 1000)) / songDuration) * 100)}%</Typography>
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Typography> */}
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.floor((time / 1000))}-</Typography> */}
                        {/* <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {Math.floor((time / 1000))} segundos</Typography> */}
                        <LinearProgress variant="determinate" value={(Math.floor((time / 1000)) / songDuration) * 100} style={{ height: '10px', borderRadius: 5 }} />
                    </Box>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box className="hover" onClick={() => { pause() }} style={{ backgroundColor: '#FF5E5B', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
                            <PauseRounded style={{ color: '#FFF', fontSize: '50px' }} />
                        </Box>
                        <PauseMenu open={openDialog} handleClose={handleCloseDialog} resume={resume} exit={navigate2Menu}></PauseMenu>
                    </div>
                </div>
                {response && response.instruments.map((instrument, idx) => (
                    <div key={idx}>{renderSwitch(instrument)}</div>
                ))}
                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', left: '2%' }}> BPM: {Math.round(currentBPM, 0)}</Typography>
                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', left: '16%' }}> Volume: {currentVolume}%</Typography>
                
                {/* <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', left: '2%' }}> Media Volumen: {currentVolume}</Typography> */}
                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', right: '2%' }}> Puntaje: {puntaje}</Typography>

                <canvas style={{ position: 'absolute', left: '40%', bottom: '3%', borderRadius: '30px', visibility: !open ? 'visible' : 'hidden' }} className={`canvas ${!open ? "canvasAnimation" : ""}`}></canvas>
                <button style={{ position: 'absolute', left: '40%', top: '62%', borderRadius: '30px' }} onClick={() => { stopAnimationLeft() }}>stop left</button>
                <button style={{ position: 'absolute', left: '40%', top: '66%', borderRadius: '30px' }} onClick={() => { animateLeft() }}>start Left</button>
                <button style={{ position: 'absolute', left: '45%', top: '62%', borderRadius: '30px' }} onClick={() => { stopAnimationRight() }}>stop Right</button>
                <button style={{ position: 'absolute', left: '45%', top: '66%', borderRadius: '30px' }} onClick={() => { animateRight() }}>start right</button>
                <button style={{ position: 'absolute', left: '50%', top: '66%', borderRadius: '30px' }} onClick={() => { changeSpeed(200) }}>hightBPM</button>
                <button style={{ position: 'absolute', left: '50%', top: '62%', borderRadius: '30px' }} onClick={() => { changeSpeed(response.initialBpm) }}>restartBPM</button>
                <button style={{ position: 'absolute', left: '50%', top: '70%', borderRadius: '30px' }} onClick={() => { changeSpeed(80) }}>lowBPM</button>
                {/* <button style={{ position: 'absolute', left: '45%', top: '70%', borderRadius: '30px' }} onClick={() => { pause() }}>pause</button>
                <button style={{ position: 'absolute', left: '40%', top: '70%', borderRadius: '30px' }} onClick={() => { resume() }}>resume</button> */}
                <button style={{ position: 'absolute', left: '40%', top: '70%', borderRadius: '30px' }} onClick={() => { audioController.increasePitch() }}>pitch</button>
                <button style={{ position: 'absolute', left: '45%', top: '70%', borderRadius: '30px' }} onClick={() => { audioController.resetPitch() }}>reset pitch</button>
                <button style={{ position: 'absolute', left: '45%', top: '73%', borderRadius: '30px' }} onClick={() => { audioController.decreasePitch() }}>menos pitch</button>


            </Paper>
        </React.Fragment>
    )


}

export default Game;