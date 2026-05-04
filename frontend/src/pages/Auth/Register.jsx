import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basit bir şifre doğrulama kontrolü
        if (formData.password !== formData.confirmPassword) {
            alert("Şifreler eşleşmiyor!");
            return;
        }

        try {
            // Backend'deki accounts/urls.py yapısına göre endpoint'i güncelledik
            await axios.post('http://127.0.0.1:8000/api/auth/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Kayıt sırasında bir hata oluştu. Kullanıcı adı alınmış olabilir.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 card p-4 shadow">
                    <h3 className="text-center mb-4">Yeni Hesap Oluştur</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Kullanıcı Adı</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">E-posta</label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Şifre</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Şifre Tekrar</label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Kayıt Ol</button>
                    </form>
                    <p className="mt-3 text-center">
                        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;