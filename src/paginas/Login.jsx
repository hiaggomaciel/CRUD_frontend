import React, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Botao from "../componentes/Botao";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("users/");
      setUsers(response.data.results);
    }
    loadUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (users.indexOf(email) === -1) {
      alert("Email não existe!");
    }
    navigate("/dashboard");
  };

  return (
    <Container component="main">
      <h2>Digite seu usuário e senha para acessar o MyImagesManager</h2>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Stack
          spacing={5}
          direction="row"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          justifyItems="center"
        >
          <TextField
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />

          <TextField
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            id="password"
            name="password"
            label="Digite sua Senha"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Stack>
        <Stack spacing={5} direction="row">
          <Botao
            type="submit"
            variant="contained"
            color="primary"
            children="Logar"
            onClick={handleSubmit}
          />
          <Button
            style={{ backgroundColor: "#6278f7", padding: "10px 20px" }}
            href="http://localhost:3000/cadastro"
            type="submit"
            variant="contained"
            color="primary"
            children="Inscreva-se"
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
