import theme from './themes/Theme'
import './App.css';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { SnackBarContextProvider } from './context/snack-bar-context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Splashscreen from './pages/Splashscreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Splashscreen/>} />
        <Route path="/register" element={<Register/>} />

        </Routes>
      </BrowserRouter>


      </SnackBarContextProvider>
    </ThemeProvider>
  );
}

export default App;
