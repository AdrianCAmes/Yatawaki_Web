import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../pages/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SnackBarContextProvider } from '../../context/snack-bar-context';
import UserApi from '../../apis/user-apis';

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});

test("test atras button ", () => {

    const component = render(
        <BrowserRouter>
            <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                <Register></Register>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )

    const backButton = component.getByText('Atrás').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/');

})

describe("Testing first step errors", () => {
    test("test invalid email", () => {

        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const emailField = screen.getByTestId("email");
        const nombresField = screen.getByTestId("nombres");
        const apellidosField = screen.getByTestId("apellidos");


        fireEvent.change(emailField, { target: { value: 'hola' } })
        fireEvent.change(nombresField, { target: { value: 'hola' } })
        fireEvent.change(apellidosField, { target: { value: 'hola' } })

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);


        component.getByText('El email es inválido')

    })

    test("test empty fields", () => {

        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);


        component.getByText('Completa todas los campos')

    })
})


test("test inputs first step", () => {

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                    <Register></Register>
                </GoogleOAuthProvider>
            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const emailField = screen.getByTestId("email");
    const nombresField = screen.getByTestId("nombres");
    const apellidosField = screen.getByTestId("apellidos");


    fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
    fireEvent.change(nombresField, { target: { value: 'hola' } })
    fireEvent.change(apellidosField, { target: { value: 'hola' } })

    const backButton = component.getByText('Siguiente').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    component.getByText('Regresar a datos personales')

})

test("test empty inputs second step", () => {

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                    <Register></Register>
                </GoogleOAuthProvider>
            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const emailField = screen.getByTestId("email");
    const nombresField = screen.getByTestId("nombres");
    const apellidosField = screen.getByTestId("apellidos");


    fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
    fireEvent.change(nombresField, { target: { value: 'hola' } })
    fireEvent.change(apellidosField, { target: { value: 'hola' } })

    const backButton = component.getByText('Siguiente').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    const nicknameField = screen.getByTestId("nickname");
    const passwordField = screen.getByTestId("password");

    const registerbutton = component.getByText('Registrarme').parentNode

    // fill out and submit form
    fireEvent.click(registerbutton);

    component.getByText('Completa todas los campos')

})

describe("Testing second step errors", () => {

    test("password no numbers", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const emailField = screen.getByTestId("email");
        const nombresField = screen.getByTestId("nombres");
        const apellidosField = screen.getByTestId("apellidos");


        fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
        fireEvent.change(nombresField, { target: { value: 'hola' } })
        fireEvent.change(apellidosField, { target: { value: 'hola' } })

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);

        const nicknameField = screen.getByTestId("nickname");
        const passwordField = screen.getByTestId("password");

        fireEvent.change(nicknameField, { target: { value: 'nickname' } })
        fireEvent.change(passwordField, { target: { value: 'a' } })

        const registerbutton = component.getByText('Registrarme').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Tu contraseña no tiene numeros')
    });

    test("password no letters", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const emailField = screen.getByTestId("email");
        const nombresField = screen.getByTestId("nombres");
        const apellidosField = screen.getByTestId("apellidos");


        fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
        fireEvent.change(nombresField, { target: { value: 'hola' } })
        fireEvent.change(apellidosField, { target: { value: 'hola' } })

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);

        const nicknameField = screen.getByTestId("nickname");
        const passwordField = screen.getByTestId("password");

        fireEvent.change(nicknameField, { target: { value: 'nickname' } })
        fireEvent.change(passwordField, { target: { value: '1' } })

        const registerbutton = component.getByText('Registrarme').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Tu contraseña no tiene letras')
    });

    test("password no correct length", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const emailField = screen.getByTestId("email");
        const nombresField = screen.getByTestId("nombres");
        const apellidosField = screen.getByTestId("apellidos");


        fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
        fireEvent.change(nombresField, { target: { value: 'hola' } })
        fireEvent.change(apellidosField, { target: { value: 'hola' } })

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);

        const nicknameField = screen.getByTestId("nickname");
        const passwordField = screen.getByTestId("password");

        fireEvent.change(nicknameField, { target: { value: 'nickname' } })
        fireEvent.change(passwordField, { target: { value: '1a' } })

        const registerbutton = component.getByText('Registrarme').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Por favor ingresa mas de 8 caracteres')
    });

    test("terminos y condiciones not checked", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <Register></Register>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const emailField = screen.getByTestId("email");
        const nombresField = screen.getByTestId("nombres");
        const apellidosField = screen.getByTestId("apellidos");


        fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
        fireEvent.change(nombresField, { target: { value: 'hola' } })
        fireEvent.change(apellidosField, { target: { value: 'hola' } })

        const backButton = component.getByText('Siguiente').parentNode

        // fill out and submit form
        fireEvent.click(backButton);

        const nicknameField = screen.getByTestId("nickname");
        const passwordField = screen.getByTestId("password");

        fireEvent.change(nicknameField, { target: { value: 'nickname' } })
        fireEvent.change(passwordField, { target: { value: '1aasdad123' } })

        const registerbutton = component.getByText('Registrarme').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Por favor acepte los términos y condiciones')
    });
});

test("test terminos y condiciones opened", () => {
    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                    <Register></Register>
                </GoogleOAuthProvider>
            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const emailField = screen.getByTestId("email");
    const nombresField = screen.getByTestId("nombres");
    const apellidosField = screen.getByTestId("apellidos");


    fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
    fireEvent.change(nombresField, { target: { value: 'hola' } })
    fireEvent.change(apellidosField, { target: { value: 'hola' } })

    const backButton = component.getByText('Siguiente').parentNode

    // fill out and submit form
    fireEvent.click(backButton);

    const openTerminos = component.getByText('Ver aquí')

    // fill out and submit form
    fireEvent.click(openTerminos);

});



test("test register", () => {

    const spy = jest.spyOn(UserApi, 'register')
        .mockResolvedValue({
            data: 'Success'
        })

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                    <Register></Register>
                </GoogleOAuthProvider>
            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const emailField = screen.getByTestId("email");
    const nombresField = screen.getByTestId("nombres");
    const apellidosField = screen.getByTestId("apellidos");


    fireEvent.change(emailField, { target: { value: 'hola@email.com' } })
    fireEvent.change(nombresField, { target: { value: 'hola' } })
    fireEvent.change(apellidosField, { target: { value: 'hola' } })

    const nextStepButton = component.getByText('Siguiente').parentNode

    // fill out and submit form
    fireEvent.click(nextStepButton);

    const nicknameField = screen.getByTestId("nickname");
    const passwordField = screen.getByTestId("password");
    const terminosField = screen.getByTestId("terminos");

    fireEvent.change(nicknameField, { target: { value: 'nickname' } })
    fireEvent.change(passwordField, { target: { value: '1aasdad123' } })
    fireEvent.click(terminosField)

    const registerbutton = component.getByText('Registrarme').parentNode

    // fill out and submit form
    fireEvent.click(registerbutton);

    //component.getByText('Registrado correctamente')
});