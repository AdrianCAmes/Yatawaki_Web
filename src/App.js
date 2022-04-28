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
import Prueba from './pages/Prueba';
import { AudioContextProvider } from './context/audio-context-controller';
import Timer from './pages/Timer';
import Game2 from './pages/Game2';
import { PoseContextProvider } from './context/pose-controller';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarContextProvider>
        <GameContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Splashscreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<YatawakiMenu />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/game" element={<AudioContextProvider><PoseContextProvider><Game /></PoseContextProvider></AudioContextProvider>} />
              <Route path="/game-resume" element={<GameResume />} />
              <Route path="/market" element={<Market />} />
              <Route path="/prueba" element={<Prueba />} />
              <Route path="/timer-prueba" element={<Timer />} />

            </Routes>
          </BrowserRouter>

        </GameContextProvider>
      </SnackBarContextProvider>
    </ThemeProvider>
  );
}

export default App;
