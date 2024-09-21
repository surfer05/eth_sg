import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadModal from "../UploadModal/UploadModal";

const UploadModel = () => {
  const [showModal, setShowModal] = useState(false);
  const [models, setModels] = useState([
    { id: 1, name: "Model 1" },
    { id: 2, name: "Model 2" },
    { id: 3, name: "Model 1" },
    { id: 4, name: "Model 2" },
    { id: 5, name: "Model 1" },
    { id: 6, name: "Model 2" },
    { id: 7, name: "Model 1" },
    { id: 8, name: "Model 2" },
    { id: 9, name: "Model 1" },
    { id: 10, name: "Model 2" },
    { id: 11, name: "Model 1" },
    { id: 12, name: "Model 2" },
  ]);

  const handleAddModel = async () => {
    setShowModal(true);
    // event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload-model", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
      console.log("Received file content:", result.fileContent); // Log the file content
    } catch (error) {
      console.error("Error uploading the file:", error);
      setMessage("Failed to upload the file.");
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "30px" }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Upload Model
        </Typography>
        <List>
          {models.map((model) => (
            <ListItem key={model.id}>{model.name}</ListItem>
          ))}
        </List>
        <Box textAlign="center" marginTop={2}>
          <IconButton color="primary" onClick={handleAddModel}>
            <AddIcon />
          </IconButton>
        </Box>
        {showModal && <UploadModal onClose={() => setShowModal(false)} />}
      </Box>
    </Paper>
  );
};

export default UploadModel;

// import { useState } from 'react';

// export default function UploadModel() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async (event) => {
//
//   };

//   return (
//     <div>
//       <h2>Upload ML Model (Python File)</h2>
//       <form onSubmit={handleUpload}>
//         <input type="file" accept=".py" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
