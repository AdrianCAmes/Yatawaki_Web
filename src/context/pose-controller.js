import React, { createContext, useEffect, useState } from "react";

const PoseContext = createContext({
    checkPunzada: null,
    checkTriangulo: null
})

export default PoseContext;

export const PoseContextProvider = (props) => {

    let time = 0;
    let arrayVerificarPunzada = ['', '', ''];
    let arraySegundosVerificarPunzada = ['', '', ''];

    let arrayVerificarTriangulo = ['', '', '', '', ''];
    let arraySegundosVerificarTriangulo = ['', '', '', '', ''];

    let timerOn = true

    const checkPunzada = (value) => {
        let timeString = ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2)

        //verificamos movimientos
        if (arrayVerificarPunzada[0] == 'LHM' && arrayVerificarPunzada[1] == 'LHU' && arrayVerificarPunzada[2] == 'LHM') {
            alert('patron encontrado');
            arrayVerificarPunzada = ['', '', ''];
            arraySegundosVerificarPunzada = ['', '', ''];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarPunzada[0] == '' && arrayVerificarPunzada[1] == '' && value == 'LHM') {
                arrayVerificarPunzada[0] = 'LHM';
                arraySegundosVerificarPunzada[0] = timeString
            }

            //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarPunzada[0] == 'LHM' && value == 'LHM' && arrayVerificarPunzada[1] == '') {
                arraySegundosVerificarPunzada[0] = timeString
            }

            //2. Segunda posicion
            if (arrayVerificarPunzada[1] == '' && arrayVerificarPunzada[2] == '' && arrayVerificarPunzada[0] == 'LHM' && value == 'LHU') {
                arrayVerificarPunzada[1] = 'LHU';
                arraySegundosVerificarPunzada[1] = timeString
            }


            //3. Tercera posicion
            if (arrayVerificarPunzada[2] == '' && arrayVerificarPunzada[0] == 'LHM' && arrayVerificarPunzada[1] == 'LHU' && value == 'LHM') {
                arrayVerificarPunzada[2] = 'LHM';
                arraySegundosVerificarPunzada[2] = timeString;
            }
        }


        //console.log(arraySegundosVerificarPunzada[0], arraySegundosVerificarPunzada[1], arraySegundosVerificarPunzada[2], '-', arrayVerificarPunzada[0], arrayVerificarPunzada[1], arrayVerificarPunzada[2]);

    }

    const checkTriangulo = (value) => {
        //['LHD','LHl','LHD','LHU','LHD']
        let timeString = ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2) + ":" + ("0" + ((time / 10) % 100)).slice(-2)

        //verificamos movimientos
        if (arrayVerificarTriangulo[0] == 'LHD' && arrayVerificarTriangulo[1] == 'LHL' && arrayVerificarTriangulo[2] == 'LHD' && arrayVerificarTriangulo[3] == 'LHU' && arrayVerificarTriangulo[4] == 'LHD') {
            alert('patron triangulo encontrado');
            arrayVerificarTriangulo = ['', '', '', '', ''];
            arraySegundosVerificarTriangulo = ['', '', '', '', ''];
            return true;
        }

        if (value) {
            //1. Primera posicion
            //Llenamos el arreglo cuando esta vacio
            if (arrayVerificarTriangulo[0] == '' && value == 'LHD') {
                arrayVerificarTriangulo[0] = 'LHD';
                arraySegundosVerificarTriangulo[0] = timeString
            }

            //Si encuentra un nuevo LHM, y no se ha llenado la siguiente posicion, actualizamos el tiempo
            if (arrayVerificarTriangulo[0] == 'LHD' && value == 'LHD' && arrayVerificarTriangulo[1] == '') {
                arraySegundosVerificarTriangulo[0] = timeString
            }

            //2. Segunda posicion
            if (arrayVerificarTriangulo[0] == 'LHD' && arrayVerificarTriangulo[1] == '' && value == 'LHL') {
                arrayVerificarTriangulo[1] = 'LHL';
                arraySegundosVerificarTriangulo[1] = timeString
            }


            //3. Tercera posicion
            if (arrayVerificarTriangulo[1] == 'LHL' && arrayVerificarTriangulo[2] == '' && value == 'LHD') {
                arrayVerificarTriangulo[2] = 'LHD';
                arraySegundosVerificarTriangulo[2] = timeString;
            }

            //4. Cuarta posicion
            if (arrayVerificarTriangulo[2] == 'LHD' && arrayVerificarTriangulo[3] == '' && value == 'LHU') {
                arrayVerificarTriangulo[3] = 'LHU';
                arraySegundosVerificarTriangulo[3] = timeString;
            }

            //3. Quinta posicion
            if (arrayVerificarTriangulo[3] == 'LHU' && arrayVerificarTriangulo[4] == '' && value == 'LHD') {
                arrayVerificarTriangulo[4] = 'LHD';
                arraySegundosVerificarTriangulo[4] = timeString;
            }
        }


        console.log(arraySegundosVerificarTriangulo[0], arraySegundosVerificarTriangulo[1], arraySegundosVerificarTriangulo[2], arraySegundosVerificarTriangulo[3], arraySegundosVerificarTriangulo[4], '-', arrayVerificarTriangulo[0], arrayVerificarTriangulo[1], arrayVerificarTriangulo[2], arrayVerificarTriangulo[3], arrayVerificarTriangulo[4]);

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
            checkTriangulo: checkTriangulo

        }}>
            {props.children}
        </PoseContext.Provider>
    )
}