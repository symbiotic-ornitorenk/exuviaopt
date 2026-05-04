import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard';
import DigimonList from "./pages/Digimons/DigimonList.jsx";

// 1. Korumalı Rota Bileşeni
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// 2. Navbar Kontrolü ve Layout
const AppContent = () => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Login ve Register sayfalarında Navbar'ı gizle
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!isAuthPage && isAuthenticated && <Navbar />}
            <main className={!isAuthPage ? "container-fluid" : ""}>
                <Routes>
                    {/* Herkese Açık */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Korumalı Rotalar */}
                    <Route path="/" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/digimons" element={
                        <PrivateRoute>
                            <DigimonList />
                        </PrivateRoute>
                    } />

                    {/* Yanlış URL girilirse ana sayfaya at */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;