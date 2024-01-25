import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({size = 30 }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size}/>
    </Box>
  );
}