import { Routes, Route} from "react-router-dom";

import {  AuthProvider } from "./contexts/auth";
import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import ImageUpload from "./paginas/UploadImage";
import Dashboard from "./paginas/Dashboard";

function Routers() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default Routers;
