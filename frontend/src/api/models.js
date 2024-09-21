import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchModels = (userId, page = 1, search = '') => {
  return axios.get(`${API_URL}/models`, {
    params: {
      userId,
      page,
      search,
    },
  });
};

export const uploadModel = (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const runModel = (modelId, data) => {
  const isFormData = data instanceof FormData;

  return axios.post(`${API_URL}/models/${modelId}/run`, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};
