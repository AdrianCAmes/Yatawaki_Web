
// import React from 'react'
// import '@testing-library/jest-dom/extend-expect'
// import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// import { BrowserRouter } from 'react-router-dom'
// import axiosMock from 'axios'
// import Login from '../Login'
// import AuthApi from '../../apis/auth-apis'
// import userEvent from '@testing-library/user-event'
// import bindErrorInterceptor from '../../config/bind-error-interceptor'

// jest.mock("axios", () => {
//     return {
//         create: jest.fn(() => ({
//           post: jest.fn().mockReturnValue({ jwd: 'sdgsgsojkgn' }),
//           interceptors: {
//             response: { use: jest.fn(), eject: jest.fn() }
//           }
//         }))
//       }
// });



// test("successfull login", async () => {
//     jest.spyOn(window, 'fetch')
//         .mockResolvedValue({
//             json: () => ({ jwt: 'swodifjmwoie' })
//         })

//     const component = render(
//         <BrowserRouter>
//             <Login></Login>
//         </BrowserRouter>
//     )

//     const emailField = screen.getByTestId("username");
//     const passwordField = screen.getByTestId("password");
//     const loginButton = component.getByText('Iniciar').parentNode

//     // fill out and submit form
//     userEvent.type(emailField, "test@mail.com");
//     userEvent.type(passwordField, "112343asdc");
//     fireEvent.click(loginButton);


//     await waitFor(() => {

//     });
// })

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'
import userEvent from '@testing-library/user-event'





test("successfull login", async () => {

    const component = render(
        <BrowserRouter>
            <Login></Login>
        </BrowserRouter>
    )

    const emailField = component.getByTestId("username");
    const passwordField = screen.getByTestId("password");
    const loginButton = component.getByText('Iniciar').parentNode

    // fill out and submit form
    userEvent.type(emailField, "test@mail.com");
    userEvent.type(passwordField, "112343asdc");
    fireEvent.click(loginButton);

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