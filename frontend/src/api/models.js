import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const dummyModels = [
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
  {
    id: 1,
    name: "Sample Model 1",
    description: "This is a description for Sample Model 1.",
  },
  {
    id: 2,
    name: "Sample Model 2",
    description: "This is a description for Sample Model 2.",
  },
];

export const fetchModels = (userId, page = 1, search = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchTerm =
      typeof search === 'string' ? search.toLowerCase() : '';
    
      let filteredModels = dummyModels.filter((model) =>
        model.name.toLowerCase().includes(searchTerm)
      );

      const modelsPerPage = 9;
      const startIndex = (page - 1) * modelsPerPage;
      const endIndex = startIndex + modelsPerPage;
      const paginatedModels = filteredModels.slice(startIndex, endIndex);

      resolve({
        data: {
          models: paginatedModels,
          totalModelCount: filteredModels.length,
        },
      });
    }, 500);
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
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.percentage !== undefined) {
        resolve({
          data: {
            message: 'Model configuration received.',
          },
        });
      } else {
        resolve({
          data: {
            output: `Model ${modelId} processed your data successfully.`
          },
        });
      }
    }, 1000);
  });
};