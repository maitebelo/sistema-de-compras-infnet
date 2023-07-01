import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import Sidebar from './Sidebar';
import '../App.css';
import { Link } from 'react-router-dom';

const ListagemCotacao = () => {
  const [cotacoes, setCotacoes] = useState([]);

  useEffect(() => {
    const fetchCotacoes = async () => {
      try {
        const cotacoesRef = collection(db, 'sistemas-cotacoes');
        const snapshot = await getDocs(cotacoesRef);
        const cotacoesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Obter o nome do produto para cada cotação
        const cotacoesComProduto = await Promise.all(
          cotacoesData.map(async (cotacao) => {
            const produtoRef = doc(db, 'sistemas-produtos', cotacao.produto);
            const produtoSnapshot = await getDoc(produtoRef);
            const produtoData = produtoSnapshot.data();
            const nomeProduto = produtoData.nome;

            return {
              ...cotacao,
              nomeProduto,
            };
          }),
        );

        setCotacoes(cotacoesComProduto);
      } catch (error) {
        console.error('Erro ao obter cotações:', error);
      }
    };

    fetchCotacoes();
  }, []);

  const handleDeleteCotacao = async (cotacaoId) => {
    try {
      await deleteDoc(doc(db, 'sistemas-cotacoes', cotacaoId));
      setCotacoes((prevCotacoes) =>
        prevCotacoes.filter((cotacao) => cotacao.id !== cotacaoId),
      );
      console.log('Cotação deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar cotação:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="containerListagem">
        <div className="itensWidth">
          <h2 className="listagemContainer">Listagem de Cotações</h2>
          <Link to="/cotacao" className="btn btn-primary botaoListagem">
            Adicionar Cotação
          </Link>
        </div>
        <div className="rowListagem">
          {cotacoes.map((cotacao) => (
            <div className="cardBody" key={cotacao.id}>
              <div className="card cardMeasures">
                <div className="card-body cardSize">
                  <h5 className="card-title">{cotacao.nomeProduto}</h5>
                  <p className="card-text">Valor: {cotacao.valorCotacao}</p>
                  <button
                    className="btn botaoDelete"
                    onClick={() => handleDeleteCotacao(cotacao.id)}
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

export default ListagemCotacao;
