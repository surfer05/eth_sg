import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

const ComputationSlider = ({ value, onChange }) => {
  return (
    <Box marginTop="20px">
      <Typography gutterBottom>
        Computation Percentage: {value}%
      </Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        aria-labelledby="computation-slider"
        valueLabelDisplay="auto"
        step={1}
        marks={[
          { value: 0, label: '0%' },
          { value: 50, label: '50%' },
          { value: 100, label: '100%' },
        ]}
        min={0}
        max={100}
        sx={{
          '& .MuiSlider-thumb': {
            transition: 'transform 0.3s ease-in-out',
          },
          '& .MuiSlider-thumb:hover': {
            transform: 'scale(1.2)',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#1976d2',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#424242',
          },
          '& .MuiSlider-markLabel': {
            color: '#fff',
          },
        }}
      />
    </Box>
  );
};

export default ComputationSlider;
