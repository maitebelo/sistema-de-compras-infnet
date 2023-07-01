import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Fornecedores from './components/Fornecedores';
import Contatos from './components/Contatos';
import Produtos from './components/Produtos';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ListagemFornecedores from './components/ListagemFornecedores';
import ListagemContatos from './components/ListagemContatos';
import ListagemProdutos from './components/ListagemProdutos';
import Cotacao from './components/Cotacao';
import PaginaErro from './components/PaginaErro';
import './App.css';
import ListagemCotacao from './components/ListagemCotacao';

function App() {
  const [userType, setUserType] = useState(window.localStorage.getItem('user'));
  const fornecedores = [
    { id: 1, nome: 'Fornecedor 1' },
    { id: 2, nome: 'Fornecedor 2' },
  ];
  const [usuario, setUsuario] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth');
    if (authStatus) {
      setIsAuth(JSON.parse(authStatus));
    }
  }, []);

  const handleSetIsAuth = (value) => {
    setIsAuth(value);
    localStorage.setItem('isAuth', JSON.stringify(value));
  };

  return (
    <Router>
      <Routes>
        {!isAuth && (
          <Route path="/" element={<Login setIsAuth={handleSetIsAuth} />} />
        )}
        {!isAuth && (
          <Route
            path="/signup"
            element={<SignUp setIsAuth={handleSetIsAuth} />}
          />
        )}
        {isAuth && <Route path="/" element={<Dashboard />} />}
        {isAuth && (
          <Route
            path="/listagemFornecedores"
            element={<ListagemFornecedores />}
          />
        )}
        {isAuth && (
          <Route path="/listagemContatos" element={<ListagemContatos />} />
        )}
        {isAuth && (
          <Route
            path="/listagemProdutos"
            element={<ListagemProdutos fornecedores={fornecedores} />}
          />
        )}
        {isAuth && <Route path="/cotacao" element={<Cotacao />} />}
        {isAuth && userType === 'gerente' && (
          <Route path="/listagemCotacao" element={<ListagemCotacao />} />
        )}
        {isAuth && <Route path="/fornecedores" element={<Fornecedores />} />}
        {isAuth && (
          <Route
            path="/produtos"
            element={<Produtos fornecedores={fornecedores} />}
          />
        )}
        {isAuth && (
          <Route
            path="/contatos"
            element={
              <Contatos
                usuario={usuario}
                setUsuario={setUsuario}
                fornecedores={fornecedores}
              />
            }
          />
        )}
        {isAuth && <Route path="*" element={<PaginaErro />} />}
      </Routes>
    </Router>
  );
}

export default App;
