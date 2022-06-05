import { Typography } from "@mui/material";
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
import { motion } from 'framer-motion';
import { MechanicalCounter } from "mechanical-counter";

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
        const { pose } = await modelRight.estimatePose(webcam.canvas);
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

    const transition = { duration: 0.3, yoyo: Infinity, ease: 'easeInOut' };
    const transition2 = { duration: 1.5, yoyo: Infinity, ease: 'easeInOut' };




    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#000', height: '100%', width: '100%', padding: '10px', opacity: '0.6', position: 'absolute', zIndex: '2' }} >
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '70vw', zIndex: `${paso === 3 ? '3' : '1'}`, backgroundColor: '#FFFFEA', padding: '10px', borderRadius: '15px' }} className={`${paso === 3 ? 'canvasAnimation' : ''}`}>
                <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'inline' }} > Ahora tocando: {response ? response.name : '--'}</Typography>


                <Box sx={{ width: '50%', marginLeft: '40px' }}>

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

                <div className="container-control">
                    <div className="container-svg">
                        <motion.svg
                            width="24"
                            height="24"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            transition={transition}
                        >
                            <motion.path
                                d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
                                stroke="currentColor"
                                initial={{ width: 24, height: 24 }}
                                animate={{ width: 34, height: 34 }}
                                strokeLinejoin="round"
                                transition={transition}
                            />
                        </motion.svg>
                    </div>
                    <MechanicalCounter height={30} text={`${Math.round(122, 0)} bpm`} />
                </div>
                <div className="container-control2">
                    <div className="container-svg2">
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            transition={transition}
                        >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </motion.svg>
                    </div>
                    <span>{70}%</span>
                </div>
                <div className="container-control-points">
                    <div className="container-points-svg">
                        <motion.svg
                            width="28"
                            height="28"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14"
                                stroke="currentColor"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={transition2}
                            />
                            <motion.path
                                d="M16 7L12 11"
                                stroke="currentColor"
                                stroke-linecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={transition2}
                            />
                            <motion.path
                                d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={transition2}
                            />
                        </motion.svg>
                    </div>
                    <span>{129} puntos</span>
                </div>

            </div>

            <canvas style={{ position: 'absolute', left: '40%', bottom: '3%', borderRadius: '10px', zIndex: `${paso === 2 ? '4' : '1'}`, }} className={`canvas `}></canvas>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '20%', zIndex: `${paso === 1 ? '3' : '1'}`, visibility: paso === 1 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', height: '60vh', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 1 ? 'canvasAnimation' : ''}`}>
                <Typography textAlign='center' className="title-font title-dialog-tutorial">¡Bienvenido a Yatawaki! Un espacio virtual creado especialmente para que desarrolles tus habilidades de dirección orquestal</Typography>
                <Box data-testid="nextStepButton" className="hover" sx={buttonStyle} onClick={() => { nextPaso() }}>
                    <Typography className="title-button" fontSize='40px!important'> Siguiente</Typography>
                </Box>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '10%', top: '5%', zIndex: `${paso === 2 ? '3' : '1'}`, visibility: paso === 2 ? 'visible' : 'hidden', backgroundColor: '#FFFFEA', width: '80vw', borderRadius: '30px', padding: '20px' }} className={`${paso === 2 ? 'canvasAnimation' : ''}`}>
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
                <Box className="hover" sx={buttonStyle} onClick={() => { navigate('/tutorial-resume') }}>
                    <Typography className="title-button" fontSize='40px!important'> Terminar</Typography>
                </Box>
            </div>
        </React.Fragment>
    )


}

export default Tutorial;