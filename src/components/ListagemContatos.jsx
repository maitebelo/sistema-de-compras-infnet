import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../App.css';

const ListagemContatos = () => {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    const fetchContatos = async () => {
      const contatosRef = collection(db, 'sistemas-contatos');
      const snapshot = await getDocs(contatosRef);
      const dadosContatos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContatos(dadosContatos);
    };

    fetchContatos();
  }, []);

  const handleDeleteContato = async (contatoId) => {
    try {
      await deleteDoc(doc(db, 'sistemas-contatos', contatoId));

      setContatos((prevContatos) =>
        prevContatos.filter((contato) => contato.id !== contatoId),
      );

      console.log('Contato deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar contato:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="containerListagem">
        <div className="itensWidth">
          <h2 className="listagemContainer">Listagem de Contatos</h2>
          <Link to="/contatos" className="btn btn-primary botaoListagem">
            Adicionar Contato
          </Link>
        </div>
        <div className="rowListagem">
          {contatos.map((contato) => (
            <div className="cardBody" key={contato.id}>
              <div className="card cardMeasures">
                <div className="card-body  cardSize">
                  <h5 className="card-title">{contato.nome}</h5>
                  <p className="card-text">E-mail: {contato.email}</p>
                  <p className="card-text">Telefone: {contato.telefone}</p>
                  <p className="card-text">Fornecedor: {contato.fornecedor}</p>
                  <button
                    className="btn botaoDelete"
                    onClick={() => handleDeleteContato(contato.id)}
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

export default ListagemContatos;
