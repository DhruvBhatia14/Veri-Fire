import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import { Button, Container, Grid, Typography } from '@mui/material';

function AlertsList() {
    const [alerts, setAlerts] = useState([]);
    const [publicUrl, setPublicUrl] = useState('');

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alerts');
                const data = response.data;
                console.log('Heyyyy', data);
                if (data.length > 0) {
                    setAlerts(data[0].data);
                    setPublicUrl(data[0].publicUrl);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAlerts();
    }, []);

    // Create a single card content
    const cardContent = alerts.map((alert, index) => (
        <Typography key={alert.Id} variant="body1" component="p" style={{ color: 'red' }}>
            {index + 1}. {alert.Message}
        </Typography>
    ));

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Card
                        title="Alerts Summary"
                        content={
                            <>
                                <Typography variant="body1" component="p"><strong>Source:</strong> 511 Alberta</Typography>
                                <Typography variant="body1" component="p"><strong>Sub-source:</strong> Alerts</Typography>
                                {cardContent}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '16px' }}
                                    onClick={() => window.open(publicUrl, '_blank')}
                                >
                                    Read Full Story
                                </Button>
                            </>
                        }
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default AlertsList;