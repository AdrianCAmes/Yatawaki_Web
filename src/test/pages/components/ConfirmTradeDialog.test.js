import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ConfirmTradeDialog from '../../../pages/components/ConfirmTradeDialog'
import UserUnlockableApi from '../../../apis/user-unlockable-apis'
import { SnackBarContextProvider } from '../../../context/snack-bar-context'

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});

test('test trade', async () => {

    const spy = jest.spyOn(UserUnlockableApi, 'trade')
        .mockResolvedValue({
            status: 200
        })

    const unlockable = {
        description: 'Esta es la prueba de descripcion',
        name: 'Esta es la prueba de name'
    }

    const component = render(
        <BrowserRouter>
            <SnackBarContextProvider>
                <ConfirmTradeDialog open={true} unlockable={unlockable} handleClose={() => { }}></ConfirmTradeDialog>

            </SnackBarContextProvider>
        </BrowserRouter>
    )

    const aceptarButton = component.getByText('Aceptar').parentNode

    fireEvent.click(aceptarButton)

})
