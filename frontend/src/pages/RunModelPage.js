import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import ModelGrid from "../components/Dashboard/ModelGrid";
import Pagination from "../components/Pagination/Pagination";
import ComputationSlider from "../components/Dashboard/ComputationSlider";
import { fetchModels, runModel } from "../api/models";

const RunModelPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [computationPercentage, setComputationPercentage] = useState(50);
  const [userName, setUserName] = useState("");
  const [timeToHide, setTimeToHide] = useState("");
  const [secretMessage, setSecretMessage] = useState(null);
  const [totalModelCount, setTotalModelCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [output, setOutput] = useState(null);

  const modelsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchModels(null, page, search);
        setModels(response.data.models);
        setTotalModelCount(response.data.totalModelCount);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [page, search]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setStep(2); // Move to step 2
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search term changes
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleNext = async () => {
    // Send model ID and computation percentage to the backend
    const data = {
      modelId: selectedModel.id,
      percentage: computationPercentage,
    };
    setIsLoading(true);
    try {
      const response = await runModel(data.modelId, data);
      // Assume response is received
      console.log("Response from backend:", response.data);
      setStep(3); // Move to step 3
    } catch (error) {
      console.error("Error running model:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    // Send name, time, and secret message image to the backend
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("timeToHide", timeToHide);
    formData.append("secretMessage", secretMessage);

    setIsLoading(true);
    try {
      const response = await runModel(selectedModel.id, formData);
      console.log("Final output:", response.data.output);
      setOutput(response.data.output);
      setStep(4); // Move to step 4
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box padding="20px">
        <Typography variant="h4" gutterBottom align="center">
          Run a Model
        </Typography>

        {step === 1 && (
          <>
            <TextField
              label="Search Models"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              style={{ marginBottom: "20px" }}
            />

            <ModelGrid
              models={models}
              onModelSelect={handleModelSelect}
              selectedModel={selectedModel}
              isLoading={isLoading}
            />

            <Pagination
              page={page}
              count={Math.ceil(totalModelCount / modelsPerPage)}
              onChange={handlePageChange}
            />
          </>
        )}

        {step === 2 && selectedModel && (
          <>
            <Typography
              variant="h5"
              style={{ marginTop: "20px" }}
              align="center"
            >
              Selected Model: {selectedModel.name}
            </Typography>

            <ComputationSlider
              value={computationPercentage}
              onChange={setComputationPercentage}
            />

            <Box display="flex" justifyContent="center" marginTop="20px">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ marginRight: "10px" }}
              >
                Next
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </Box>
          </>
        )}

        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
          >
            <CircularProgress />
            <Typography variant="body1" style={{ marginLeft: "10px" }}>
              Processing...
            </Typography>
          </Box>
        )}

        {step === 3 && !isLoading && (
          <>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ margin: "10px 0" }}
            />

            <TextField
              label="Time to Hide (hours)"
              variant="outlined"
              fullWidth
              value={timeToHide}
              onChange={(e) => setTimeToHide(e.target.value)}
              style={{ margin: "10px 0" }}
            />

            <Button
              variant="contained"
              component="label"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Upload Secret Message (Image)
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setSecretMessage(e.target.files[0])}
              />
            </Button>
            {secretMessage && (
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Selected File: {secretMessage.name}
              </Typography>
            )}

            <Box display="flex" justifyContent="center" marginTop="20px">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!userName || !timeToHide || !secretMessage}
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
            </Box>
          </>
        )}

        {step === 4 && !isLoading && output && (
          <Box marginTop="20px" textAlign="center">
            <Typography variant="h5">Output:</Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {output}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RunModelPage;
