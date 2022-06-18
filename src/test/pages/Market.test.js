import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserUnlockableApi from "../../apis/user-unlockable-apis";
import Market from "../../pages/Market";
import InstrumentCard from "../../pages/components/InstrumentCard"
import Perfil from "../../pages/Perfil"
import { ThemeProvider } from '@mui/system';
import theme from '../../themes/Theme'
import { async } from "@firebase/util";

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});



test("test render", async () => {

    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserMarket')
        .mockResolvedValue({
            data: {
                "achievements": [
                    {
                        "idUnlockable": 7,
                        "name": "Compositor experimentado",
                        "description": "Has dirigido 200 conciertos",
                        "rareness": "Platinum",
                        "unlockerType": "Concerts",
                        "unlockerValue": 200,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 10,
                        "name": "Primeros pasos",
                        "description": "Has dirigido tu primera sinfonía",
                        "rareness": "Wood",
                        "unlockerType": "Concerts",
                        "unlockerValue": 1,
                        "coinsCost": 0,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 9,
                        "name": "Habilidades motrices",
                        "description": "Completaste un concierto con 86% de precisión",
                        "rareness": "Gold",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 86,
                        "coinsCost": 15,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 13,
                        "name": "Próxima generacion",
                        "description": "Completaste un concierto con 70% de precisión",
                        "rareness": "Silver",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 70,
                        "coinsCost": 10,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    }
                ],
                "symphonies": [
                    {
                        "idUnlockable": 1,
                        "name": "Nocturne Op 9 No 2",
                        "description": "Pieza clásica con un tono melancólico y jovial, caracterizada por poseer arreglos de piano únicos que encantan al oyente de manera inmediata",
                        "rareness": "Wood",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/nocturne_op9_no_2.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 1,
                            "name": "Frédéric Chopin",
                            "birthDate": "1810-03-01",
                            "deathDate": "1849-10-17",
                            "status": 1
                        },
                        "year": 1831,
                        "duration": 270,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Preview/Nocturne_op9_No2_chopin.mp3",
                        "initialBpm": 122
                    },
                    {
                        "idUnlockable": 6,
                        "name": "String Quartet No 17",
                        "description": "Galopante y jovial pieza musical, siéntete un experto director de orquesta con esta alegre sinfonía de Amadeus Mozart",
                        "rareness": "Gold",
                        "unlockerType": "Rank",
                        "unlockerValue": 6,
                        "coinsCost": 4,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/string_quartet_no_17.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 3,
                            "name": "Amadeus Mozart",
                            "birthDate": "1756-01-27",
                            "deathDate": "1791-12-05",
                            "status": 1
                        },
                        "year": 1788,
                        "duration": 249,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/String_Quartet_No_17/Preview/string_quartet_no_17.mp3",
                        "initialBpm": 116
                    }
                ],
                "avatars": [
                    {
                        "idUnlockable": 15,
                        "name": "Avatar de Amadeus Mozart",
                        "description": "Mozart Avatar",
                        "rareness": "Bronze",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Avatars/mozart.png",
                        "status": 1,
                        "enhancedFeaturesJson": "{\\\"Points\\\": 2, \\\"Accuracy\\\": 1}"
                    }
                ]
            }
        })

    const component = render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Market></Market>
            </ThemeProvider>
        </BrowserRouter>
    )
    

    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy2.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;

})


test('click to perfil', async () => {
    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserMarket')
        .mockResolvedValue({
            data: {
                "achievements": [
                    {
                        "idUnlockable": 7,
                        "name": "Compositor experimentado",
                        "description": "Has dirigido 200 conciertos",
                        "rareness": "Platinum",
                        "unlockerType": "Concerts",
                        "unlockerValue": 200,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 10,
                        "name": "Primeros pasos",
                        "description": "Has dirigido tu primera sinfonía",
                        "rareness": "Wood",
                        "unlockerType": "Concerts",
                        "unlockerValue": 1,
                        "coinsCost": 0,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 9,
                        "name": "Habilidades motrices",
                        "description": "Completaste un concierto con 86% de precisión",
                        "rareness": "Gold",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 86,
                        "coinsCost": 15,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 13,
                        "name": "Próxima generacion",
                        "description": "Completaste un concierto con 70% de precisión",
                        "rareness": "Silver",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 70,
                        "coinsCost": 10,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    }
                ],
                "symphonies": [
                    {
                        "idUnlockable": 1,
                        "name": "Nocturne Op 9 No 2",
                        "description": "Pieza clásica con un tono melancólico y jovial, caracterizada por poseer arreglos de piano únicos que encantan al oyente de manera inmediata",
                        "rareness": "Wood",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/nocturne_op9_no_2.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 1,
                            "name": "Frédéric Chopin",
                            "birthDate": "1810-03-01",
                            "deathDate": "1849-10-17",
                            "status": 1
                        },
                        "year": 1831,
                        "duration": 270,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Preview/Nocturne_op9_No2_chopin.mp3",
                        "initialBpm": 122
                    },
                    {
                        "idUnlockable": 6,
                        "name": "String Quartet No 17",
                        "description": "Galopante y jovial pieza musical, siéntete un experto director de orquesta con esta alegre sinfonía de Amadeus Mozart",
                        "rareness": "Gold",
                        "unlockerType": "Rank",
                        "unlockerValue": 6,
                        "coinsCost": 4,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/string_quartet_no_17.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 3,
                            "name": "Amadeus Mozart",
                            "birthDate": "1756-01-27",
                            "deathDate": "1791-12-05",
                            "status": 1
                        },
                        "year": 1788,
                        "duration": 249,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/String_Quartet_No_17/Preview/string_quartet_no_17.mp3",
                        "initialBpm": 116
                    }
                ],
                "avatars": [
                    {
                        "idUnlockable": 15,
                        "name": "Avatar de Amadeus Mozart",
                        "description": "Mozart Avatar",
                        "rareness": "Bronze",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Avatars/mozart.png",
                        "status": 1,
                        "enhancedFeaturesJson": "{\\\"Points\\\": 2, \\\"Accuracy\\\": 1}"
                    }
                ]
            }
        })

    const component = render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Market></Market>
            </ThemeProvider>
        </BrowserRouter>
    )
    

    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy2.mock.results[0].value;  // <= get the Promise returned by closeModal
    await promise;

    const backButton = component.getByText('Atrás').parentNode
    fireEvent.click(backButton);

    expect(window.location.pathname).toEqual('/perfil');

    component.getByText('Has dirigido 200 conciertos');

})

