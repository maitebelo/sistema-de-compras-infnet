import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../infra/signupService';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../App.css';

function SignUp({ setIsAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const { user } = await signUp(email, password);

      const userData = { email, userType };

      await addDoc(collection(db, 'tipo-usuario'), {
        id: user.uid,
        ...userData,
      });

      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Crie uma conta</h5>
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
              <div className="form-group card-text">
                <label htmlFor="userType">Tipo de Usuário</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="admin"
                      checked={userType === 'admin'}
                      onChange={handleUserTypeChange}
                    />{' '}
                    Administrador
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="gerente"
                      checked={userType === 'gerente'}
                      onChange={handleUserTypeChange}
                    />{' '}
                    Gerente de Compras
                  </label>
                </div>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button onClick={handleSignUp} className="btn botaoLogin">
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
