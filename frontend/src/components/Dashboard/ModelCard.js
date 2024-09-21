import React from 'react';
import { Paper, Typography } from '@mui/material';

const ModelCard = ({ model, onSelect, isSelected }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        cursor: 'pointer',
        border: isSelected ? '2px solid #1976d2' : '1px solid #424242',
        backgroundColor: isSelected ? '#1e88e5' : '#424242',
        color: '#fff',
        transition: 'transform 0.2s',
      }}
      onClick={() => onSelect(model)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Typography variant="h6" gutterBottom>
        {model.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {model.description}
      </Typography>
    </Paper>
  );
};

export default ModelCard;
