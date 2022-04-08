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
import Modelo from './pages/Modelo';

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
              <Route path="/modelo" element={<Modelo />} />

            </Routes>
          </BrowserRouter>

        </GameContextProvider>
      </SnackBarContextProvider>
    </ThemeProvider>
  );
}

export default App;
