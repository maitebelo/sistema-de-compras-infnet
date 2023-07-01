import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore';
import '../App.css';
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ListagemFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      const fornecedoresRef = collection(db, 'sistema-fornecedores');
      const snapshot = await getDocs(fornecedoresRef);
      const dadosFornecedores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFornecedores(dadosFornecedores);
    };

    fetchFornecedores();
  }, []);

  const handleDeleteFornecedor = async (fornecedorId) => {
    try {
      await deleteDoc(doc(db, 'sistema-fornecedores', fornecedorId));

      setFornecedores((prevFornecedores) =>
        prevFornecedores.filter((fornecedor) => fornecedor.id !== fornecedorId),
      );

      console.log('Fornecedor deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="containerListagem">
        <div className="itensWidth">
          <h2 className="listagemContainer">Listagem de Fornecedores</h2>
          <Link to="/fornecedores" className="btn btn-primary botaoListagem">
            Adicionar Fornecedor
          </Link>
        </div>
        <div className=" rowListagem">
          {fornecedores.map((fornecedor) => (
            <div className="cardBody" key={fornecedor.id}>
              <div className="card cardMeasures">
                <div className="card-body cardSize">
                  <h5 className="card-title">{fornecedor.nome}</h5>
                  <p className="card-text">CNPJ: {fornecedor.cnpj}</p>
                  <p className="card-text">
                    Tipo de Produto: {fornecedor.tipoProduto}
                  </p>
                  <button
                    className="btn botaoDelete"
                    onClick={() => handleDeleteFornecedor(fornecedor.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListagemFornecedores;
