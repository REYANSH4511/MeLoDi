// Api.js
import axios from "axios";

const BASE_URL = "http://localhost:8001";
console.log("base url", BASE_URL);
const instance = axios.create({
  baseURL: BASE_URL,
});

export const getData = async (endpoint) => {
  try {
    const response = await instance.get(`${endpoint}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, body) => {
  try {
    const response = await instance.post(`${endpoint}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateData = async (endpoint, data, options) => {
  try {
    const response = await instance.put(`/${endpoint}`, data, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, data) => {
  try {
    console.log("delete data");
    const response = await instance.delete(`/${endpoint}`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, data, options) => {
  try {
    const response = await axios.put(`${endpoint}`, data, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
