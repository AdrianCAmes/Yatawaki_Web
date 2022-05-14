import React, { createContext } from "react";

const PoseContext = createContext({
    checkPunzada: null,
    checkTriangulo: null,
    checkCruz: null,
    checkPunzadaRight: null,
    checkTrianguloRight: null,
    checkCruzRight: null,
    startController: null,
    pauseController: null,
    getVolume: null,
    getDesviation: null,
    checkPitchLeft: null,
    checkPitchRight: null,
    checkPlayer: null,
    checkTPose: null
})

export default PoseContext;

export const PoseContextProvider = (props) => {

    let time = 0;
    let initialBPM = 0;
    let arrayVerificarPunzada = ['', '', ''];
    let arraySegundosVerificarPunzada = [0, 0, 0];
    let timeMediaPunzada = 0;
    let lastTimePunzada = 0;

    let arrayVerificarTriangulo = ['', '', '', '', ''];
    let arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];
    let timeMediaTriangulo = 0;
    let lastTimeTriangulo = 0;

    let arrayVerificarCruz = ['', '', '', '', '', ''];
    let arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];
    let timeMediaCruz = 0;
    let lastTimeCruz = 0;

    let arrayVerificarPunzadaRight = ['', '', ''];
    let arraySegundosVerificarPunzadaRight = [0, 0, 0];
    let timeMediaPunzadaRight = 0;
    let lastTimePunzadaRight = 0;

    let arrayVerificarTrianguloRight = ['', '', '', '', ''];
    let arraySegundosVerificarTrianguloRight = [0, 0, 0, 0, 0];
    let timeMediaTrianguloRight = 0;
    let lastTimeTrianguloRight = 0;

    let arrayVerificarCruzRight = ['', '', '', '', '', ''];
    let arraySegundosVerificarCruzRight = [0, 0, 0, 0, 0, 0];
    let timeMediaCruzRight = 0;
    let lastTimeCruzRight = 0;


    let timerOn = true;
    let started = false;
    let volume = 0;
    let desviation = 0;
    let paused = false;
    let calibrado = false;
    let checkNewCalibration = false;

    let lastTimePitch = 0;
    let poseLastPitch = '';

    let lastTimePitchRight = 0;
    let poseLastPitchRight = '';

    let lastTimeNotPlaying = 0;


    const startController = (bpm) => {
        started = true;
        calibrado = true;
        initialBPM = bpm;
        console.log(initialBPM, 'initialBPM in Pose Controller');
    }

    const resetBpmInputs = () => {
        arrayVerificarPunzada = ['', '', ''];
        arraySegundosVerificarPunzada = [0, 0, 0];

        arrayVerificarTriangulo = ['', '', '', '', ''];
        arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];

        arrayVerificarCruz = ['', '', '', '', '', ''];
        arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];

        arrayVerificarPunzadaRight = ['', '', ''];
        arraySegundosVerificarPunzadaRight = [0, 0, 0];

        arrayVerificarTrianguloRight = ['', '', '', '', ''];
        arraySegundosVerificarTrianguloRight = [0, 0, 0, 0, 0];

        arrayVerificarCruzRight = ['', '', '', '', '', ''];
        arraySegundosVerificarCruzRight = [0, 0, 0, 0, 0, 0];
    }

    const resetVolumeInputs = () => {
        timeMediaPunzada = 0;
        lastTimePunzada = 0;
        timeMediaTriangulo = 0;
        lastTimeTriangulo = 0;
        timeMediaCruz = 0;
        lastTimeCruz = 0;
        timeMediaPunzadaRight = 0;
        lastTimePunzadaRight = 0;
        timeMediaTrianguloRight = 0;
        lastTimeTrianguloRight = 0;
        timeMediaCruzRight = 0;
        lastTimeCruzRight = 0;
    }

    const pauseController = () => {
        started = false;
        checkNewCalibration = true;
        resetVolumeInputs();
        resetBpmInputs();
    }

    const timeDesviation = (timesArray) => {
        let array = []
        //console.log(timesArray, 'times Array')
        for (let i = 0; i < timesArray.length - 1; i++) {
            array.push((timesArray[i + 1] - timesArray[i]) / 1000)
        }

        //console.log(array, 'diferencias')

        let mean = array.reduce((acc, curr) => {
            return acc + curr
        }, 0) / array.length;

        // Assigning (value - mean) ^ 2 to every array item
        array = array.map((k) => {
            return (k - mean) ** 2
        })

        // Calculating the sum of updated array
        let sum = array.reduce((acc, curr) => acc + curr, 0);

        // Returning the Standered deviation
        return Math.sqrt(sum / array.length)
    }

    const getVolume = () => {
        //logica para calcular nuevo volumen;
        //console.log(volume);
        return volume;
    }

    const getDesviation = () => {
        //logica para calcular nuevo volumen;
        //console.log(volume);
        return desviation;
    }
    //REGLA GENERAL: En cada paso verificar el anterior completo y el actual vacio :) Menos en el primero

    const checkPlayer = (value) => {
        if (started) {
            if (value === 'NotPlaying' && lastTimeNotPlaying === 0) {
                lastTimeNotPlaying = time;
            } else if (value === 'NotPlaying' && lastTimeNotPlaying !== 0) {
                console.log('NOT PLAYING GA', Math.floor(((time - lastTimeNotPlaying) / 1000) % 60))
                if (Math.floor(((time - lastTimeNotPlaying) / 1000) % 60) > 2) {
                    paused = true;
                    lastTimeNotPlaying = 0;
                    return 'NotPlaying';
                }
            } else {
                lastTimeNotPlaying = 0;
            }
        } else if (value === 'Playing' && paused) {
            paused = false;
            return 'Resume';
        }
    }

    const checkTPose = (value) => {


        if (!calibrado && value === 'T') {
            calibrado = true;
            return 'Start';
        }

        if (checkNewCalibration && value === 'T') {
            checkNewCalibration = false;
            return 'Continue'
        }

    }

    const checkPitchLeft = (value) => {
        if (started) {

            if ((value === 'LHUL' || value === 'LHDL') && lastTimePitch === 0) {
                lastTimePitch = time;
                poseLastPitch = value;

                return 'reset';
            } else {
                if (value === 'LHDL' && poseLastPitch !== 'LHDL') {
                    lastTimePitch = 0;
                    poseLastPitch = '';
                    //console.log(lastTimePitch, poseLastPitch, 'ERA LHUL, ENCUENTRA LHDL');

                    return 'reset';
                } else if (value === 'LHUL' && poseLastPitch !== 'LHUL') {
                    lastTimePitch = 0;
                    poseLastPitch = '';
                    //console.log(lastTimePitch, poseLastPitch, 'ERA LHDL, ENCUENTRA LHUL');
                    return 'reset';
                } else if (value === 'LHDL' && poseLastPitch === 'LHDL') {
                    console.log(Math.floor(((time - lastTimePitch) / 1000) % 60), 'ENCUENTRA DE NUEVO LHD');

                    if (Math.floor(((time - lastTimePitch) / 1000) % 60) > 2) {
                        console.log(Math.floor(((time - lastTimePitch) / 1000) % 60), 'RETORNA DOWN');
                        return 'down';
                    }
                } else if (value === 'LHUL' && poseLastPitch === 'LHUL') {
                    console.log(Math.floor(((time - lastTimePitch) / 1000) % 60), 'ENCUENTRA DE NUEVO LHL');

                    if (Math.floor(((time - lastTimePitch) / 1000) % 60) > 2) {
                        console.log(Math.floor(((time - lastTimePitch) / 1000) % 60), 'RETORNA UP');

                        return 'up';
                    }
                }
            }

        }
    }


    const checkPitchRight = (value) => {
        if (started) {

            if ((value === 'RHUR' || value === 'RHDR') && lastTimePitchRight === 0) {
                lastTimePitchRight = time;
                poseLastPitchRight = value;

                return 'reset';
            } else {
                if (value === 'RHDR' && poseLastPitchRight !== 'RHDR') {
                    lastTimePitchRight = 0;
                    poseLastPitchRight = '';
                    //console.log(lastTimePitch, poseLastPitch, 'ERA LHUL, ENCUENTRA LHDL');

                    return 'reset';
                } else if (value === 'RHUR' && poseLastPitchRight !== 'RHUR') {
                    lastTimePitchRight = 0;
                    poseLastPitchRight = '';
                    //console.log(lastTimePitch, poseLastPitch, 'ERA LHDL, ENCUENTRA LHUL');
                    return 'reset';
                } else if (value === 'RHDR' && poseLastPitchRight === 'RHDR') {

                    if (Math.floor(((time - lastTimePitchRight) / 1000) % 60) > 2) {
                        return 'down';
                    }
                } else if (value === 'RHUR' && poseLastPitchRight === 'RHUR') {

                    if (Math.floor(((time - lastTimePitchRight) / 1000) % 60) > 2) {

                        return 'up';
                    }
                }
            }

        }
    }

    const checkPunzada = (value) => {

        if (started) {
            //verificamos movimientos
            if (arrayVerificarPunzada[0] === 'LHD' && arrayVerificarPunzada[1] === 'LHU' && arrayVerificarPunzada[2] === 'LHD') {
                let timeDifference = arraySegundosVerificarPunzada[2] - arraySegundosVerificarPunzada[0]
                console.log(timeToString(arraySegundosVerificarPunzada[0]), timeToString(arraySegundosVerificarPunzada[1]), timeToString(arraySegundosVerificarPunzada[2]), '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

                //console.log(timeToString(timeDifference), 'time difference')
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'punzada')
                console.log(newBPM, 'new BPM');

                //alert('patron encontrado');
                desviation = timeDesviation(arraySegundosVerificarPunzada);
                //console.log(desviation)
                resetBpmInputs();
                //volumen
                volume = timeMediaPunzada;

                resetVolumeInputs();

                //console.log(timeMediaPunzada)

                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarPunzada[0] === '' && value === 'LHD') {
                    arrayVerificarPunzada[0] = 'LHD';
                    arraySegundosVerificarPunzada[0] = time
                }

                //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
                if (arrayVerificarPunzada[0] === 'LHD' && value === 'LHD' && arrayVerificarPunzada[1] === '') {
                    arraySegundosVerificarPunzada[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarPunzada[1] === '' && arrayVerificarPunzada[0] === 'LHD' && value === 'LHU') {
                    arrayVerificarPunzada[1] = 'LHU';
                    arraySegundosVerificarPunzada[1] = time
                    timeMediaPunzada = arraySegundosVerificarPunzada[1] - arraySegundosVerificarPunzada[0];
                    lastTimePunzada = time
                } else if (arrayVerificarPunzada[1] === 'LHU' && arrayVerificarPunzada[2] === '' && value === 'LHU') {
                    lastTimePunzada = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarPunzada[2] === '' && arrayVerificarPunzada[1] === 'LHU' && value === 'LHD') {
                    arrayVerificarPunzada[2] = 'LHD';
                    arraySegundosVerificarPunzada[2] = time;
                    timeMediaPunzada = (timeMediaPunzada + (time - lastTimePunzada)) / 2
                }
            }


            //console.log(timeToString(arraySegundosVerificarPunzada[0]), timeToString(arraySegundosVerificarPunzada[1]), timeToString(arraySegundosVerificarPunzada[2]), '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

        }
    }

    const checkTriangulo = (value) => {
        if (started) {
            //['LHD','LHl','LHD','LHU','LHD']

            //verificamos movimientos
            if (arrayVerificarTriangulo[0] === 'LHD' && arrayVerificarTriangulo[1] === 'LHL' && arrayVerificarTriangulo[2] === 'LHD' && arrayVerificarTriangulo[3] === 'LHU' && arrayVerificarTriangulo[4] === 'LHD') {
                let timeDifference = arraySegundosVerificarTriangulo[4] - arraySegundosVerificarTriangulo[0]
                console.log(timeToString(arraySegundosVerificarTriangulo[0]), timeToString(arraySegundosVerificarTriangulo[1]), timeToString(arraySegundosVerificarTriangulo[2]), timeToString(arraySegundosVerificarTriangulo[3]), timeToString(arraySegundosVerificarTriangulo[4]), '-', arrayVerificarTriangulo[0], arrayVerificarTriangulo[1], arrayVerificarTriangulo[2], arrayVerificarTriangulo[3], arrayVerificarTriangulo[4]);

                console.log(timeToString(timeDifference), 'time difference')
                //console.log(timetoBPM(timeToSeconds(timeDifference), 'triangulo'), 'new BPM')
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'triangulo')

                //alert('patron triangulo encontrado');
                desviation = timeDesviation(arraySegundosVerificarTriangulo);
                resetBpmInputs();

                //volumen
                volume = timeMediaTriangulo;
                //console.log(timeMediaPunzada)

                resetVolumeInputs();

                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarTriangulo[0] === '' && value === 'LHD') {
                    arrayVerificarTriangulo[0] = 'LHD';
                    arraySegundosVerificarTriangulo[0] = time
                }

                //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
                if (arrayVerificarTriangulo[0] === 'LHD' && value === 'LHD' && arrayVerificarTriangulo[1] === '') {
                    arraySegundosVerificarTriangulo[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarTriangulo[0] === 'LHD' && arrayVerificarTriangulo[1] === '' && value === 'LHL') {
                    arrayVerificarTriangulo[1] = 'LHL';
                    arraySegundosVerificarTriangulo[1] = time

                    //volumen
                    timeMediaTriangulo = arraySegundosVerificarTriangulo[1] - arraySegundosVerificarTriangulo[0];
                    lastTimeTriangulo = time
                } else if (arrayVerificarTriangulo[1] === 'LHL' && arrayVerificarTriangulo[2] === '' && value === 'LHL') {
                    lastTimeTriangulo = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarTriangulo[1] === 'LHL' && arrayVerificarTriangulo[2] === '' && value === 'LHD') {
                    arrayVerificarTriangulo[2] = 'LHD';
                    arraySegundosVerificarTriangulo[2] = time;

                    //volumen
                    timeMediaTriangulo = (timeMediaTriangulo + (time - lastTimeTriangulo)) / 2;
                    lastTimeTriangulo = time
                } else if (arrayVerificarTriangulo[2] === 'LHD' && arrayVerificarTriangulo[3] === '' && value === 'LHD') {
                    lastTimeTriangulo = time;
                    return;
                }

                //4. Cuarta posicion
                if (arrayVerificarTriangulo[2] === 'LHD' && arrayVerificarTriangulo[3] === '' && value === 'LHU') {
                    arrayVerificarTriangulo[3] = 'LHU';
                    arraySegundosVerificarTriangulo[3] = time;

                    //volumen
                    timeMediaTriangulo = (timeMediaTriangulo + (time - lastTimeTriangulo)) / 2;
                    lastTimeTriangulo = time
                } else if (arrayVerificarTriangulo[3] === 'LHU' && arrayVerificarTriangulo[4] === '' && value === 'LHU') {
                    lastTimeTriangulo = time;
                    return;
                }

                //5. Quinta posicion
                if (arrayVerificarTriangulo[3] === 'LHU' && arrayVerificarTriangulo[4] === '' && value === 'LHD') {
                    arrayVerificarTriangulo[4] = 'LHD';
                    arraySegundosVerificarTriangulo[4] = time;

                    //volumen
                    timeMediaTriangulo = (timeMediaTriangulo + (time - lastTimeTriangulo)) / 2
                }
            }


            //console.log(timeToString(arraySegundosVerificarTriangulo[0]), timeToString(arraySegundosVerificarTriangulo[1]), timeToString(arraySegundosVerificarTriangulo[2]), timeToString(arraySegundosVerificarTriangulo[3]), timeToString(arraySegundosVerificarTriangulo[4]), '-', arrayVerificarTriangulo[0], arrayVerificarTriangulo[1], arrayVerificarTriangulo[2], arrayVerificarTriangulo[3], arrayVerificarTriangulo[4]);

        }
    }

    const checkCruz = (value) => {
        if (started) {

            //verificamos movimientos
            if (arrayVerificarCruz[0] === 'LHM' && arrayVerificarCruz[1] === 'LHL' && arrayVerificarCruz[2] === 'LHR' && arrayVerificarCruz[3] === 'LHM' && arrayVerificarCruz[4] === 'LHU' && arrayVerificarCruz[5] === 'LHM') {
                let timeDifference = arraySegundosVerificarCruz[5] - arraySegundosVerificarCruz[0]
                console.log(
                    timeToString(arraySegundosVerificarCruz[0]), timeToString(arraySegundosVerificarCruz[1]), timeToString(arraySegundosVerificarCruz[2]), timeToString(arraySegundosVerificarCruz[3]), timeToString(arraySegundosVerificarCruz[4]), timeToString(arraySegundosVerificarCruz[5]),
                    '-',
                    arrayVerificarCruz[0], arrayVerificarCruz[1], arrayVerificarCruz[2], arrayVerificarCruz[3], arrayVerificarCruz[4], arrayVerificarCruz[5]);
                console.log(timeToString(timeDifference), 'time difference')
                console.log(timetoBPM(timeToSeconds(timeDifference), 'cruz'), 'new BPM')
                //alert('patron cruz encontrado');
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'cruz')

                desviation = timeDesviation(arraySegundosVerificarCruz);

                resetBpmInputs();

                //volumen
                volume = timeMediaCruz;
                //console.log(timeMediaPunzada)

                resetVolumeInputs();

                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarCruz[0] === '' && value === 'LHM') {
                    arrayVerificarCruz[0] = 'LHM';
                    arraySegundosVerificarCruz[0] = time
                }

                if (arrayVerificarCruz[0] === 'LHM' && value === 'LHM' && arrayVerificarCruz[1] === '') {
                    arraySegundosVerificarCruz[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarCruz[0] === 'LHM' && arrayVerificarCruz[1] === '' && value === 'LHL') {
                    arrayVerificarCruz[1] = 'LHL';
                    arraySegundosVerificarCruz[1] = time;

                    //volumen
                    timeMediaCruz = arraySegundosVerificarCruz[1] - arraySegundosVerificarCruz[0];
                    lastTimeCruz = time
                } else if (arrayVerificarCruz[1] === 'LHL' && arrayVerificarCruz[2] === '' && value === 'LHL') {
                    lastTimeCruz = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarCruz[1] === 'LHL' && arrayVerificarCruz[2] === '' && value === 'LHR') {
                    arrayVerificarCruz[2] = 'LHR';
                    arraySegundosVerificarCruz[2] = time;

                    //volumen
                    timeMediaCruz = (timeMediaCruz + (time - lastTimeCruz)) / 2;
                    lastTimeCruz = time;
                } else if (arrayVerificarCruz[2] === 'LHR' && arrayVerificarCruz[3] === '' && value === 'LHR') {
                    lastTimeCruz = time;
                    return;
                }

                //4. Cuarta posicion
                if (arrayVerificarCruz[2] === 'LHR' && arrayVerificarCruz[3] === '' && value === 'LHM') {
                    arrayVerificarCruz[3] = 'LHM';
                    arraySegundosVerificarCruz[3] = time;

                    //volumen
                    timeMediaCruz = (timeMediaCruz + (time - lastTimeCruz)) / 2;
                    lastTimeCruz = time;
                } else if (arrayVerificarCruz[3] === 'LHM' && arrayVerificarCruz[4] === '' && value === 'LHM') {
                    lastTimeCruz = time;
                    return;
                }

                //5. Quinta posicion
                if (arrayVerificarCruz[3] === 'LHM' && arrayVerificarCruz[4] === '' && value === 'LHU') {
                    arrayVerificarCruz[4] = 'LHU';
                    arraySegundosVerificarCruz[4] = time;

                    //volumen
                    timeMediaCruz = (timeMediaCruz + (time - lastTimeCruz)) / 2;
                    lastTimeCruz = time;
                } else if (arrayVerificarCruz[4] === 'LHU' && arrayVerificarCruz[4] === '' && value === 'LHU') {
                    lastTimeCruz = time;
                    return;
                }

                //6. Quinta posicion
                if (arrayVerificarCruz[4] === 'LHU' && arrayVerificarCruz[5] === '' && value === 'LHM') {
                    arrayVerificarCruz[5] = 'LHM';
                    arraySegundosVerificarCruz[5] = time;

                    //volumen
                    timeMediaCruz = (timeMediaCruz + (time - lastTimeCruz)) / 2;
                }
            }

            // console.log(
            //     timeToString(arraySegundosVerificarCruz[0]), timeToString(arraySegundosVerificarCruz[1]), timeToString(arraySegundosVerificarCruz[2]), timeToString(arraySegundosVerificarCruz[3]), timeToString(arraySegundosVerificarCruz[4]), timeToString(arraySegundosVerificarCruz[5]),
            //     '-',
            //     arrayVerificarCruz[0], arrayVerificarCruz[1], arrayVerificarCruz[2], arrayVerificarCruz[3], arrayVerificarCruz[4], arrayVerificarCruz[5]);

        }
    }

    const checkPunzadaRight = (value) => {

        if (started) {
            //verificamos movimientos
            if (arrayVerificarPunzadaRight[0] === 'RHM' && arrayVerificarPunzadaRight[1] === 'RHU' && arrayVerificarPunzadaRight[2] === 'RHM') {
                let timeDifference = arraySegundosVerificarPunzadaRight[2] - arraySegundosVerificarPunzadaRight[0]
                console.log(timeToString(arraySegundosVerificarPunzadaRight[0]), timeToString(arraySegundosVerificarPunzadaRight[1]), timeToString(arraySegundosVerificarPunzadaRight[2]), '-', arrayVerificarPunzadaRight[0], arrayVerificarPunzadaRight[1], arrayVerificarPunzadaRight[2]);

                console.log(timeToString(timeDifference), 'time difference')
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'punzada')
                console.log(newBPM, 'new BPM')
                //alert('patron encontrado');
                desviation = timeDesviation(arraySegundosVerificarPunzadaRight);

                resetBpmInputs();

                //volumen
                volume = timeMediaPunzadaRight;
                //console.log(timeMediaPunzada)

                resetVolumeInputs();
                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarPunzadaRight[0] === '' && value === 'RHM') {
                    arrayVerificarPunzadaRight[0] = 'RHM';
                    arraySegundosVerificarPunzadaRight[0] = time
                }

                //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
                if (arrayVerificarPunzadaRight[0] === 'RHM' && value === 'RHM' && arrayVerificarPunzadaRight[1] === '') {
                    arraySegundosVerificarPunzadaRight[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarPunzadaRight[1] === '' && arrayVerificarPunzadaRight[0] === 'RHM' && value === 'RHU') {
                    arrayVerificarPunzadaRight[1] = 'RHU';
                    arraySegundosVerificarPunzadaRight[1] = time;

                    //volume
                    timeMediaPunzadaRight = arraySegundosVerificarPunzadaRight[1] - arraySegundosVerificarPunzadaRight[0];
                    lastTimePunzadaRight = time
                } else if (arrayVerificarPunzadaRight[1] === 'RHU' && arrayVerificarPunzadaRight[2] === '' && value === 'RHU') {
                    lastTimePunzadaRight = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarPunzadaRight[2] === '' && arrayVerificarPunzadaRight[1] === 'RHU' && value === 'RHM') {
                    arrayVerificarPunzadaRight[2] = 'RHM';
                    arraySegundosVerificarPunzadaRight[2] = time;

                    //volumen
                    timeMediaPunzadaRight = (timeMediaPunzadaRight + (time - lastTimePunzadaRight)) / 2;
                }
            }


            //console.log(timeToString(arraySegundosVerificarPunzada[0]), timeToString(arraySegundosVerificarPunzada[1]), timeToString(arraySegundosVerificarPunzada[2]), '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

        }
    }

    const checkTrianguloRight = (value) => {

        if (started) {
            //verificamos movimientos
            if (arrayVerificarTrianguloRight[0] === 'RHM' && arrayVerificarTrianguloRight[1] === 'RHR' && arrayVerificarTrianguloRight[2] === 'RHM' && arrayVerificarTrianguloRight[3] === 'RHU' && arrayVerificarTrianguloRight[4] === 'RHM') {
                let timeDifference = arraySegundosVerificarTrianguloRight[4] - arraySegundosVerificarTrianguloRight[0]
                console.log(timeToString(arraySegundosVerificarTrianguloRight[0]), timeToString(arraySegundosVerificarTrianguloRight[1]), timeToString(arraySegundosVerificarTrianguloRight[2]), timeToString(arraySegundosVerificarTrianguloRight[3]), timeToString(arraySegundosVerificarTrianguloRight[4]), '-', arrayVerificarTrianguloRight[0], arrayVerificarTrianguloRight[1], arrayVerificarTrianguloRight[2], arrayVerificarTrianguloRight[3], arrayVerificarTrianguloRight[4]);

                console.log(timeToString(timeDifference), 'time difference')
                console.log(timetoBPM(timeToSeconds(timeDifference), 'triangulo'), 'new BPM')
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'cruz')

                //alert('patron triangulo encontrado');
                desviation = timeDesviation(arraySegundosVerificarTrianguloRight);

                resetBpmInputs();

                //volumen
                volume = timeMediaTrianguloRight;
                //console.log(timeMediaPunzada)

                resetVolumeInputs();
                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarTrianguloRight[0] === '' && value === 'RHM') {
                    arrayVerificarTrianguloRight[0] = 'RHM';
                    arraySegundosVerificarTrianguloRight[0] = time
                }

                //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
                if (arrayVerificarTrianguloRight[0] === 'RHM' && value === 'RHM' && arrayVerificarTrianguloRight[1] === '') {
                    arraySegundosVerificarTrianguloRight[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarTrianguloRight[0] === 'RHM' && arrayVerificarTrianguloRight[1] === '' && value === 'RHR') {
                    arrayVerificarTrianguloRight[1] = 'RHR';
                    arraySegundosVerificarTrianguloRight[1] = time;

                    //volumen
                    timeMediaTrianguloRight = arrayVerificarTrianguloRight[1] - arrayVerificarTrianguloRight[0];
                    lastTimeTrianguloRight = time
                } else if (arrayVerificarTrianguloRight[1] === 'RHR' && arrayVerificarTrianguloRight[2] === '' && value === 'RHR') {
                    lastTimeTrianguloRight = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarTrianguloRight[1] === 'RHR' && arrayVerificarTrianguloRight[2] === '' && value === 'RHM') {
                    arrayVerificarTrianguloRight[2] = 'RHM';
                    arraySegundosVerificarTrianguloRight[2] = time;

                    //volumen
                    timeMediaTrianguloRight = (timeMediaTrianguloRight + (time - lastTimeTrianguloRight)) / 2;
                    lastTimeTrianguloRight = time
                } else if (arrayVerificarTrianguloRight[2] === 'RHM' && arrayVerificarTrianguloRight[3] === '' && value === 'RHM') {
                    lastTimeTrianguloRight = time;
                    return;
                }

                //4. Cuarta posicion
                if (arrayVerificarTrianguloRight[2] === 'RHM' && arrayVerificarTrianguloRight[3] === '' && value === 'RHU') {
                    arrayVerificarTrianguloRight[3] = 'RHU';
                    arraySegundosVerificarTrianguloRight[3] = time;

                    //volumen
                    timeMediaTrianguloRight = (timeMediaTrianguloRight + (time - lastTimeTrianguloRight)) / 2;
                    lastTimeTrianguloRight = time
                } else if (arrayVerificarTrianguloRight[3] === 'RHU' && arrayVerificarTrianguloRight[4] === '' && value === 'RHU') {
                    lastTimeTrianguloRight = time;
                    return;
                }

                //5. Quinta posicion
                if (arrayVerificarTrianguloRight[3] === 'RHU' && arrayVerificarTrianguloRight[4] === '' && value === 'RHM') {
                    arrayVerificarTrianguloRight[4] = 'RHM';
                    arraySegundosVerificarTrianguloRight[4] = time;

                    //volumen
                    timeMediaTrianguloRight = (timeMediaTrianguloRight + (time - lastTimeTrianguloRight)) / 2
                }
            }


            //console.log(timeToString(arraySegundosVerificarTrianguloRight[0]), timeToString(arraySegundosVerificarTrianguloRight[1]), timeToString(arraySegundosVerificarTrianguloRight[2]), timeToString(arraySegundosVerificarTrianguloRight[3]), timeToString(arraySegundosVerificarTrianguloRight[4]), '-', arrayVerificarTrianguloRight[0], arrayVerificarTrianguloRight[1], arrayVerificarTrianguloRight[2], arrayVerificarTrianguloRight[3], arrayVerificarTrianguloRight[4]);

        }
    }

    const checkCruzRight = (value) => {
        if (started) {

            //verificamos movimientos
            if (arrayVerificarCruzRight[0] === 'RHM' && arrayVerificarCruzRight[1] === 'RHL' && arrayVerificarCruzRight[2] === 'RHR' && arrayVerificarCruzRight[3] === 'RHM' && arrayVerificarCruzRight[4] === 'RHU' && arrayVerificarCruzRight[5] === 'RHM') {
                let timeDifference = arraySegundosVerificarCruzRight[5] - arraySegundosVerificarCruzRight[0]
                console.log(
                    timeToString(arraySegundosVerificarCruzRight[0]), timeToString(arraySegundosVerificarCruzRight[1]), timeToString(arraySegundosVerificarCruzRight[2]), timeToString(arraySegundosVerificarCruzRight[3]), timeToString(arraySegundosVerificarCruzRight[4]), timeToString(arraySegundosVerificarCruzRight[5]),
                    '-',
                    arrayVerificarCruzRight[0], arrayVerificarCruzRight[1], arrayVerificarCruzRight[2], arrayVerificarCruzRight[3], arrayVerificarCruzRight[4], arrayVerificarCruzRight[5]);
                console.log(timeToString(timeDifference), 'time difference')
                console.log(timetoBPM(timeToSeconds(timeDifference), 'cruz'), 'new BPM')
                let newBPM = timetoBPM(timeToSeconds(timeDifference), 'cruz')

                //alert('patron cruz encontrado');
                desviation = timeDesviation(arraySegundosVerificarCruzRight);

                resetBpmInputs();

                //volumen
                volume = timeMediaCruzRight;
                //console.log(timeMediaPunzada)

                resetVolumeInputs();
                return newBPM;
            }

            if (value) {
                //1. Primera posicion
                //Llenamos el arreglo cuando esta vacio
                if (arrayVerificarCruzRight[0] === '' && value === 'RHM') {
                    arrayVerificarCruzRight[0] = 'RHM';
                    arraySegundosVerificarCruzRight[0] = time
                }

                if (arrayVerificarCruzRight[0] === 'RHM' && value === 'RHM' && arrayVerificarCruzRight[1] === '') {
                    arraySegundosVerificarCruzRight[0] = time
                }

                //2. Segunda posicion
                if (arrayVerificarCruzRight[0] === 'RHM' && arrayVerificarCruzRight[1] === '' && value === 'RHL') {
                    arrayVerificarCruzRight[1] = 'RHL';
                    arraySegundosVerificarCruzRight[1] = time

                    //volumen
                    timeMediaCruzRight = arraySegundosVerificarCruzRight[1] - arraySegundosVerificarCruzRight[0];
                    lastTimeCruzRight = time
                } else if (arrayVerificarCruzRight[1] === 'RHL' && arrayVerificarCruzRight[2] === '' && value === 'RHL') {
                    lastTimeCruzRight = time;
                    return;
                }


                //3. Tercera posicion
                if (arrayVerificarCruzRight[1] === 'RHL' && arrayVerificarCruzRight[2] === '' && value === 'RHR') {
                    arrayVerificarCruzRight[2] = 'RHR';
                    arraySegundosVerificarCruzRight[2] = time;

                    //volumen
                    timeMediaCruzRight = (timeMediaCruzRight + (time - lastTimeCruzRight)) / 2;
                    lastTimeCruzRight = time;
                } else if (arrayVerificarCruzRight[2] === 'RHR' && arrayVerificarCruzRight[3] === '' && value === 'RHR') {
                    lastTimeCruzRight = time;
                    return;
                }

                //4. Cuarta posicion
                if (arrayVerificarCruzRight[2] === 'RHR' && arrayVerificarCruzRight[3] === '' && value === 'RHM') {
                    arrayVerificarCruzRight[3] = 'RHM';
                    arraySegundosVerificarCruzRight[3] = time;

                    //volumen
                    timeMediaCruzRight = (timeMediaCruzRight + (time - lastTimeCruzRight)) / 2;
                    lastTimeCruzRight = time;
                } else if (arrayVerificarCruzRight[3] === 'RHM' && arrayVerificarCruzRight[4] === '' && value === 'RHM') {
                    lastTimeCruzRight = time;
                    return;
                }

                //5. Quinta posicion
                if (arrayVerificarCruzRight[3] === 'RHM' && arrayVerificarCruzRight[4] === '' && value === 'RHU') {
                    arrayVerificarCruzRight[4] = 'RHU';
                    arraySegundosVerificarCruzRight[4] = time;

                    //volumen
                    timeMediaCruzRight = (timeMediaCruzRight + (time - lastTimeCruzRight)) / 2;
                    lastTimeCruzRight = time;
                } else if (arrayVerificarCruzRight[4] === 'RHU' && arrayVerificarCruzRight[5] === '' && value === 'RHU') {
                    lastTimeCruzRight = time;
                    return;
                }

                //6. Quinta posicion
                if (arrayVerificarCruzRight[4] === 'RHU' && arrayVerificarCruzRight[5] === '' && value === 'RHM') {
                    arrayVerificarCruzRight[5] = 'RHM';
                    arraySegundosVerificarCruzRight[5] = time;

                    //volumen
                    timeMediaCruzRight = (timeMediaCruzRight + (time - lastTimeCruzRight)) / 2;
                }
            }

            // console.log(
            //     timeToString(arraySegundosVerificarCruzRight[0]), timeToString(arraySegundosVerificarCruzRight[1]), timeToString(arraySegundosVerificarCruzRight[2]), timeToString(arraySegundosVerificarCruzRight[3]), timeToString(arraySegundosVerificarCruzRight[4]), timeToString(arraySegundosVerificarCruzRight[5]),
            //     '-',
            //     arrayVerificarCruzRight[0], arrayVerificarCruzRight[1], arrayVerificarCruzRight[2], arrayVerificarCruzRight[3], arrayVerificarCruzRight[4], arrayVerificarCruzRight[5]);

        }
    }

    const timeToString = (timeInt) => {
        return ("0" + Math.floor((timeInt / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((timeInt / 1000) % 60)).slice(-2) + ":" + ("0" + ((timeInt / 10) % 100)).slice(-2)
    }

    const timeToSeconds = (timeInt) => {
        return parseFloat(("0" + Math.floor((timeInt / 60000) % 60)).slice(-2) * 60) + parseFloat(("0" + Math.floor((timeInt / 1000) % 60)).slice(-2)) + parseFloat(("0" + ((timeInt / 10) % 100)).slice(-2) / 1000)
    }

    const timetoBPM = (difference, patternType) => {
        let BPM = 0;

        if (patternType === 'punzada') {
            BPM = 120 / difference;
        }

        if (patternType === 'triangulo') {
            BPM = 180 / difference;
        }
        if (patternType === 'cruz') {
            BPM = 240 / difference;
        }
        return BPM;
    }

    React.useEffect(() => {
        let interval = null;

        if (timerOn) {
            //default speed = 10
            interval = setInterval(() => {
                time = time + 10;
                //console.log(time)
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    return (
        <PoseContext.Provider value={{
            checkPunzada: checkPunzada,
            checkTriangulo: checkTriangulo,
            checkCruz: checkCruz,
            checkPunzadaRight: checkPunzadaRight,
            checkTrianguloRight: checkTrianguloRight,
            checkCruzRight: checkCruzRight,
            startController: startController,
            pauseController: pauseController,
            getVolume: getVolume,
            getDesviation: getDesviation,
            checkPitchLeft: checkPitchLeft,
            checkPitchRight: checkPitchRight,
            checkPlayer: checkPlayer,
            checkTPose: checkTPose
        }}>
            {props.children}
        </PoseContext.Provider>
    )
}