import { Routes, Route} from "react-router-dom";

import {  AuthProvider } from "./contexts/auth";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";

function Routers() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </AuthProvider>
  );
}

export default Routers;