test('click on trade', async () => {
    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserMarket')
        .mockResolvedValue({
            data: {
                "achievements": [
                    {
                        "idUnlockable": 7,
                        "name": "Compositor experimentado",
                        "description": "Has dirigido 200 conciertos",
                        "rareness": "Platinum",
                        "unlockerType": "Concerts",
                        "unlockerValue": 200,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 10,
                        "name": "Primeros pasos",
                        "description": "Has dirigido tu primera sinfonía",
                        "rareness": "Wood",
                        "unlockerType": "Concerts",
                        "unlockerValue": 1,
                        "coinsCost": 0,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 9,
                        "name": "Habilidades motrices",
                        "description": "Completaste un concierto con 86% de precisión",
                        "rareness": "Gold",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 86,
                        "coinsCost": 15,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    },
                    {
                        "idUnlockable": 13,
                        "name": "Próxima generacion",
                        "description": "Completaste un concierto con 70% de precisión",
                        "rareness": "Silver",
                        "unlockerType": "Accuracy",
                        "unlockerValue": 70,
                        "coinsCost": 10,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Achievements/generic_trophy.png",
                        "status": 1
                    }
                ],
                "symphonies": [
                    {
                        "idUnlockable": 1,
                        "name": "Nocturne Op 9 No 2",
                        "description": "Pieza clásica con un tono melancólico y jovial, caracterizada por poseer arreglos de piano únicos que encantan al oyente de manera inmediata",
                        "rareness": "Wood",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/nocturne_op9_no_2.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 1,
                            "name": "Frédéric Chopin",
                            "birthDate": "1810-03-01",
                            "deathDate": "1849-10-17",
                            "status": 1
                        },
                        "year": 1831,
                        "duration": 270,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/Nocturne_Op9_No_2/Preview/Nocturne_op9_No2_chopin.mp3",
                        "initialBpm": 122
                    },
                    {
                        "idUnlockable": 6,
                        "name": "String Quartet No 17",
                        "description": "Galopante y jovial pieza musical, siéntete un experto director de orquesta con esta alegre sinfonía de Amadeus Mozart",
                        "rareness": "Gold",
                        "unlockerType": "Rank",
                        "unlockerValue": 6,
                        "coinsCost": 4,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Symphonies/string_quartet_no_17.jpg",
                        "status": 1,
                        "composer": {
                            "idComposer": 3,
                            "name": "Amadeus Mozart",
                            "birthDate": "1756-01-27",
                            "deathDate": "1791-12-05",
                            "status": 1
                        },
                        "year": 1788,
                        "duration": 249,
                        "type": "Sonata",
                        "previewTrack": "https://adriancames.github.io/Yatawaki_Files/Tracks/String_Quartet_No_17/Preview/string_quartet_no_17.mp3",
                        "initialBpm": 116
                    }
                ],
                "avatars": [
                    {
                        "idUnlockable": 15,
                        "name": "Avatar de Amadeus Mozart",
                        "description": "Mozart Avatar",
                        "rareness": "Bronze",
                        "unlockerType": "Rank",
                        "unlockerValue": 1,
                        "coinsCost": null,
                        "icon": "https://adriancames.github.io/Yatawaki_Files/Images/Avatars/mozart.png",
                        "status": 1,
                        "enhancedFeaturesJson": "{\\\"Points\\\": 2, \\\"Accuracy\\\": 1}"
                    }
                ]
            }
        })

    const component = render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Market></Market>
            </ThemeProvider>
        </BrowserRouter>
    )
    

    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy2.mock.results[0].value;  // <= get the Promise returned by closeModal
    await promise;


    const tradeButton = component.getByText("10");
    fireEvent.click(tradeButton);

    component.getByText("¿Estás seguro que deseas canjear el siguiente objeto?");

})

test('click on trade data empty', async () => {
    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserMarket')
        .mockResolvedValue({
            data: {
                "achievements": [

                ],
                "symphonies": [
                ],
                "avatars": [
                ]
            }});



    const component = render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Market></Market>
            </ThemeProvider>
        </BrowserRouter>
    )
    

    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy2.mock.results[0].value;  // <= get the Promise returned by closeModal
    await promise;

    component.getByText("No hay logros disponibles");

    const symphonyButton = component.getByText("SINFONIAS");
    fireEvent.click(symphonyButton);
    component.getByText("No hay sinfonias disponibles");

    const avatarButton = component.getByText("AVATARS");
    fireEvent.click(avatarButton);
    component.getByText("No hay avatars disponibles");


})