import React, { createContext, useEffect, useState } from "react";

const PoseContext = createContext({
    checkPunzada: null
})

export default PoseContext;

export const PoseContextProvider = (props) => {

    let time = 0;
    let arrayVerificarPunzada = ['', '', ''];
    let arraySegundosVerificarPunzada = ['', '', ''];
    let timerOn = true

    const checkPunzada = (value) => {
        let timeString = ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2)

        //verificamos movimientos
        if (arrayVerificarPunzada[0] == 'LHD' && arrayVerificarPunzada[1] == 'LHU' && arrayVerificarPunzada[2] == 'LHD') {
            alert('patron encontrado');
            arrayVerificarPunzada = ['', '', ''];
            arraySegundosVerificarPunzada = ['', '', ''];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarPunzada[0] == '' && arrayVerificarPunzada[1] == '' && value == 'LHD') {
                arrayVerificarPunzada[0] = 'LHD';
                arraySegundosVerificarPunzada[0] = timeString
            }

            //Si encuentra un nuevo LHD, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarPunzada[0] == 'LHD' && value == 'LHD' && arrayVerificarPunzada[1] == '') {
                arraySegundosVerificarPunzada[0] = timeString
            }

            //2. Segunda posicion
            if (arrayVerificarPunzada[1] == '' && arrayVerificarPunzada[2] == '' && arrayVerificarPunzada[0] == 'LHD' && value == 'LHU') {
                arrayVerificarPunzada[1] = 'LHU';
                arraySegundosVerificarPunzada[1] = timeString
            }


            //3. Tercera posicion
            if (arrayVerificarPunzada[2] == '' && arrayVerificarPunzada[0] == 'LHD' && arrayVerificarPunzada[1] == 'LHU' && arrayVerificarPunzada[2] == '' && value == 'LHD') {
                arrayVerificarPunzada[2] = 'LHD';
                arraySegundosVerificarPunzada[2] = timeString;
            }
        }


        console.log(arraySegundosVerificarPunzada[0], arraySegundosVerificarPunzada[1], arraySegundosVerificarPunzada[2], '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

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
            checkPunzada: checkPunzada

        }}>
            {props.children}
        </PoseContext.Provider>
    )
}