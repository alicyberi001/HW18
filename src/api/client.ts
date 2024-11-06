import axios from "axios";

const serverUrl = "https://dummyjson.com";
export const generateClient = () => {
  return axios.create({
    baseURL: serverUrl,
  });
};
