import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CameraDeniedDialog from '../../../pages/components/CameraDeniedDialog'

test('test no player', () => {


    const component = render(
        <BrowserRouter>
            <CameraDeniedDialog open={true} isCameraDenied={false}></CameraDeniedDialog>
        </BrowserRouter>
    )

    component.getByText('No se ha detectado jugador. Por favor revisa tu camara.')

})

test('test no camera found', () => {


    const component = render(
        <BrowserRouter>
            <CameraDeniedDialog open={true} isCameraDenied={true}></CameraDeniedDialog>
        </BrowserRouter>
    )

    component.getByText('Acceso a camara denegada. Por favor revise los permisos.')

})