import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const Sidebar = () => {
  const [userType, setUserType] = useState(window.localStorage.getItem('user'));

  return (
    <nav className="col-md-3  col-lg-2 d-md-block sidebar custom-sidebar sideBarWidth">
      <div className="sidebar-sticky ">
        <h5 className="sidebar-heading d-flex justify-content-center py-4  sideBarStyle colorBrand">
          Menu
        </h5>
        <ul className="nav flex-column sideBarStyle">
          <li className="nav-item  colorBrandHover">
            <Link to="/" className="nav-link sideBarStyle">
              Home
            </Link>
          </li>
          <li className="nav-item  colorBrandHover">
            <Link
              to="/listagemFornecedores"
              className="nav-link active sideBarStyle"
            >
              Fornecedores
            </Link>
          </li>
          <li className="nav-item  colorBrandHover">
            <Link to="/listagemContatos" className="nav-link sideBarStyle">
              Contatos
            </Link>
          </li>
          <li className="nav-item  colorBrandHover">
            <Link to="/listagemProdutos" className="nav-link sideBarStyle">
              Produtos
            </Link>
          </li>
          {userType === 'gerente' ? (
            <li className="nav-item">
              <Link to="/listagemCotacao" className="nav-link sideBarStyle">
                Cotação
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
