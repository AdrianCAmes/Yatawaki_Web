import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Splashscreen from '../../pages/Splashscreen'
import { BrowserRouter } from 'react-router-dom'
test('render splashscreen content', () => {
    const component = render(
        <BrowserRouter>
            <Splashscreen></Splashscreen>
        </BrowserRouter>
    )

    //buscando contenido
    component.getByText('YATAWAKI')
    component.getByText('REGISTRATE')
    component.getByText('LOGIN')

})

test('clicking register to navigate', () => {

    const component = render(
        <BrowserRouter>
            <Splashscreen></Splashscreen>
        </BrowserRouter>
    )


    const registerButton = component.getByText('REGISTRATE')
    fireEvent.click(registerButton.parentNode)



    expect(window.location.pathname).toEqual('/register');
})

test('clicking login to navigate', () => {

    const component = render(
        <BrowserRouter>
            <Splashscreen></Splashscreen>
        </BrowserRouter>
    )

    const registerButton = component.getByText('LOGIN')
    fireEvent.click(registerButton.parentNode)

    expect(window.location.pathname).toEqual('/login');
})