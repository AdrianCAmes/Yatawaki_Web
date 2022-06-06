import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserApi from "../../apis/user-apis";
import UserUnlockableApi from "../../apis/user-unlockable-apis";
import { SnackBarContextProvider } from "../../context/snack-bar-context";
import YatawakiMenu from "../../pages/YatawakiMenu";
import { ThemeProvider } from '@mui/system';
import theme from '../../themes/Theme'

jest.mock("axios", () => {
    return {
        create: jest.fn(() => ({
            interceptors: {
                response: { use: jest.fn(), eject: jest.fn() }
            },
        }))
    }
});

test("render ", async () => {
    const spy = jest.spyOn(UserApi, 'resume')
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

        const component = render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <YatawakiMenu/>
                </ThemeProvider>
            </BrowserRouter>
        )
    
        expect(spy).toHaveBeenCalled(); 

})
test("slide", async () => {
    const spy = jest.spyOn(UserApi, 'resume')
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

        const component = render(
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <YatawakiMenu/>
                </ThemeProvider>
            </BrowserRouter>
        )
        component.debug()
        //const slide = component.getByTestId('slide');
        //fireEvent.click(slide);

})


