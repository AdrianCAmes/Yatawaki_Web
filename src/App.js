import theme from './themes/Theme'
import './App.css';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { SnackBarContextProvider } from './context/snack-bar-context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Splashscreen from './pages/Splashscreen';
import YatawakiMenu from './pages/YatawakiMenu';
import { GameContextProvider } from './context/game-context';
import Perfil from './pages/Perfil';
import Game from './pages/Game';
import GameResume from './pages/GameResume';
import Market from './pages/Market';
import { AudioContextProvider } from './context/audio-context-controller';
import { PoseContextProvider } from './context/pose-controller';
import Tutorial from './pages/Tutorial';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TutorialResume from './pages/TutorialResume';
import AuthContextProvider from './context/auth-context';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarContextProvider>
        <GameContextProvider>
          <AuthContextProvider>

            <GoogleOAuthProvider clientId="501234886159-njo2973km2fh50fqge2r28upd3568b67.apps.googleusercontent.com">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Splashscreen />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/menu" element={<YatawakiMenu />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/game" element={<AudioContextProvider><PoseContextProvider><Game /></PoseContextProvider></AudioContextProvider>} />
                  <Route path="/game-resume" element={<GameResume />} />
                  <Route path="/market" element={<Market />} />
                  <Route path="/tutorial" element={<Tutorial />} />
                  <Route path="/tutorial-resume" element={<TutorialResume />} />

                </Routes>
              </BrowserRouter>
            </GoogleOAuthProvider>
          </AuthContextProvider>



        </GameContextProvider>
      </SnackBarContextProvider>
    </ThemeProvider>
  );
}

export default App;
