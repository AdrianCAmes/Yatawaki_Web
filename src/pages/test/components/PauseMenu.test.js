import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PauseMenu from '../../components/PauseMenu'

test('test Pause Calls', () => {

    const mockHandler = jest.fn()

    const component = render(
        <BrowserRouter>
            <PauseMenu open={true} resume={mockHandler} exit={mockHandler}></PauseMenu>
        </BrowserRouter>
    )

    const buttonResume = component.getByText('Continuar')
    fireEvent.click(buttonResume)

    expect(mockHandler.mock.calls).toHaveLength(1)

    const buttonExit = component.getByText('Salir')
    fireEvent.click(buttonExit)

    expect(mockHandler.mock.calls).toHaveLength(2)

})
