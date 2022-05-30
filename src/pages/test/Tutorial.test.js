import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Tutorial from '../Tutorial'


test('clicking next step', () => {

    const component = render(
        <BrowserRouter>

            <Tutorial></Tutorial>
        </BrowserRouter>

    )


    const nextStepButton = component.getByTestId('nextStepButton')
    fireEvent.click(nextStepButton)


    component.getByText('En la sección inferior podrás visualizar el video tomado en tiempo real, el cual mediante nuestra inteligencia artificial reconocerá tus gestos y aplicará distintos efectos de sonido a la sinfonía')

})