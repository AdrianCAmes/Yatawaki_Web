import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AppBarYatawaki from '../../components/AppBarYatawaki'

test('render GameResults', () => {
    const resume = {
        level: 12,
        currentExperience: 100,
        coinsOwned: 120
    }

    const component = render(
        <BrowserRouter>
            <AppBarYatawaki resume={resume}></AppBarYatawaki>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(resume.level)
    expect(component.container).toHaveTextContent(resume.currentExperience)
    expect(component.container).toHaveTextContent(resume.coinsOwned)


})
