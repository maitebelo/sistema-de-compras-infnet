import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../App.css';

const ListagemProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const produtosRef = collection(db, 'sistemas-produtos');
      const snapshot = await getDocs(produtosRef);
      const dadosProdutos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(dadosProdutos);
    };

    fetchProdutos();
  }, []);

  const deletarProduto = async (produtoId) => {
    try {
      await deleteDoc(doc(db, 'sistemas-produtos', produtoId));
      setProdutos(produtos.filter((produto) => produto.id !== produtoId));
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  const calcularValorTotal = (valorUnitario, quantidade) => {
    return valorUnitario * quantidade;
  };

  return (
    <div>
      <Sidebar />
      <div className="containerListagem ">
        <div className="itensWidth">
          <h2 className="listagemContainer">Listagem de Produtos</h2>
          <Link to="/produtos" className="btn btn-primary botaoListagem">
            Adicionar Produto
          </Link>
        </div>
        <div className="rowListagem">
          {produtos.map((produto) => (
            <div className="cardBody" key={produto.id}>
              <div className="card cardMeasuresProdutos">
                <div className="card-body  cardSize">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text">Fornecedor: {produto.nome}</p>
                  <p className="card-text">Quantidade: {produto.quantidade}</p>
                  <p className="card-text">
                    Valor Unitário: {produto.valorUnitario}
                  </p>
                  <p className="card-text">
                    Valor Total:{' '}
                    {calcularValorTotal(
                      produto.valorUnitario,
                      produto.quantidade,
                    )}
                  </p>
                  <button
                    className="btn botaoDelete"
                    onClick={() => deletarProduto(produto.id)}
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

export default ListagemProdutos;
