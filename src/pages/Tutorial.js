import { LinearProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { PauseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { useNavigate } from "react-router-dom";
import { TutorialCard } from "./components/ObjectCard";
import punzada from '../assets/Punzada.gif';
import cruz from '../assets/Cruz.gif';
import triangulo from '../assets/Triangulo.gif';
import pitchR from '../assets/Pitch Grave.gif';
import pitchL from '../assets/Pitch Agudo.gif';


let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


const Tutorial = () => {
    const navigate = useNavigate();

    const [play, setPlay] = useState(false);
    const [audioElement, setAudioElement] = useState(new Audio());

    const [paso, setPaso] = useState(1);

    const nextPaso = () => {
        setPaso((prev) => prev + 1);
    }


    const playMusic = () => {
        setAudioElement(new Audio("https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Multitracks/Piano/piano_casio.mp3"));
        setPlay(true);
    }


    let response = {
        "idConcert": 1,
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



    const renderSwitch = (param) => {
        switch (param.name) {
            case 'Piano':
                return <div>
                    <img id="hola" style={{ position: 'absolute', left: '8%', top: '15%', height: '230px', }} src={param.icon} className={`piano ${true ? "pianoAnimation" : ""}`} ></img>
                </div>
            case 'Guitar':
                return <div>
                    <img style={{ position: 'absolute', left: '52%', top: '29%', height: '170px' }} className={`guitar ${true ? "guitarAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '10%', height: '170px' }} className={`guitar ${true ? "guitarAnimation" : ""}`} src={param.icon} ></img>
                </div>
            case 'Violin':
                return <div>
                    <img style={{ position: 'absolute', left: '18%', top: '45%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '25%', top: '30%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '34%', top: '17%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '28%', top: '60%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '32%', top: '48%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '39%', top: '36%', height: '180px' }} className={`violin ${true ? "violinAnimation" : ""}`} src={param.icon} ></img>
                </div>
            case 'Cello':
                return <div>
                    <img style={{ position: 'absolute', left: '58%', top: '43%', height: '220px' }} className={`chello ${true ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '62%', top: '60%', height: '220px' }} className={`chello ${true ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '70%', top: '20%', height: '220px' }} className={`chello ${true ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                    <img style={{ position: 'absolute', left: '75%', top: '43%', height: '220px' }} className={`chello ${true ? "chelloAnimation" : ""}`} src={param.icon} ></img>
                </div>;
            default:
                return '';
        }
    }

    //modelo

    const URLRight = "https://teachablemachine.withgoogle.com/models/7vVySgCUN/";

    let modelRight, webcam, ctx;


    const init = async () => {
        const modelURLRight = URLRight + "model.json";
        const metadataURLRight = URLRight + "metadata.json";

        modelRight = await tmPose.load(modelURLRight, metadataURLRight);

        // Convenience function to setup a webcam
        const size = 400;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementsByClassName("canvas");
        canvas[0].width = size; canvas[0].height = size;
        ctx = canvas[0].getContext("2d");
        playMusic();
    }

    const loop = async () => {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    const predict = async () => {
        const { pose, posenetOutput } = await modelRight.estimatePose(webcam.canvas);
        drawPose(pose);
    }


    const drawPose = async (pose) => {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }


    React.useEffect(() => {
        init();
    }, []);

    React.useEffect(() => {
        play ? audioElement.play() : audioElement.pause();

        return () => {
            audioElement.pause();
        }

    }, [play]);





    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#000', height: '100%', width: '100%', padding: '10px', opacity: '0.6', position: 'absolute', zIndex: '2' }} >
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '70vw', zIndex: `${paso === 3 ? '3' : '1'}`, backgroundColor: '#FFFFEA', padding: '10px', borderRadius: '15px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'inline' }} > Ahora tocando: {response ? response.name : '--'}</Typography>


                <Box sx={{ width: '50%', marginLeft: '40px' }}>
                    <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> {2}%</Typography>
                    <LinearProgress variant="determinate" value={20} style={{ height: '10px', borderRadius: 5 }} />
                </Box>

            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '3%', zIndex: `${paso === 4 ? '3' : '1'}`, paddingTop: '30px', paddingRight: '10px' }} className={`${paso === 4 ? 'canvasAnimation' : ''}`}>
                <Box className="hover" style={{ backgroundColor: '#FF5E5B', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
                    <PauseRounded style={{ color: '#FFF', fontSize: '50px' }} />
                </Box>
            </div>

            <div style={{ backgroundColor: '#FFFFEA', height: '100%', width: '100%', padding: '10px', position: 'absolute', zIndex: '0' }} >

                {response && response.instruments.map((instrument, idx) => (
                    <div key={idx}>{renderSwitch(instrument)}</div>
                ))}

                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', left: '2%' }}> BPM: 122</Typography>
                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', left: '16%' }}> Volume: {70}%</Typography>

                <Typography fontWeight='600' fontSize='30px' className="canvasAnimation" style={{ position: 'absolute', bottom: '3%', right: '2%', zIndex: '9999' }}> Puntaje: {3}</Typography>


            </div>

            <canvas style={{ position: 'absolute', left: '40%', bottom: '3%', borderRadius: '10px', zIndex: `${paso === 2 ? '3' : '1'}`, }} className={`canvas `}></canvas>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '20%', zIndex: `${paso === 1 ? '3' : '1'}`, visibility: paso === 1 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '60vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 1 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">¡Bienvenido a Yatawaki! Un espacio virtual creado especialmente para que desarrolles tus habilidades de dirección orquestal</Typography>
                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '5%', zIndex: `${paso === 2 ? '3' : '1'}`, visibility: paso === 2 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '60vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 2 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">En la sección inferior podrás visualizar el video tomado en tiempo real, el cual mediante nuestra inteligencia artificial reconocerá tus gestos y aplicará distintos efectos de sonido a la sinfonía</Typography>
                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '25%', zIndex: `${paso === 3 ? '3' : '1'}`, visibility: paso === 3 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '60vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">En la parte superior izquierda observarás la sinfonía que estás orquestando, así como el porcentaje de progreso que llevas</Typography>
                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '20%', zIndex: `${paso === 4 ? '3' : '1'}`, visibility: paso === 4 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '50vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 4 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Usa el botón de pausa para detener el juego en caso lo necesites</Typography>
                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '5%', top: '10%', zIndex: `${paso === 5 ? '3' : '1'}`, visibility: paso === 5 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '80vh', width: '90vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 5 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Puedes realizar los siguientes gestos para controlar el tempo de la reproducción</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                    <TutorialCard item={{ name: 'Plomada', icon: punzada, description: '2 beats por gesto' }} ></TutorialCard>
                    <TutorialCard item={{ name: 'Triangulo', icon: triangulo, description: '3 beats por gesto' }} ></TutorialCard>
                    <TutorialCard item={{ name: 'Cruz', icon: cruz, description: '4 beats por gesto' }} ></TutorialCard>

                </div>

                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '5%', top: '2%', zIndex: `${paso === 6 ? '3' : '1'}`, visibility: paso === 6 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '90vh', width: '90vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 6 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Puedes realizar los siguientes gestos para controlar el pitch de la reproducción</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                    <TutorialCard item={{ name: 'Pitch Agudo', icon: pitchL }} ></TutorialCard>
                    <TutorialCard item={{ name: 'Pitch Grave', icon: pitchR }} ></TutorialCard>
                </div>
                <Typography textAlign='center' className="title-font" fontSize={24}>Mantener 3 segundos para que aplique los cambios en la reproducción</Typography>



                <Box className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '13%', zIndex: `${paso === 7 ? '3' : '1'}`, visibility: paso === 7 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '70vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 7 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">Ten en cuenta que la intensidad del sonido de la sinfonía dependerá de la intensidad (fuerza) de tus movimientos. !No olvides divertirte y disfrutar de Yatawaki!</Typography>
                <Box className="hover" sx={buttonStyle} onClick={() => { navigate('/menu') }}>
                    <Typography className="title-button" fontSize='40px!important'> Terminar</Typography>
                </Box>
            </div>
        </React.Fragment>
    )


}

export default Tutorial;