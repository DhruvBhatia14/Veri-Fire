// components/SupportUs.js

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const SupportUs = () => {
    return (
        <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h4" gutterBottom>
                Support Us
            </Typography>
            {/* Add content for the Support Us page here */}
            <Typography variant="body1">
                Here you can provide information on how users can support your organization.
            </Typography>
        </Container>
    );
};

export default SupportUs;