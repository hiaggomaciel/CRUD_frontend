import React, { useEffect } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { api } from "../services/api";
import axios from "axios";

const ImageUpload = () => {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState("");
  const [nameImage, setNameImage] = useState("");
  const [nameUsersSelect, setNameUsersSelect] = useState("");

  const sendData = () => {
    const data = {
      imagename: nameImage,
      selectImage: image,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      data: data,
      url: `$images`,
      baseURL: "http://127.0.0.1:8000/users"
    };
    axios(options)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => console.log(response));
  };

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("users/");
      setUsers(response.data.results);
    }
    loadUsers();
  }, []);

  const usersSelect = users?.map((item, index) => {
    return { value: item.nomeCompleto, label: item.nomeCompleto };
  });
  console.log("nome Usuarios", nameUsersSelect);

  return (
    <Container>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          sendData();
        }}
      >
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
          label="Usuário"
          value={nameUsersSelect}
          onChange={(event) => {
            setNameUsersSelect(event.target.value);
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
              setImage(event.target.files);
            }}
          ></TextField>
          <Button
            type="submit"
            size="large"
            variant="contained"
            component="label"
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ImageUpload;
