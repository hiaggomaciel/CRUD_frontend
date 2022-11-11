import axios from "axios"

export const api = axios.create({
    baseURL:"http://127.0.0.1:8000/"

});

export const createSession = async (email, senha) => {
    return api.post("token/", {email, senha})
}