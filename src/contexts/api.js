import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setError("");
    setSuccess("");
    setData([]);
  }, [location.pathname]);

  const apiGet = ({ url, tokenUser }) => {
    axios({
      method: "GET",
      headers: {
        "content-type": "multipart/form-data",
        'Authorization': `Bearer ${tokenUser}`,
      },
      url: url,
    })
      .then((response) => {
        if (response.data.length === 0) {
          setError("Nenhuma imagem encontrada!");
        } else {
          setData(response.data);
          setError("");
        }
      })
      .catch((e) => setError(e.response.data["error"]));
  };

  const apiPost = ({ url, data, token }) => {
    axios({
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        'Authorization' : `Token ${token}`,
      },
      url: url,
      data: data,
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccess("Imagem salva com sucesso!");
          setError("");
        }
      })
      .catch((e) => {
        setError(e.response.data["error"]);
        setSuccess("");
      });
  };

  const apiDelete = ({ url, token }) => {
    console.log('DELETE')
    axios({
      method: "DELETE",
      headers: {
        "content-type" : "multipart/form-data",
        'Authorization' : `Token ${token}`,
      },
      url: url,
    })
      .then((response) => {
        if (response.status === 201) {
          setSuccess("Imagem deletada com sucesso!");
          setError("");
          setSuccess("");
          apiGet({ });
        }
      })
      .catch((e) => {
        setError(e.response.data["error"]);
        setSuccess("");
      });
  };

  return (
    <ApiContext.Provider
      value={{ error, setError, success, data, apiGet, apiPost, apiDelete }}
    >
      {children}
    </ApiContext.Provider>
  );
};