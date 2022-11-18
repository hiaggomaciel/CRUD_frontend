import React, { useEffect } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { api } from "../services/api";

const ImageUpload = () => {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState("");
  const [nameImage, setNameImage] = useState("");
  const [idUserSelect, setIdUserSelect] = useState("");

  //// Puxando os Usuários da API ////
  const data = { name: nameImage, user: idUserSelect };
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("users/");
      setUsers(response.data.results);
    }
    loadUsers();
  }, []);
  const usersSelect = users?.map((item, index) => {
    return { value: item.id, label: item.nomeCompleto };
  });

  //// Transformando os dados da API ////
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify(data));

  //// Declaração para envio dos dados ////
  const testFetch = async () => {
    console.log(data);
    const response = await fetch(
      `http://127.0.0.1:8000/users/${idUserSelect}/images/uploadfiles/`,
      {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData,
      }
    )
      .then(async (res) => {
        await res.json();
      })
      .then((users) => {
        console.log(users);
      })
      .catch((error) => console.log(error));
    console.log(response);
  };

  return (
    <Container>
      <Box component="form">
        <TextField
          value={nameImage}
          onChange={(event) => {
            setNameImage(event.target.value);
          }}
          id="nameImage"
          name="nameImage"
          label="Digite o nome da sua imagem"
          type="nameImage"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        ></TextField>

        <TextField
          variant="outlined"
          id="outlined-select-currency"
          select
          fullWidth
          label="Usuário"
          value={idUserSelect}
          onChange={(event) => {
            setIdUserSelect(event.target.value);
          }}
          helperText="Escolha sua imagem"
        >
          {usersSelect.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Stack
          spacing={5}
          direction="row"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          justifyItems="center"
        >
          <TextField
            fullWidth
            required
            type="file"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          ></TextField>
          <Button
            type="submit"
            size="large"
            variant="contained"
            component="label"
            onClick={testFetch}
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ImageUpload;
