import React, { useState, useContext } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Botao from "../componentes/Botao";
import { AuthContext } from "../contexts/auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", { email, senha: password });
    login(email, password);
  };

  return (
    <Container component="main">
      <h2>Digite seu usuário e senha para acessar o MyImagesManager</h2>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
