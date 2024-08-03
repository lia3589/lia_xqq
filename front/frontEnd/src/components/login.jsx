import React, { useState } from "react";
import "./login.css"

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
            await onLogin();
        } catch (error) {
            console.log("Login Failed; invalid username or password");
            setError("Invalid username or password");
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
                    <h1 className="card-title">LOGIN</h1>
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <form className="loginForm" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {/* <small id="usernameHelp" className="form-text text-muted">Something you like</small> */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            disabled={loading}
                            type="submit" className="btn btn-lg btn-block btn-primary">
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;