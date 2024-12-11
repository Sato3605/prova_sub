import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarAlunos from "./components/listar-aluno";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/pages/aluno/listar"}>
                  Listar Alunos{" "}
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ListarAlunos />} />
            <Route
              path="/pages/aluno/listar"
              element={<ListarAlunos />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
