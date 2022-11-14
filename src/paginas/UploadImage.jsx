import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const ImageUpload = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await api
      .post("images/", formData, headers)
      .then((response) => {
        if (response.status === 201) {
        }
      })
      .catch((response) => {
        console.log(response);
      });
    navigate("/");
  };

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("users/");
      console.log(response.data.results)
      setUsers(response.data.results)
    }
    loadUsers();
  }, []);

  ///// Botão para escolher usuário

  const usuarios = [users];
  ////console.log([usuarios])
  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  /////

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          id="name"
          name="name"
          label="Digite o nome da sua imagem"
          type="name"
          variant="outlined"
          margin="normal"
          fullWidth
          required
        >
          Nome da Imagem
        </TextField>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label"> Nome</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {usuarios.map((user) => (
              <MenuItem
                key={user}
                value={user}
                syle={getStyles(name, personName, theme)}
              >
                {user.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ImageUpload;
