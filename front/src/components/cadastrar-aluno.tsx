import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Imc } from "../models/imc";
import { Aluno } from "../models/aluno";

function CadastrarAluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [imcId, setImcId] = useState("");
  const [imcs, setImcs] = useState<Imc[]>([]);

  useEffect(() => {
    carregarImcs();
  }, []);

  function carregarImcs() {
    fetch("http://localhost:5256/imc/listar")
      .then((resposta) => resposta.json())
      .then((imcs: Imc[]) => {
        setImcs(imcs);
      });
  }

  function cadastrarAluno(e: any) {
    const aluno: Aluno = {
      nome: nome,
      sobrenome: sobrenome,
      imcId: imcId,
    };

    fetch("http://localhost:5256/alunos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    })
      .then((resposta) => resposta.json())
      .then((aluno: Aluno) => {
        navigate("/pages/aluno/listar");
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={cadastrarAluno}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Sobrenome:</label>
        <input
          type="text"
          placeholder="Digite o sobrenome"
          onChange={(e: any) => setSobrenome(e.target.value)}
        />
        <br />
        <label>Imcs:</label>
        <select onChange={(e: any) => setImcId(e.target.value)}>
          {imcs.map((imc) => (
            <option
              value={imc.imcId}
              key={imc.imcId}
            >
              {imc.alunoId}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarAluno;
