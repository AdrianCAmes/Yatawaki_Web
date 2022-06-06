import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AppBarYatawaki from '../../../pages/components/AppBarYatawaki'
import { GameContextProvider } from '../../../context/game-context'

test('render GameResults', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <AppBarYatawaki resume={resume}></AppBarYatawaki>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(resume.level)
    expect(component.container).toHaveTextContent(resume.currentExperience)
    expect(component.container).toHaveTextContent(resume.coinsOwned)

    component.debug()
})

test('click menu', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <AppBarYatawaki resume={resume}></AppBarYatawaki>
        </BrowserRouter>
    )

    const button = component.getByTestId('iconopen')
    fireEvent.click(button)


    component.getByText('Perfil')
})

test('click to perfil', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <AppBarYatawaki resume={resume}></AppBarYatawaki>
        </BrowserRouter>
    )

    const button = component.getByTestId('iconopen')
    fireEvent.click(button)


    const perfilButton = component.getByText('Perfil').parentNode


    fireEvent.click(perfilButton)
    expect(window.location.pathname).toEqual('/perfil');


})


test('click to logout', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <GameContextProvider>
                <AppBarYatawaki resume={resume}></AppBarYatawaki>
            </GameContextProvider>
        </BrowserRouter>
    )

    const button = component.getByTestId('iconopen')
    fireEvent.click(button)


    const cerrarSesionButton = component.getByText('Cerrar Sesion').parentNode


    fireEvent.click(cerrarSesionButton)
    expect(window.location.pathname).toEqual('/');


})

test('click to tutorial', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <GameContextProvider>
                <AppBarYatawaki resume={resume}></AppBarYatawaki>
            </GameContextProvider>
        </BrowserRouter>
    )

    const button = component.getByTestId('iconopen')
    fireEvent.click(button)


    const cerrarSesionButton = component.getByText('Tutorial').parentNode


    fireEvent.click(cerrarSesionButton)
    expect(window.location.pathname).toEqual('/tutorial');


})