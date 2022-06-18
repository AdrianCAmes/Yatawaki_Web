import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserApi from "../../apis/user-apis";
import UserUnlockableApi from "../../apis/user-unlockable-apis";
import { SnackBarContextProvider } from "../../context/snack-bar-context";
import Perfil from "../../pages/Perfil";
import { ThemeProvider } from '@mui/system';
import theme from '../../themes/Theme'


test("test render", async () => {

    const spy = jest.spyOn(UserApi, 'getUserProfileById')
        .mockResolvedValue({
            data: {
                "firstname": "Adrian",
                "lastname": "Ames",
                "mail": "adrianames@gmail.com",
                "nickname": "Doppelganger",
                "coinsOwned": 3541,
                "avatar": {
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
                },
                "userRank": {
                    "idUserRank": 1,
                    "user": {
                        "idUser": 1,
                        "userStatistics": {
                            "idUserStatistics": 1,
                            "triviasPlayed": 0,
                            "triviasWon": 0,
                            "concertsOrchestrated": 1,
                            "orchestrationAccuracy": 234,
                            "status": 1
                        },
                        "nickname": "Doppelganger",
                        "password": "$2a$10$VgvOOUG6SkXHiYJNETHEpuK.RhWM0bFi4KK9gvmQjyW9jXnJO94Hq",
                        "firstname": "Adrian",
                        "lastname": "Ames",
                        "mail": "adrianames@gmail.com",
                        "birthDate": "2003-12-05",
                        "coinsOwned": 3541,
                        "status": 1,
                        "role": "ADMIN",
                        "showTutorials": false
                    },
                    "rank": {
                        "idRank": 1,
                        "name": "Principiante I",
                        "level": 1,
                        "maxExperience": 2000,
                        "status": 1
                    },
                    "startDate": "2022-05-22",
                    "endDate": null,
                    "currentExperience": 324,
                    "status": 1
                }
            }
        })

    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserUnlockable')
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
                <Perfil></Perfil>
            </ThemeProvider>
        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalled();  // Success!
    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;
    
})

test("Atrás button", async () => {

    const spy = jest.spyOn(UserApi, 'getUserProfileById')
        .mockResolvedValue({
            data: {
                "firstname": "Adrian",
                "lastname": "Ames",
                "mail": "adrianames@gmail.com",
                "nickname": "Doppelganger",
                "coinsOwned": 3541,
                "avatar": {
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
                },
                "userRank": {
                    "idUserRank": 1,
                    "user": {
                        "idUser": 1,
                        "userStatistics": {
                            "idUserStatistics": 1,
                            "triviasPlayed": 0,
                            "triviasWon": 0,
                            "concertsOrchestrated": 1,
                            "orchestrationAccuracy": 234,
                            "status": 1
                        },
                        "nickname": "Doppelganger",
                        "password": "$2a$10$VgvOOUG6SkXHiYJNETHEpuK.RhWM0bFi4KK9gvmQjyW9jXnJO94Hq",
                        "firstname": "Adrian",
                        "lastname": "Ames",
                        "mail": "adrianames@gmail.com",
                        "birthDate": "2003-12-05",
                        "coinsOwned": 3541,
                        "status": 1,
                        "role": "ADMIN",
                        "showTutorials": false
                    },
                    "rank": {
                        "idRank": 1,
                        "name": "Principiante I",
                        "level": 1,
                        "maxExperience": 2000,
                        "status": 1
                    },
                    "startDate": "2022-05-22",
                    "endDate": null,
                    "currentExperience": 324,
                    "status": 1
                }
            }
        })

    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserUnlockable')
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
                <Perfil></Perfil>
            </ThemeProvider>
        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalled();  // Success!
    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;
    

    const boton = component.getByText('Atrás').parentNode;

    fireEvent.click(boton);


    expect(window.location.pathname).toEqual('/menu');

})

