import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Sidebar from './Sidebar';
import '../App.css';

const Contatos = () => {
  const navigate = useNavigate();
  const [contato, setContato] = useState({
    nome: '',
    email: '',
    telefone: '',
    fornecedor: '',
  });
  const [fornecedores, setFornecedores] = useState([]);
  const contatosRef = collection(db, 'sistemas-contatos');
  const fornecedoresRef = collection(db, 'sistema-fornecedores');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContato((prevContato) => ({
      ...prevContato,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(contatosRef, contato);

      setContato({
        nome: '',
        email: '',
        telefone: '',
        fornecedor: '',
      });

      console.log('Contato adicionado com sucesso!');
      navigate('/listagemContatos');
    } catch (error) {
      console.error('Erro ao adicionar Contato:', error);
    }
  };

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const snapshot = await getDocs(fornecedoresRef);
        const fornecedoresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error('Erro ao obter fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

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
              <h1>Contatos Fornecedor</h1>
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
                      value={contato.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={contato.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefone" className="form-label">
                      Telefone:
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="form-control"
                      value={contato.telefone}
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
                      name="fornecedor"
                      className="form-control"
                      value={contato.fornecedor}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione um fornecedor</option>
                      {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.nome}>
                          {fornecedor.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn  botaoListagem">
                    Enviar
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

export default Contatos;
