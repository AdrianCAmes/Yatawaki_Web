import * as React from 'react';
import { useState } from "react";
import '@testing-library/jest-dom/extend-expect'
import GameContext from '../../context/game-context';
import {  fireEvent, getByText, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { exp } from '@tensorflow/tfjs';

test("user set",()=>{
    const [userId,setUserId] = useState(0);

    const updateUserId = (userIdRequest) => {
        setUserId(userIdRequest);
    };

   updateUserId(1);

   expect(userId).toEqual(1);


})