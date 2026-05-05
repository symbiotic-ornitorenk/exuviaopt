import { Link, useNavigate, useLocation } from 'react-router-dom'; // 🪝 useLocation eklendi
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { setSearchTerm } from '../store/digimonSlice';

function Navbar() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { searchTerm } = useSelector((state) => state.digimons || { searchTerm: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // 📍 Mevcut konumu alıyoruz

    // 🔍 Sadece Digimons sayfasında mıyız kontrolü
    const isDigimonsPage = location.pathname === '/digimons';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        // 🚀 Artık navigate kontrolüne gerek yok çünkü bar sadece o sayfada çıkacak
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid flex-nowrap">
                {/* 1. SOL: Logo */}
                <Link className="navbar-brand d-flex align-items-center me-2" to="/">
                    <img
                        src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="me-2"
                    />
                    <span className="d-none d-lg-inline fw-bold">ExuviaOPT</span>
                </Link>

                {/* Menü Linkleri */}
                <div className="navbar-nav d-none d-lg-flex me-auto">
                    <Link className="nav-link" to="/digimons">Digimons</Link>
                    <Link className="nav-link" to="/">Accessories</Link>
                    <Link className="nav-link" to="/">Seals</Link>
                    <Link className="nav-link" to="/">Union</Link>
                    <Link className="nav-link" to="/">Tools</Link>
                </div>

                {/* 2. ORTA: Koşullu Arama Çubuğu 🎭 */}
                {isDigimonsPage && (
                    <div className="d-flex mx-auto col-5 col-md-4">
                        <div className="input-group">
                            <input
                                className="form-control form-control-sm bg-secondary text-white border-0 shadow-none"
                                type="search"
                                placeholder="Ara..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <span className="input-group-text bg-secondary border-0 text-white-50">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                )}

                {/* 3. SAĞ: Kullanıcı Paneli */}
                <div className={`d-flex align-items-center ${isDigimonsPage ? 'ms-auto' : 'ms-auto'}`}>
                    {isAuthenticated ? (
                        <div className="dropdown">
                            <button
                                className="btn btn-sm btn-outline-light dropdown-toggle border-0 d-flex align-items-center gap-2"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                     style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}>
                                    {user ? user.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <span className="d-none d-md-inline">{user || 'User'}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow">
                                <li>
                                    <div className="dropdown-header">Hoş geldin, {user}</div>
                                </li>
                                <li><Link className="dropdown-item" to="/profile">Profilim</Link></li>
                                <li><Link className="dropdown-item" to="/settings">Ayarlar</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                                        Çıkış Yap
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link className="btn btn-sm btn-primary px-3 fw-bold" to="/login">Giriş Yap</Link>
                    )}

                    <button
                        className="navbar-toggler p-1 border-0 ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon" style={{width: '1.2rem', height: '1.2rem'}}></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;