test("Tienda button", async () => {

    const spy = jest.spyOn(UserApi, 'getUserProfileById')
        .mockResolvedValue({
            data: {
                "firstname": "Adrian",
                "lastname": "Ames",
                "mail": "adrianames@gmail.com",
                "nickname": "Doppelganger",
                "coinsOwned": 3541,
                "avatar": {
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
                },
                "userRank": {
                    "idUserRank": 1,
                    "user": {
                        "idUser": 1,
                        "userStatistics": {
                            "idUserStatistics": 1,
                            "triviasPlayed": 0,
                            "triviasWon": 0,
                            "concertsOrchestrated": 1,
                            "orchestrationAccuracy": 234,
                            "status": 1
                        },
                        "nickname": "Doppelganger",
                        "password": "$2a$10$VgvOOUG6SkXHiYJNETHEpuK.RhWM0bFi4KK9gvmQjyW9jXnJO94Hq",
                        "firstname": "Adrian",
                        "lastname": "Ames",
                        "mail": "adrianames@gmail.com",
                        "birthDate": "2003-12-05",
                        "coinsOwned": 3541,
                        "status": 1,
                        "role": "ADMIN",
                        "showTutorials": false
                    },
                    "rank": {
                        "idRank": 1,
                        "name": "Principiante I",
                        "level": 1,
                        "maxExperience": 2000,
                        "status": 1
                    },
                    "startDate": "2022-05-22",
                    "endDate": null,
                    "currentExperience": 324,
                    "status": 1
                }
            }
        })

    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserUnlockable')
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
                <Perfil></Perfil>
            </ThemeProvider>
        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalled();  // Success!
    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;
    

    const boton = component.getByText('Ir a Tienda').parentNode;

    fireEvent.click(boton);


    expect(window.location.pathname).toEqual('/market');

})

test("Editar button", async () => {

    const spy = jest.spyOn(UserApi, 'getUserProfileById')
        .mockResolvedValue({
            data: {
                "firstname": "Adrian",
                "lastname": "Ames",
                "mail": "adrianames@gmail.com",
                "nickname": "Doppelganger",
                "coinsOwned": 3541,
                "avatar": {
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
                },
                "userRank": {
                    "idUserRank": 1,
                    "user": {
                        "idUser": 1,
                        "userStatistics": {
                            "idUserStatistics": 1,
                            "triviasPlayed": 0,
                            "triviasWon": 0,
                            "concertsOrchestrated": 1,
                            "orchestrationAccuracy": 234,
                            "status": 1
                        },
                        "nickname": "Doppelganger",
                        "password": "$2a$10$VgvOOUG6SkXHiYJNETHEpuK.RhWM0bFi4KK9gvmQjyW9jXnJO94Hq",
                        "firstname": "Adrian",
                        "lastname": "Ames",
                        "mail": "adrianames@gmail.com",
                        "birthDate": "2003-12-05",
                        "coinsOwned": 3541,
                        "status": 1,
                        "role": "ADMIN",
                        "showTutorials": false
                    },
                    "rank": {
                        "idRank": 1,
                        "name": "Principiante I",
                        "level": 1,
                        "maxExperience": 2000,
                        "status": 1
                    },
                    "startDate": "2022-05-22",
                    "endDate": null,
                    "currentExperience": 324,
                    "status": 1
                }
            }
        })

    const spy2 = jest.spyOn(UserUnlockableApi, 'findUserUnlockable')
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
                <Perfil></Perfil>
            </ThemeProvider>
        </BrowserRouter>
    )

    expect(spy).toHaveBeenCalled();  // Success!
    expect(spy2).toHaveBeenCalled();  // Success!
    const promise = spy.mock.results[0].value;  // <= get the Promise returned by closeModal

    await promise;
    

    
    const boton = component.getByText('Editar').parentNode;

    fireEvent.click(boton);

    const boton2 = component.getByText('Aceptar').parentNode;
    fireEvent.click(boton2);

})