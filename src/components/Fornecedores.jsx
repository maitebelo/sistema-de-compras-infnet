import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../App.css';
import Sidebar from './Sidebar';

const Fornecedores = ({ usuario, setUsuario }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nome: '',
    cnpj: '',
    tipoProduto: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const fornecedoresRef = collection(db, 'sistema-fornecedores');

      const novoFornecedor = { ...formValues };

      await addDoc(fornecedoresRef, novoFornecedor);

      setFormValues({
        nome: '',
        cnpj: '',
        tipoProduto: '',
      });

      console.log('Fornecedor adicionado com sucesso!');
      navigate('/listagemFornecedores');
    } catch (error) {
      console.error('Erro ao adicionar fornecedor:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className=" ">
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-md-4 posicionamento"
          >
            <header className="py-4">
              <h1>Adicionar Fornecedor</h1>
            </header>
            <div className="row rowWidth">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome:
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      className="form-control"
                      value={formValues.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cnpj" className="form-label">
                      CNPJ:
                    </label>
                    <input
                      type="text"
                      id="cnpj"
                      name="cnpj"
                      className="form-control"
                      value={formValues.cnpj}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipoProduto" className="form-label">
                      Tipo de Produto:
                    </label>
                    <input
                      type="text"
                      id="tipoProduto"
                      name="tipoProduto"
                      className="form-control"
                      value={formValues.tipoProduto}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn  botaoListagem">
                    Adicionar Fornecedor
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

export default Fornecedores;
