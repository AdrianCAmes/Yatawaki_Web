import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import InstrumentCard from '../../components/InstrumentCard'

test('render Instrument Card', () => {
    const instrument = {
        shortDescription: 'Esta es la prueba del texto de la sinfonia'
    }

    const component = render(
        <BrowserRouter>
            <InstrumentCard instrument={instrument}></InstrumentCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(instrument.shortDescription)


})
