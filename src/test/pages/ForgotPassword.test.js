import * as React from 'react';
import '@testing-library/jest-dom/extend-expect'
import ForgotPassword from '../../pages/ForgotPassword'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SnackBarContextProvider } from '../../context/snack-bar-context';
import AuthContextProvider, { useAuth } from '../../context/auth-context';
import { GameContextProvider } from '../../context/game-context';

test("render title", () => {
    render(
        <BrowserRouter>
            <ForgotPassword />,
        </BrowserRouter>,

    );
    screen.debug();
    //const titulo = screen.getByText('YATAWAKI');
    const titulo = screen.getByTestId('custom-element')
    expect(titulo).toBeInTheDocument();
})

test("render send button", () => {
    render(
        <BrowserRouter>
            <ForgotPassword />,
        </BrowserRouter>,

    );
    screen.debug();
    const botonEnviar = screen.getByText('Enviar');
    expect(botonEnviar).toBeInTheDocument();
})

test("render back button", () => {
    render(
        <BrowserRouter>
            <ForgotPassword />,
        </BrowserRouter>,

    );
    screen.debug();
    const botonAtras = screen.getByText('Atrás');
    expect(botonAtras).toBeInTheDocument();
})

test("escribir correo", () => {
    render(
        <BrowserRouter>
            <ForgotPassword />,
        </BrowserRouter>,

    );
    screen.debug();
    const input = screen.getByPlaceholderText('Escribe tu email');
    fireEvent.change(input, { target: { value: 'prueba@hotmail.com' } })

    expect(input.value).toEqual('prueba@hotmail.com');

})

test("atras boton", () => {
    render(
        <BrowserRouter>
            <ForgotPassword />,
        </BrowserRouter>,

    );
    screen.debug();
    const backButton = screen.getByText('Atrás').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/login');

})

test("enviar ", async () => {

    render(
        <BrowserRouter>
            <AuthContextProvider>
                <SnackBarContextProvider>
                    <GameContextProvider>
                        <ForgotPassword />
                    </GameContextProvider>

                </SnackBarContextProvider>
            </AuthContextProvider>
        </BrowserRouter>

    );


    const enviarButton = screen.getByText('Enviar').parentNode;
    const input = screen.getByTestId('email');
    fireEvent.change(input, { target: { value: 'jchernandez0312@gmail.com' } })

    fireEvent.click(enviarButton);

})
