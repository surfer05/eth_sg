import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ModelCard from './ModelCard';

const ModelGrid = ({ models, onModelSelect, selectedModel, isLoading }) => {
  if (isLoading) {
    return (
      <Box textAlign="center" marginTop="20px">
        <Typography>Loading models...</Typography>
      </Box>
    );
  }

  if (models.length === 0) {
    return (
      <Box textAlign="center" marginTop="20px">
        <Typography>No models found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {models.map((model) => (
        <Grid item xs={12} sm={6} md={4} key={model.id}>
          <ModelCard
            model={model}
            onSelect={onModelSelect}
            isSelected={selectedModel && selectedModel.id === model.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ModelGrid;
