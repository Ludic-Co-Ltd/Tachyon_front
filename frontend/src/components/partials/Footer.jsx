import React from 'react';
import { Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <div className="bg-white px-16" style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body2">
          Copyright {new Date().getFullYear()} Luxon Inc. All rights reserved.
        </Typography>
      </Toolbar>
    </div>
  );
};

export default Footer;
