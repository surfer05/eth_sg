import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, count, onChange }) => {
  return (
    <MuiPagination
      page={page}
      count={count}
      onChange={(event, value) => onChange(value)}
      color="primary"
      style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;
