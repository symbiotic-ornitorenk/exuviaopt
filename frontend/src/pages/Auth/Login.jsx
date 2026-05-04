import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice.js";

const Login = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Dispatch'i hazırla

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', credentials);

            // Redux'a hem token'ı hem de kullanıcı adını gönderiyoruz
            dispatch(loginSuccess({
                access: res.data.access,
                username: credentials.username // Giriş yaparken kullandığın kullanıcı adı
            }));

            localStorage.setItem('refresh', res.data.refresh);
            navigate('/');
        } catch (err) {
            alert("Giriş başarısız!");
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow">
                    <h3 className="text-center mb-4">Giriş Yap</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Kullanıcı Adı</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Şifre</label>
                            <input type="password" className="form-control"
                                   onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Giriş</button>
                    </form>
                    <p className="mt-3 text-center">Hesabın yok mu? <Link to="/register">Kayıt Ol</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;