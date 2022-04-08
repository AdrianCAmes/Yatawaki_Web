
import React from "react";
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";

let buttonStyle = { width: '150px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '20px' };

const Modelo = () => {

    const URL = "https://teachablemachine.withgoogle.com/models/F6a7piIOE/";
    let model, webcam, ctx, labelContainer, maxPredictions;
    const [open, setOpen] = React.useState(false);

    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        setOpen(true)

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
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
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
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    return (
        <React.Fragment>
            <Typography className="title-button" color='#000' style={{marginLeft:'40px'}}> Patrones</Typography>

            <Box className="hover" sx={buttonStyle} onClick={() => { init() }}>
                <Typography className="title-button" fontSize="30px!important" > Iniciar</Typography>
            </Box>
            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }} open={open} onClose={() => { setOpen(false) }} fullWidth maxWidth="lg">
                <h3>Calibra la camara</h3>
                <canvas style={{ height: '300px!important', width: '300px!important' }} id="canvas"></canvas>
                <div id="label-container"></div>
            </Dialog>

        </React.Fragment>
    )


}

export default Modelo;