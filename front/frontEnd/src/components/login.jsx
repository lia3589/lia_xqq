import React, { useState } from "react";
import defaultAvatar from '../assets/default-avatar1.jpg';
import { login, register } from '../services/AuthService'

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
          console.log(user);
          if (user.success === false) {
            setError('用户名或密码错误');
          } else {
            onLogin(user);
          }
        } catch (error) {
          setError('用户名或密码错误');
        } finally {
          setLoading(false);
        }
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await register(username, password);
          console.log(response);
          if (response.data.success) {
            onLogin(response.data);
          } else {
            if (response.data.message === '用户名已存在') {
              setError('用户名已存在');
            } else {
              setError('注册失败，请重试');
            }
          }
        } catch (error) {
          setError('注册失败，请重试');
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

    const loginFormStyle = {
        marginTop: '40px',
        width: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
        borderRadius: '10px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        backgroundColor: '#000000',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        border: 'none',
        cursor: 'pointer',
        width: '100%'
    };

    const buttonHoverStyle = {
        opacity: '0.8'
    };

    return (
        <>
            <div className="card container mt-5">
                <div className="card-body">
                    <img src='\src\assets\INTER-KNOT.png' alt="logo"></img>
                    <h1 className="card-title">登录绳网</h1>
                    {error && <div className="alert alert-danger" role="alert" >
                        {error}
                    </div>}
                    <form className="loginForm" onSubmit={handleLogin} style={loginFormStyle}>
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
                                        style={inputStyle}
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
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button 
                                        disabled={loading}
                                        type="submit" className="btn btn-dark btn-block btn-primary"
                                        style={buttonStyle}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = buttonHoverStyle.opacity}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                        {loading ? "正在登录..." : "登录"}
                                    </button>
                                    <button 
                                        disabled={loading}
                                        type="button" className="btn btn-dark btn-block btn-secondary" onClick={handleRegister}
                                        style={buttonStyle}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = buttonHoverStyle.opacity}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                        {loading ? "正在注册..." : "注册"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
