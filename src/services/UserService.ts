import axios from "axios";
import { SyntheticEvent } from "react";
import constants from "../constants";
import { LoginResponseType } from "../types";
import StorageService from './StorageService';

const login = (email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/login`;
  return axios
    .post<LoginResponseType>(url, { email, password })
    .catch((e) => Promise.reject(e.response.data));
};

const register = (name: string, email: string, password: string) => {
  const url = `${constants.BASE_URL}/auth/register`;
  return axios
    .post(url, { name, email, password })
    .catch((e) => Promise.reject(e.response.data));
};


const profile = () => {
  const url = `${constants.BASE_URL}/auth/profile`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};


const address = () => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) =>
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

const addressPost = (line1: string, line2: string, city: string, state: string, pincode: string) => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) =>
    axios.post(url, { line1, line2, city, state, pincode }, {
      headers: { Authorization: `Bearer ${token}`, },
    })
  );
};




export default { login, profile, register, address, addressPost };
