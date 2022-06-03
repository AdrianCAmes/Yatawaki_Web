import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AchievementCard, AvatarCard, ItemCard, ItemToTradeCard, SymphonyCard } from '../../../pages/components/ObjectCard'

test('render Object Symphony Card', () => {
    const symphony = {
        name: 'Esta es la prueba del nombre',
        description: 'Esta es la prueba de descripcion'
    }

    const component = render(
        <BrowserRouter>
            <SymphonyCard symphony={symphony}></SymphonyCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(symphony.name)
    expect(component.container).toHaveTextContent(symphony.description)

})

test('render Object Avatar Card', () => {
    const avatar = {
        name: 'Esta es la prueba del nombre',
        description: 'Esta es la prueba de descripcion'
    }

    const component = render(
        <BrowserRouter>
            <AvatarCard avatar={avatar}></AvatarCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(avatar.name)
    expect(component.container).toHaveTextContent(avatar.description)

})

test('render Object Achievement Card', () => {
    const achievement = {
        description: 'Esta es la prueba de descripcion'
    }

    const component = render(
        <BrowserRouter>
            <AchievementCard achievement={achievement}></AchievementCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(achievement.description)

})

test('render Object Item Card', () => {
    const item = {
        description: 'Esta es la prueba de descripcion',
        coinsCost: 203
    }

    const component = render(
        <BrowserRouter>
            <ItemCard item={item}></ItemCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(item.description)
    expect(component.container).toHaveTextContent(item.coinsCost)

})

test('render Object Item to Trade Card', () => {
    const item = {
        description: 'Esta es la prueba de descripcion',
        name: 'Esta es la prueba de name'
    }

    const component = render(
        <BrowserRouter>
            <ItemToTradeCard item={item}></ItemToTradeCard>
        </BrowserRouter>
    )

    expect(component.container).toHaveTextContent(item.description)
    expect(component.container).toHaveTextContent(item.name)

})

test('call Item Card', () => {
    const item = {
        description: 'Esta es la prueba de descripcion',
        coinsCost: 203
    }

    const mockHandler = jest.fn()

    const component = render(
        <BrowserRouter>
            <ItemCard item={item} onClickTrade={mockHandler}></ItemCard>
        </BrowserRouter>
    )

    const buttonCoins = component.getByText(item.coinsCost).parentNode
    fireEvent.click(buttonCoins)

    expect(mockHandler.mock.calls).toHaveLength(1)



})