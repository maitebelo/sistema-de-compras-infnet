import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../infra/loginService';
import '../App.css';

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password)
      .then(() => {
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8">
          <div className="card loginCard">
            <div className="card-body">
              <h5 className="card-title text-center">
                Entre com e-mail e senha
              </h5>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Senha"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button
                onClick={handleLogin}
                className="btn btn-primary botaoLogin"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="btn btn-primary botaoLogin"
              >
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
