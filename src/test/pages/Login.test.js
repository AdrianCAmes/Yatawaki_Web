
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../pages/Login'
import AuthApi from '../../apis/auth-apis'
import userEvent from '@testing-library/user-event'
import SnackBarContext, { SnackBarContextProvider } from '../../context/snack-bar-context'
import { GameContextProvider } from '../../context/game-context'
import { Snackbar } from '@mui/material'
import { act } from 'react-dom/test-utils'

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});

test("successfull login", async () => {
    const spy = jest.spyOn(AuthApi, 'authenticate')
        .mockResolvedValue({
            data: {
                jwt: 'swodifjmwoie'
            }
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GameContextProvider>
                    <Login></Login>
                </GameContextProvider>
            </SnackBarContextProvider>

        </BrowserRouter>
    )

    const emailField = screen.getByTestId("username");
    const passwordField = screen.getByTestId("password");
    const loginButton = screen.getByText('Iniciar').parentNode

    // fill out and submit form
    userEvent.type(emailField, "test@mail.com");
    userEvent.type(passwordField, "112343asdc");


    fireEvent.click(loginButton);

    expect(spy).toHaveBeenCalledTimes(1)

})

test("atras button ", () => {

    const component = render(
        <BrowserRouter>
            <Login></Login>
        </BrowserRouter>
    )

    const backButton = component.getByText('Atrás').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/');

})

test("test to register", () => {

    const component = render(
        <BrowserRouter>
            <Login></Login>
        </BrowserRouter>
    )

    const backButton = component.getByText('¿Aún no estás registrado?').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/register');

})

test("test to forgot password", async () => {

    const component = render(
        <BrowserRouter>
            <Login></Login>
        </BrowserRouter>
    )

    const emailField = screen.getByTestId("content-input");


    fireEvent.change(emailField, { target: { value: 'hola' } })

    const backButton = component.getByText('¿Olvidaste tu contraseña?').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/forgot-password');

})