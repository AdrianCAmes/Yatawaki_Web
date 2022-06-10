import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import UserApi from "../../apis/user-apis";
import AuthContextProvider from "../../context/auth-context";
import { SnackBarContextProvider } from "../../context/snack-bar-context";
import ResetPassword from '../../pages/ResetPassword';

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
                <ResetPassword></ResetPassword>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )

    const backButton = component.getByText('Atrás').parentNode

    // fill out and submit form
    fireEvent.click(backButton);


    expect(window.location.pathname).toEqual('/login');

})

describe("Testing new password errors", () => {

    test("password no numbers", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <ResetPassword></ResetPassword>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const passwordField = screen.getByTestId("password");

        fireEvent.change(passwordField, { target: { value: 'a' } })

        const registerbutton = component.getByText('Actualizar').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Tu contraseña no tiene numeros')
    });

    test("password no letters", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <ResetPassword></ResetPassword>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const passwordField = screen.getByTestId("password");

        fireEvent.change(passwordField, { target: { value: '1' } })

        const registerbutton = component.getByText('Actualizar').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Tu contraseña no tiene letras')
    });

    test("password no correct lenght", () => {
        const component = render(
            <BrowserRouter>
                <SnackBarContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <ResetPassword></ResetPassword>
                    </GoogleOAuthProvider>
                </SnackBarContextProvider>
            </BrowserRouter>
        )

        const passwordField = screen.getByTestId("password");

        fireEvent.change(passwordField, { target: { value: '1a' } })

        const registerbutton = component.getByText('Actualizar').parentNode

        // fill out and submit form
        fireEvent.click(registerbutton);

        component.getByText('Por favor ingresa mas de 8 caracteres')
    });

});


test("test successful updatePassword", () => {



    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <AuthContextProvider>
                    <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
                        <ResetPassword></ResetPassword>
                    </GoogleOAuthProvider>
                </AuthContextProvider>
            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const passwordField = screen.getByTestId("password");

    fireEvent.change(passwordField, { target: { value: 'abcd1234' } })

    const registerbutton = component.getByText('Actualizar').parentNode

    // fill out and submit form
    fireEvent.click(registerbutton);

});