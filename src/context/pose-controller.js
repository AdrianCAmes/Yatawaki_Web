import React, { createContext, useEffect, useState } from "react";

const PoseContext = createContext({
    checkPunzada: null,
    checkTriangulo: null,
    checkCruz: null
})

export default PoseContext;

export const PoseContextProvider = (props) => {

    let time = 0;
    let arrayVerificarPunzada = ['', '', ''];
    let arraySegundosVerificarPunzada = [0, 0, 0];

    let arrayVerificarTriangulo = ['', '', '', '', ''];
    let arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];

    let arrayVerificarCruz = ['', '', '', '', '', ''];
    let arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];

    let timerOn = true
    //REGLA GENERAL: En cada paso verificar el anterior completo y el actual vacio :) Menos en el primero

    const checkPunzada = (value) => {

        //verificamos movimientos
        if (arrayVerificarPunzada[0] == 'LHM' && arrayVerificarPunzada[1] == 'LHU' && arrayVerificarPunzada[2] == 'LHM') {
            let timeDifference = arraySegundosVerificarPunzada[2] - arraySegundosVerificarPunzada[0]
            console.log(timeToString(arraySegundosVerificarPunzada[0]), timeToString(arraySegundosVerificarPunzada[1]), timeToString(arraySegundosVerificarPunzada[2]), '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

            console.log(timeToString(timeDifference), 'time difference')
            console.log(timetoBPM(timeToSeconds(timeDifference), 'punzada'), 'new BPM')
            alert('patron encontrado');
            arrayVerificarPunzada = ['', '', ''];
            arraySegundosVerificarPunzada = [0, 0, 0];
        
            arrayVerificarTriangulo = ['', '', '', '', ''];
            arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];
        
            arrayVerificarCruz = ['', '', '', '', '', ''];
            arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarPunzada[0] == '' && value == 'LHM') {
                arrayVerificarPunzada[0] = 'LHM';
                arraySegundosVerificarPunzada[0] = time
            }

            //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarPunzada[0] == 'LHM' && value == 'LHM' && arrayVerificarPunzada[1] == '') {
                arraySegundosVerificarPunzada[0] = time
            }

            //2. Segunda posicion
            if (arrayVerificarPunzada[1] == '' && arrayVerificarPunzada[0] == 'LHM' && value == 'LHU') {
                arrayVerificarPunzada[1] = 'LHU';
                arraySegundosVerificarPunzada[1] = time
            }


            //3. Tercera posicion
            if (arrayVerificarPunzada[2] == '' && arrayVerificarPunzada[1] == 'LHU' && value == 'LHM') {
                arrayVerificarPunzada[2] = 'LHM';
                arraySegundosVerificarPunzada[2] = time;
            }
        }


        //console.log(timeToString(arraySegundosVerificarPunzada[0]), timeToString(arraySegundosVerificarPunzada[1]), timeToString(arraySegundosVerificarPunzada[2]), '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

    }

    const checkTriangulo = (value) => {
        //['LHD','LHl','LHD','LHU','LHD']

        //verificamos movimientos
        if (arrayVerificarTriangulo[0] == 'LHD' && arrayVerificarTriangulo[1] == 'LHL' && arrayVerificarTriangulo[2] == 'LHD' && arrayVerificarTriangulo[3] == 'LHU' && arrayVerificarTriangulo[4] == 'LHD') {
            let timeDifference = arraySegundosVerificarTriangulo[4] - arraySegundosVerificarTriangulo[0]
            console.log(timeToString(arraySegundosVerificarTriangulo[0]), timeToString(arraySegundosVerificarTriangulo[1]), timeToString(arraySegundosVerificarTriangulo[2]), timeToString(arraySegundosVerificarTriangulo[3]), timeToString(arraySegundosVerificarTriangulo[4]), '-', arrayVerificarTriangulo[0], arrayVerificarTriangulo[1], arrayVerificarTriangulo[2], arrayVerificarTriangulo[3], arrayVerificarTriangulo[4]);

            console.log(timeToString(timeDifference), 'time difference')
            console.log(timetoBPM(timeToSeconds(timeDifference), 'triangulo'), 'new BPM')
            alert('patron triangulo encontrado');
            arrayVerificarPunzada = ['', '', ''];
            arraySegundosVerificarPunzada = [0, 0, 0];
        
            arrayVerificarTriangulo = ['', '', '', '', ''];
            arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];
        
            arrayVerificarCruz = ['', '', '', '', '', ''];
            arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarTriangulo[0] == '' && value == 'LHD') {
                arrayVerificarTriangulo[0] = 'LHD';
                arraySegundosVerificarTriangulo[0] = time
            }

            //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarTriangulo[0] == 'LHD' && value == 'LHD' && arrayVerificarTriangulo[1] == '') {
                arraySegundosVerificarTriangulo[0] = time
            }

            //2. Segunda posicion
            if (arrayVerificarTriangulo[0] == 'LHD' && arrayVerificarTriangulo[1] == '' && value == 'LHL') {
                arrayVerificarTriangulo[1] = 'LHL';
                arraySegundosVerificarTriangulo[1] = time
            }


            //3. Tercera posicion
            if (arrayVerificarTriangulo[1] == 'LHL' && arrayVerificarTriangulo[2] == '' && value == 'LHD') {
                arrayVerificarTriangulo[2] = 'LHD';
                arraySegundosVerificarTriangulo[2] = time;
            }

            //4. Cuarta posicion
            if (arrayVerificarTriangulo[2] == 'LHD' && arrayVerificarTriangulo[3] == '' && value == 'LHU') {
                arrayVerificarTriangulo[3] = 'LHU';
                arraySegundosVerificarTriangulo[3] = time;
            }

            //3. Quinta posicion
            if (arrayVerificarTriangulo[3] == 'LHU' && arrayVerificarTriangulo[4] == '' && value == 'LHD') {
                arrayVerificarTriangulo[4] = 'LHD';
                arraySegundosVerificarTriangulo[4] = time;
            }
        }


        //console.log(timeToString(arraySegundosVerificarTriangulo[0]), timeToString(arraySegundosVerificarTriangulo[1]), timeToString(arraySegundosVerificarTriangulo[2]), timeToString(arraySegundosVerificarTriangulo[3]), timeToString(arraySegundosVerificarTriangulo[4]), '-', arrayVerificarTriangulo[0], arrayVerificarTriangulo[1], arrayVerificarTriangulo[2], arrayVerificarTriangulo[3], arrayVerificarTriangulo[4]);

    }

    const checkCruz = (value) => {

        //verificamos movimientos
        if (arrayVerificarCruz[0] == 'LHM' && arrayVerificarCruz[1] == 'LHL' && arrayVerificarCruz[2] == 'LHR' && arrayVerificarCruz[3] == 'LHM' && arrayVerificarCruz[4] == 'LHU' && arrayVerificarCruz[5] == 'LHM') {
            let timeDifference = arraySegundosVerificarCruz[5] - arraySegundosVerificarCruz[0]
            console.log(
                timeToString(arraySegundosVerificarCruz[0]), timeToString(arraySegundosVerificarCruz[1]), timeToString(arraySegundosVerificarCruz[2]), timeToString(arraySegundosVerificarCruz[3]), timeToString(arraySegundosVerificarCruz[4]), timeToString(arraySegundosVerificarCruz[5]),
                '-',
                arrayVerificarCruz[0], arrayVerificarCruz[1], arrayVerificarCruz[2], arrayVerificarCruz[3], arrayVerificarCruz[4], arrayVerificarCruz[5]);
            console.log(timeToString(timeDifference), 'time difference')
            console.log(timetoBPM(timeToSeconds(timeDifference), 'cruz'), 'new BPM')
            alert('patron cruz encontrado');
            arrayVerificarPunzada = ['', '', ''];
            arraySegundosVerificarPunzada = [0, 0, 0];
        
            arrayVerificarTriangulo = ['', '', '', '', ''];
            arraySegundosVerificarTriangulo = [0, 0, 0, 0, 0];
        
            arrayVerificarCruz = ['', '', '', '', '', ''];
            arraySegundosVerificarCruz = [0, 0, 0, 0, 0, 0];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarCruz[0] == '' && value == 'LHM') {
                arrayVerificarCruz[0] = 'LHM';
                arraySegundosVerificarCruz[0] = time
            }

            if (arrayVerificarCruz[0] == 'LHM' && value == 'LHM' && arrayVerificarCruz[1] == '') {
                arraySegundosVerificarCruz[0] = time
            }

            //2. Segunda posicion
            if (arrayVerificarCruz[0] == 'LHM' && arrayVerificarCruz[1] == '' && value == 'LHL') {
                arrayVerificarCruz[1] = 'LHL';
                arraySegundosVerificarCruz[1] = time
            }


            //3. Tercera posicion
            if (arrayVerificarCruz[1] == 'LHL' && arrayVerificarCruz[2] == '' && value == 'LHR') {
                arrayVerificarCruz[2] = 'LHR';
                arraySegundosVerificarCruz[2] = time;
            }

            //4. Cuarta posicion
            if (arrayVerificarCruz[2] == 'LHR' && arrayVerificarCruz[3] == '' && value == 'LHM') {
                arrayVerificarCruz[3] = 'LHM';
                arraySegundosVerificarCruz[3] = time;
            }

            //5. Quinta posicion
            if (arrayVerificarCruz[3] == 'LHM' && arrayVerificarCruz[4] == '' && value == 'LHU') {
                arrayVerificarCruz[4] = 'LHU';
                arraySegundosVerificarCruz[4] = time;
            }

            //6. Quinta posicion
            if (arrayVerificarCruz[4] == 'LHU' && arrayVerificarCruz[5] == '' && value == 'LHM') {
                arrayVerificarCruz[5] = 'LHM';
                arraySegundosVerificarCruz[5] = time;
            }
        }

        // console.log(
        //     timeToString(arraySegundosVerificarCruz[0]), timeToString(arraySegundosVerificarCruz[1]), timeToString(arraySegundosVerificarCruz[2]), timeToString(arraySegundosVerificarCruz[3]), timeToString(arraySegundosVerificarCruz[4]), timeToString(arraySegundosVerificarCruz[5]),
        //     '-',
        //     arrayVerificarCruz[0], arrayVerificarCruz[1], arrayVerificarCruz[2], arrayVerificarCruz[3], arrayVerificarCruz[4], arrayVerificarCruz[5]);

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
            BPM = 240 / difference;
        }
        if (patternType === 'cruz') {
            BPM = 300 / difference;
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

        }}>
            {props.children}
        </PoseContext.Provider>
    )
}