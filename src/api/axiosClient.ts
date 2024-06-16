import { STATIC_HOST, DJANGO_HOST } from "@/constants/common"
import axios, { AxiosError } from "axios";

const axiosClientArduino = axios.create({
  baseURL: `${STATIC_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosClientDjango = axios.create({
  baseURL: `${DJANGO_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});

[axiosClientArduino, axiosClientDjango].forEach(client => {
  client.interceptors.request.use(
    (config) => {
      // const token = localStorage.getItem("access_token")
      // if (token) {
      //   config.headers["Authorization"] = `Bearer ${token}`
      // }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error: AxiosError) {
      return Promise.reject(error.response?.data);
    }
  );
});

export { axiosClientArduino, axiosClientDjango };
