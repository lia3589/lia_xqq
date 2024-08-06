import React, { useState } from "react";
import "./Login.css"

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const CheckLogin = ({ username, password }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username!=='' && password!=='') {
                    resolve();
                } else {
                    reject();
                }
            }, 1000);
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("password: ", password, "username: ", username);
        try {
            await CheckLogin({ username, password });
            console.log("Login Success");
            setError('');
            await onLogin(username, password);
        } catch (error) {
            console.log("Login Failed; invalid username or password");
            setError("用户名或密码不能为空");
        } finally {
            setUsername('')
            setPassword('')
            setLoading(false);
        }
    }

    return (
        <>
            <div className="card container mt-5">
                <div className="card-body">
                    <h1 className="card-title">兴趣圈</h1>
                    {error && <div className="alert alert-danger" role="alert" class="warning">
                        {error}
                    </div>}
                    <form className="loginForm" onSubmit={handleLogin}>
                        <div className="form-group">
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
                        {/* <small id="usernameHelp" className="form-text text-muted">Something you like</small> */}
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
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;