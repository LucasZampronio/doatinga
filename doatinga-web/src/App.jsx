import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalogo from './pages/Catalogo';
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from './pages/Login/LoginPage.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <BrowserRouter>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/cadastro" element={<RegisterPage />} />

          <Route path="/catalogo" element={<Catalogo />} />

          <Route path="*" element={<>404 MEU CHAPA!</>} />

        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;


