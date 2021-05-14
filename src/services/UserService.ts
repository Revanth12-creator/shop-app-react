import axios from "axios";
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

const addressPost = (address1: string, address2: string, city: string, state1: string, pincode: string) => {
  const url = `${constants.BASE_URL}/address`;
  // return axios
  //   .post(url, { address1, address2, city, state1, pincode })
  //   .catch((e) => Promise.reject(e.response.data));
  return StorageService.getData("token").then((token) =>
    axios.post(url, {
      headers: { Authorization: `Bearer ${token}`, },
    }, {})
  );
};


const deleteAddress = () => {
  const url = `${constants.BASE_URL}/address`;
  return StorageService.getData("token").then((token) =>
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

const addressEdit = (address1: string, address2: string, city: string, state1: string, pincode: string) => {
  const url = `${constants.BASE_URL}/address`;
  return axios
    .patch(url, { address1, address2, city, state1, pincode })
    .catch((e) => Promise.reject(e.response.data));
};


export default { login, profile, register, address, addressPost, addressEdit, deleteAddress };
