import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Sidebar from './Sidebar';
import '../App.css';

const Cotacao = () => {
  const navigate = useNavigate();
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [valorCotacao, setValorCotacao] = useState('');
  const [produtos, setProdutos] = useState([]);
  const cotacoesRef = collection(db, 'sistemas-cotacoes');
  const produtosRef = collection(db, 'sistemas-produtos');
  const [userType, setUserType] = useState(window.localStorage.getItem('user'));

  const handleProdutoChange = (event) => {
    setProdutoSelecionado(event.target.value);
  };

  const handleValorCotacaoChange = (event) => {
    setValorCotacao(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const novaCotacao = {
        produto: produtoSelecionado,
        valorCotacao,
      };

      await addDoc(cotacoesRef, novaCotacao);

      setProdutoSelecionado('');
      setValorCotacao('');

      navigate('/listagemCotacao');
      console.log('Cotação adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar Cotação:', error);
    }
  };

  useEffect(() => {
    if (userType !== 'gerente') {
      navigate('/paginaErro');
    }
  }, [userType]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const snapshot = await getDocs(produtosRef);
        const produtosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="containerListagem">
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <header className="py-4">
              <h1>Cotação de Produto</h1>
            </header>
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="produto" className="form-label">
                      Produto:
                    </label>
                    <select
                      id="produto"
                      className="form-control"
                      value={produtoSelecionado}
                      onChange={handleProdutoChange}
                      required
                    >
                      <option value="">Selecione um produto</option>
                      {produtos &&
                        produtos.map((produto) => (
                          <option key={produto.id} value={produto.id}>
                            {produto.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="valorCotacao" className="form-label">
                      Valor da Cotação:
                    </label>
                    <input
                      type="text"
                      id="valorCotacao"
                      className="form-control"
                      value={valorCotacao}
                      onChange={handleValorCotacaoChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn  botaoListagem">
                    Enviar Cotação
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cotacao;
