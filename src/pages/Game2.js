import { CircularProgress, Dialog, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import piano from '../assets/piano.png';
import viola from '../assets/viola.png';
import chello from '../assets/chello.png';
import oboe from '../assets/oboe.png';
import arpa from '../assets/arpa.png';
import calibracion from '../assets/calibracion.png';
import { PauseRounded } from "@mui/icons-material";
import { Box } from "@mui/system";

import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import PoseContext from "../context/pose-controller";

let buttonStyle = { width: '150px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '20px' };


const Game2 = () => {

    let instruments = [
        { "nombre": "Piano", "asset": piano },
        { "nombre": "Harp", "asset": arpa },
        { "nombre": "Violin", "asset": viola },
        { "nombre": "Viola", "asset": viola },
        { "nombre": "Chello", "asset": chello },
        { "nombre": "Oboe", "asset": oboe },
    ]

    const poseContext = React.useContext(PoseContext);


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

    const URLRight = "https://teachablemachine.withgoogle.com/models/DpJQ3G2-Y/";
    const URLLeft = "https://teachablemachine.withgoogle.com/models/fRIw5b4gL/";
    let modelRight, webcam, ctx, labelContainerRight, maxPredictionsRight, modelLeft, labelContainerLeft, maxPredictionsLeft;
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

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
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainerRight = document.getElementById("label-container");


        for (let i = 0; i < maxPredictionsRight + maxPredictionsLeft + 1; i++) { // and class labels
            labelContainerRight.appendChild(document.createElement("div"));
        }

        /*labelContainerLeft = document.getElementById("label-container");
        for (let i = 0; i < maxPredictionsLeft; i++) { // and class labels
            labelContainerLeft.appendChild(document.createElement("div"));
        }*/
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
        //console.log(prediction);

        for (let i = 0; i < maxPredictionsRight; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainerRight.childNodes[i].innerHTML = classPrediction;
        }

        //const { poseLeft, posenetOutputLeft } = await modelLeft.estimatePose(webcam.canvas);
        //const predictionLeft = await modelLeft.predict(posenetOutputLeft);
        //console.log(predictionLeft);
        /*for (let i = 0; i < maxPredictionsLeft; i++) {
            const classPredictionLeft =
            predictionLeft[i].className + ": " + predictionLeft[i].probability.toFixed(2);
            labelContainerLeft.childNodes[i].innerHTML = classPredictionLeft;
        }*/

        // finally draw the poses
        drawPose(pose);
    }
    const predict2 = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element


        const { pose, posenetOutput } = await modelLeft.estimatePose(webcam.canvas);
        const predictionLeft = await modelLeft.predict(posenetOutput);
        poseDecoderLeft(predictionLeft);
        //console.log(predictionLeft);
        for (let i = 5; i < maxPredictionsLeft + 5; i++) {
            const classPredictionLeft =
                predictionLeft[i - 5].className + ": " + predictionLeft[i - 5].probability.toFixed(2);
            labelContainerRight.childNodes[i].innerHTML = classPredictionLeft;
        }

        // finally draw the poses
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

    const [showPlumada, setShowPlumada] = useState(false);


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

                console.log(aux);
                if (aux.length > 0) {
                    //let plumada = poseContext.checkPunzada(aux[0]);
                    //poseContext.checkTriangulo(aux[0]);
                    poseContext.checkCruz(aux[0]);
                    //if (plumada) {
                    //    setShowPlumada(true);
                    //}

                }

            }

        }
    }



    return (
        <React.Fragment>
            <Paper square={true} sx={{ backgroundColor: 'primary.light', height: '100%', width: '100%', padding: '20px' }}>
                <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66', padding: '30px', display: 'flex', alignItems: 'center' } }} open={open} onClose={() => { setOpen(false) }} fullWidth maxWidth="lg">

                    <div style={{ width: '100%', marginBottom: '20px' }}>
                        <Typography fontWeight='600' fontSize="30px!important"> Calibra tu cuerpo con la cámara web:</Typography>
                    </div>

                    {loading ? <Box className="hover" sx={buttonStyle} onClick={() => { init() }}>
                        <Typography className="title-button" fontSize="30px!important" > Iniciar</Typography>
                    </Box> : ''}
                    {loading && <CircularProgress style={{ marginTop: '30px' }}></CircularProgress>}

                    <canvas style={{ height: '300px!important', width: '300px!important' }} id="canvas"></canvas>
                    {!loading && <img style={{ position: 'absolute', height: '400px', width: '400px', top: '95px' }} src={calibracion} />}
                    <div id="label-container"></div>
                    {!loading ? <Box className="hover" sx={buttonStyle} onClick={() => { setOpen(false) }}>
                        <Typography className="title-button" fontSize="30px!important" > Realizado</Typography>
                    </Box> : ''}
                </Dialog>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontWeight='600' fontSize='30px' style={{ flex: 1, display: 'flex' }}> Ahora tocando: Symphony No. 9</Typography>
                    <Typography color='secondary' fontSize="30px" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}> 0% Completado</Typography>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box className="hover" style={{ backgroundColor: '#FF5E5B', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
                            <PauseRounded style={{ color: '#FFF', fontSize: '50px' }} />
                        </Box>
                    </div>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', fontSize: '60px', lineHeight: '0px' }}>.</div>
                {instruments.map((instrument, idx) => (
                    <div>{renderSwitch(instrument)}</div>
                ))}

                {showPlumada && 'CTMMMMMMMM'}
            </Paper>
        </React.Fragment>
    )


}

export default Game2;