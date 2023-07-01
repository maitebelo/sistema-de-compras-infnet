import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('/');
  const [userType, setUserType] = useState(window.localStorage.getItem('user'));
  const [fornecedoresCount, setFornecedoresCount] = useState(0);
  const [produtosCount, setProdutosCount] = useState(0);
  const [contatosCount, setContatosCount] = useState(0);

  useEffect(() => {
    const fetchFornecedoresCount = async () => {
      const fornecedoresSnapshot = await getDocs(
        collection(db, 'sistema-fornecedores'),
      );
      setFornecedoresCount(fornecedoresSnapshot.size);
    };

    const fetchProdutosCount = async () => {
      const produtosSnapshot = await getDocs(
        collection(db, 'sistemas-produtos'),
      );
      setProdutosCount(produtosSnapshot.size);
    };

    const fetchContatosCount = async () => {
      const contatosSnapshot = await getDocs(
        collection(db, 'sistemas-contatos'),
      );
      setContatosCount(contatosSnapshot.size);
    };

    fetchContatosCount();
    fetchFornecedoresCount();
    fetchProdutosCount();
  }, []);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };
  const produtos = 50;
  return (
    <div>
      <div className="containerEx">
        <Sidebar />
        <main
          role="main"
          className="col-md-9 ml-sm-auto col-lg-10 px-md-4 titleDashboard "
        >
          <header className="py-4 text-center containerListagem">
            <h1>Olá, </h1>
            <h1 className="colorBrand">
              {userType === 'gerente' ? 'Gerente' : 'Administrador'}
            </h1>
          </header>
          <div>
            <p className=" containerListagem ">Número de cadastros:</p>
          </div>
          <div className="containerListagem ">
            <div className="row">
              <div className="col-md-4">
                <div className="card colorCard">
                  <div className="card-body">
                    <h5 className="card-title">Fornecedores</h5>
                    <p className="card-text">{fornecedoresCount}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 colorCard">
                  <div className="card-body">
                    <h5 className="card-title">Contatos</h5>
                    <p className="card-text">{contatosCount}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 colorCard">
                  <div className="card-body">
                    <h5 className="card-title">Produtos</h5>
                    <p className="card-text">{produtosCount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
