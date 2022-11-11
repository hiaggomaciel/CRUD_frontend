import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Container } from "@mui/system";

const Cadastro = ({ aoEnviar }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("As senhas devem ser iguais!");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("nomeCompleto", nomeCompleto);
      formData.append("email", email);
      formData.append("password", password);

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await api
        .post("users/", formData, headers)
        .then((response) => {
          if (response.status === 201) {
            setSuccess("Usuário salvo com sucesso");
            setError("");
          }
        })
        .catch((event) => {
          setError(event.response.data["error"]);
          setSuccess("");
        });
      navigate("/");
    }
  };

  return (
    <Container component="main">
      <h2>Preencha os dados para criar um novo usuário</h2>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
          id="username"
          label="Nome de Usuário"
          name="username"
          variant="outlined"
          margin="normal"
          fullWidth
          autoFocus
        />

        <TextField
          value={nomeCompleto}
          onChange={(event) => {
            setNomeCompleto(event.target.value);
          }}
          required
          id="nomeCompleto"
          label="Nome Completo"
          name="nomeCompleto"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
          id="email"
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
          id="password"
          label="Senha"
          type="password"
          name="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          required
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirme sua senha"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" size="large">
          Finalizar Cadastro
        </Button>
      </Box>
    </Container>
  );
};

export default Cadastro;
