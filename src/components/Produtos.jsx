import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Sidebar from './Sidebar';

export default function Produtos({ fornecedores }) {
  const [formData, setFormData] = useState({
    produto: '',
    fornecedorSelecionado: '',
    quantidade: '',
    valorUnitario: '',
    valorTotal: '',
  });

  const [fornecedoresData, setFornecedoresData] = useState([]);
  const produtosRef = collection(db, 'sistemas-produtos');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const novoProduto = {
        nome: formData.produto,
        fornecedor: formData.fornecedorSelecionado,
        quantidade: formData.quantidade,
        valorUnitario: formData.valorUnitario,
        valorTotal: formData.valorTotal,
      };

      await addDoc(produtosRef, novoProduto);

      setFormData({
        produto: '',
        fornecedorSelecionado: '',
        quantidade: '',
        valorUnitario: '',
        valorTotal: '',
      });

      console.log('Produto adicionado com sucesso!');
      navigate('/listagemProdutos');
    } catch (error) {
      console.error('Erro ao adicionar Produto:', error);
    }
  };

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const fornecedoresRef = collection(db, 'sistema-fornecedores');
        const snapshot = await getDocs(fornecedoresRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFornecedoresData(data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="">
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-md-4 posicionamento"
          >
            <header className="py-4">
              <h1>Solicitar Produto</h1>
            </header>
            <div className="row rowWidth">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="produto" className="form-label">
                      Produto:
                    </label>
                    <input
                      type="text"
                      id="produto"
                      name="produto"
                      className="form-control"
                      value={formData.produto}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fornecedor" className="form-label">
                      Fornecedor:
                    </label>
                    <select
                      id="fornecedor"
                      name="fornecedorSelecionado"
                      className="form-control"
                      value={formData.fornecedorSelecionado}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione um fornecedor</option>
                      {fornecedoresData.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantidade" className="form-label">
                      Quantidade:
                    </label>
                    <input
                      type="number"
                      id="quantidade"
                      name="quantidade"
                      className="form-control"
                      value={formData.quantidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="valorUnitario" className="form-label">
                      Valor Unitário:
                    </label>
                    <input
                      type="number"
                      id="valorUnitario"
                      name="valorUnitario"
                      className="form-control"
                      value={formData.valorUnitario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="valorTotal" className="form-label">
                      Valor Total:
                    </label>
                    <input
                      type="number"
                      id="valorTotal"
                      className="form-control"
                      value={formData.valorTotal}
                      disabled
                    />
                  </div>
                  <button type="submit" className="btn  botaoListagem">
                    Enviar Solicitação
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
