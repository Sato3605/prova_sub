import { useEffect, useState } from "react";
import { Aluno } from "../models/aluno";
import axios from "axios";

function ListarAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    //FETCH ou AXIOS
    fetch("http://localhost:5256/alunos/listar")
      .then((resposta) => resposta.json())
      .then((alunos: Aluno[]) => {
        console.table(alunos);
        setAlunos(alunos);
      });
  }

  function alterar(id: string) {
    console.log(`Id: ${id}`);
    axios
      .put(`http://localhost:5256/alunos/alterar/${id}`)
      .then((resposta) => {
        setAlunos(resposta.data);
      });
  }

  return (
    <div>
      <h1>Alunos</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Sobrenome</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.Id}>
              <td>{aluno.Id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.sobrenome}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarAlunos;
