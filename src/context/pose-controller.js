import React, { createContext, useEffect, useState } from "react";

const PoseContext = createContext({
    checkPlumada: null
})

export default PoseContext;

export const PoseContextProvider = (props) => {

    let time = 0;
    let arrayVerificarPlumada = ['', '', ''];
    let arraySegundosVerificarPlumada = ['', '', ''];
    let timerOn = true

    const checkPlumada = (value) => {
        let timeString = ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2)

        //verificamos movimientos
        if (arrayVerificarPlumada[0] == 'LHD' && arrayVerificarPlumada[1] == 'LHU' && arrayVerificarPlumada[2] == 'LHD') {
            alert('patron encontrado');
            arrayVerificarPlumada = ['', '', ''];
            arraySegundosVerificarPlumada = ['', '', ''];
            return true;
        }

        if (value) {
            //Verificamos errores
            if (arrayVerificarPlumada[0] == 'LHU' || arrayVerificarPlumada[1] == 'LHD' || arrayVerificarPlumada[2] == 'LHU') {
                arrayVerificarPlumada = ['', '', ''];
                arraySegundosVerificarPlumada = ['', '', ''];
            }

            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarPlumada[0] == '' && arrayVerificarPlumada[1] == '' && value == 'LHD') {
                arrayVerificarPlumada[0] = 'LHD';
                arraySegundosVerificarPlumada[0] = timeString
            }

            //Si encuentra un nuevo LHD, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarPlumada[0] == 'LHD' && value == 'LHD' && arrayVerificarPlumada[1] == '') {
                arraySegundosVerificarPlumada[0] = timeString
            }

            //2. Segunda posicion
            if (arrayVerificarPlumada[1] == '' && arrayVerificarPlumada[2] == '' && value == 'LHU') {
                arrayVerificarPlumada[1] = 'LHU';
                arraySegundosVerificarPlumada[1] = timeString
            }


            //3. Tercera posicion
            if (arrayVerificarPlumada[2] == '' && arrayVerificarPlumada[0] == 'LHD' && arrayVerificarPlumada[1] == 'LHU' && arrayVerificarPlumada[2] == '' && value == 'LHD') {
                arrayVerificarPlumada[2] = 'LHD';
                arraySegundosVerificarPlumada[2] = timeString;
            }
        }


        console.log(arraySegundosVerificarPlumada[0], arraySegundosVerificarPlumada[1], arraySegundosVerificarPlumada[2], '-', arrayVerificarPlumada[0], arrayVerificarPlumada[1], arrayVerificarPlumada[2]);

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
            checkPlumada: checkPlumada

        }}>
            {props.children}
        </PoseContext.Provider>
    )
}