import React, { useState } from "react";
import "./Login.css";
import defaultAvatar from '../assets/default-avatar1.jpg';
import { login } from '../services/AuthService'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(defaultAvatar);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const user = await login(username, password);
          onLogin(user);
        } catch (error) {
          setError('用户名或密码错误');
        } finally {
          setLoading(false);
        }
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="card container mt-5">
                <div className="card-body">
                    <img src='\src\assets\INTER-KNOT.png' alt="logo"></img>
                    <h1 className="card-title">登录绳网</h1>
                    {error && <div className="alert alert-danger" role="alert" className="warning">
                        {error}
                    </div>}
                    <form className="loginForm" onSubmit={handleLogin}>
                        <div className="form-group d-flex align-items-center">
                            <div style={{ marginRight: '10px', }}>
                                <label htmlFor="avatarInput" style={{ cursor: 'pointer' }}>
                                    <img 
                                        src={avatar} 
                                        alt="avatar" 
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                    />
                                    <input 
                                        type="file" 
                                        style={{ display: 'none' }} 
                                        id="avatarInput" 
                                        onChange={handleImageChange} 
                                    />
                                </label>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="username">用户名</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="请输入用户名..."
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">密码</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="请输入密码..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button 
                                    disabled={loading}
                                    type="submit" className="btn btn-dark btn-block btn-primary">
                                    {loading ? "正在登录..." : "登录"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
