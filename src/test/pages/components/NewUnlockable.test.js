import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NewUnlockable from '../../../pages/components/NewUnlockable'

test('render New Unlockable', () => {
    const unlockable = {
        name: 'Esta es la prueba del nombre'
    }

    const component = render(
        <BrowserRouter>
            <NewUnlockable unlockable={unlockable}></NewUnlockable>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(unlockable.name)

})
