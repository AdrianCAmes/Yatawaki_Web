import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GameResults from '../../../pages/components/GameResults'

test('render AppBarYatawaki', () => {
    const results = {
        symphonyName: 'Symphony N.09',
        points: 100,
        accuracyRate: 1.23,
        gainedCoins: 230,
        gainedExperience: 300,
    }

    const component = render(
        <BrowserRouter>
            <GameResults results={results}></GameResults>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(results.symphonyName)
    expect(component.container).toHaveTextContent(results.points)
    expect(component.container).toHaveTextContent(`${Math.round(results.accuracyRate, 2)}`)
    expect(component.container).toHaveTextContent(results.gainedCoins)
    expect(component.container).toHaveTextContent(results.gainedExperience)

})
