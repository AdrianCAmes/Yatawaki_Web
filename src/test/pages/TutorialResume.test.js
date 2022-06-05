import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TutorialResume from '../../pages/TutorialResume'


test('clicking next step', () => {

    const component = render(
        <BrowserRouter>

            <TutorialResume></TutorialResume>
        </BrowserRouter>

    )


    const nextStepButton = component.getByTestId('nextStepButton')
    fireEvent.click(nextStepButton)


    component.getByText('En la parte derecha de la pantalla podrás observar tus resultados obtenidos')

})