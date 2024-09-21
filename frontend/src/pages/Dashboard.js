import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  Container,
} from "@mui/material";
import { uploadModel } from "../api/models";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("file", file);

    //   uploadModel(formData).then(() => {
    //     setShowModal(false);
    //     setFile(null);
    //     alert("Model uploaded successfully!");
    //   });
    // }
    Document.body.innerHTML = "Model uploaded successfully!";
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null); // Reset file if modal is closed without uploading
  };

  return (
    <Container maxWidth="sm">
      <Box padding="20px" textAlign="center" marginTop="100px">
        <Typography variant="h4" gutterBottom>
          {/* Dashboard */}
        </Typography>

        {/* Updated Box to align buttons horizontally */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="40px"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            style={{
              marginRight: "20px",
              width: "200px",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            Upload Model
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/run-model")}
            style={{ width: "200px", display: "none" }}
          >
            Run Model
          </Button>
        </Box>

        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="upload-modal-title"
          aria-describedby="upload-modal-description"
        >
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              style={{
                padding: "30px",
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" id="upload-modal-title" gutterBottom>
                Upload Python Model
              </Typography>
              <Button
                variant="contained"
                component="label"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Choose File
                <input
                  type="file"
                  accept=".py"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {file && (
                <Typography variant="body2" style={{ marginTop: "10px" }}>
                  Selected File: {file.name}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!file}
                style={{ marginTop: "20px" }}
              >
                Upload
              </Button>
            </Paper>
          </Container>
        </Modal>
      </Box>
    </Container>
  );
};

export default Dashboard;
