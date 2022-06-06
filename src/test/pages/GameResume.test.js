
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SnackBarContextProvider } from '../../context/snack-bar-context'
import { GameContextProvider } from '../../context/game-context'
import GameResume from '../../pages/GameResume'
import ConcertApis from '../../apis/concert-apis'

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});

test("test component render", async () => {
    const spy = jest.spyOn(ConcertApis, 'concertComplete')
        .mockResolvedValue({
            data: {
                jwt: 'swodifjmwoie'
            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <GameResume></GameResume>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

    component.getByText('100%')

})

test("test component with unlockable", async () => {
    const spy = jest.spyOn(ConcertApis, 'concertComplete')
        .mockResolvedValue({
            data: {
                unlockedObjects: [
                    { name: 'Esta es la prueba del nombre' },
                    { name: 'Esta es la prueba del nombre' }
                ]
            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <GameResume></GameResume>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

    component.getByText('Esta es la prueba del nombre')
})

test("test component with new rank", async () => {
    const spy = jest.spyOn(ConcertApis, 'concertComplete')
        .mockResolvedValue({
            data: {
                newRank:
                    { name: 'Esta es la prueba del rank' },

            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <GameResume></GameResume>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

    component.getByText('Has desbloqueado un objeto')
    component.debug()
})


test("test show next unlockable", async () => {
    const spy = jest.spyOn(ConcertApis, 'concertComplete')
        .mockResolvedValue({
            data: {
                unlockedObjects: [
                    { name: 'Esta es la prueba del nombre' },
                    { name: 'Esta es la prueba del nombre 2' }
                ]
            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <GameResume></GameResume>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

    component.getByText('Esta es la prueba del nombre')


    const nextButton = component.getByText('Siguiente').parentNode

    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    component.getByText('Esta es la prueba del nombre 2')


    component.debug()

})

test("test redirect to menu", async () => {
    const spy = jest.spyOn(ConcertApis, 'concertComplete')
        .mockResolvedValue({
            data: {
                jwt: 'swodifjmwoie'
            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <GameResume></GameResume>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

    component.getByText('100%')

    const toMenuButton = component.getByText('Aceptar').parentNode

    fireEvent.click(toMenuButton)

    expect(window.location.pathname).toEqual('/menu');

})