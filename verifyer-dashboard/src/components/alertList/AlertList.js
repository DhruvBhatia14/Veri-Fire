import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import { Button, Container, Grid, Typography } from '@mui/material';

function AlertsList() {
    const [alerts, setAlerts] = useState([]);
    const [publicUrl, setPublicUrl] = useState('');
    const [headlines, setHeadlines] = useState([]); // New state for headlines

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alerts');
                const data = response.data;
                console.log('Alerts:', data);
                if (data.length > 0) {
                    setAlerts(data[0].data);
                    setPublicUrl(data[0].publicUrl);
                }
            } catch (error) {
                console.error('Error fetching alerts:', error);
            }
        };

        const fetchHeadlines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/headlines');
                const data = JSON.parse(response.data.body); // Parsing the JSON string
                console.log('Headlines:', data);
                setHeadlines(data);
            } catch (error) {
                console.error('Error fetching headlines:', error);
            }
        };

        fetchAlerts();
        fetchHeadlines();
    }, []);

    // Create a single card content for alerts
    const alertContent = alerts.map((alert, index) => (
        <Typography key={alert.Id} variant="body1" component="p" style={{ color: 'red' }}>
            {index + 1}. {alert.Message}
        </Typography>
    ));

    // Create a single card content for headlines
    const headlineContent = headlines.map((headline, index) => (
        <Typography key={index} variant="body1" component="p">
            {index + 1}. <a href={headline.link} target="_blank" rel="noopener noreferrer">{headline.headline}</a>
            <br />
            <small>{headline.summary}</small>
        </Typography>
    ));

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card
                        title="Alerts Summary"
                        content={
                            <>
                                <Typography variant="body1" component="p"><strong>Source:</strong> 511 Alberta</Typography>
                                <Typography variant="body1" component="p"><strong>Sub-source:</strong> Alerts</Typography>
                                {alertContent}
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
                <Grid item xs={12} md={6}>
                    <Card
                        title="Latest Headlines from BBC"
                        content={headlineContent}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default AlertsList;