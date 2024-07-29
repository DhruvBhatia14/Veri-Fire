import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const News = () => {
    const [newsData, setNewsData] = useState({ bbc: [], cbc: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from both BBC and CBC APIs
                const [bbcResponse, cbcResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/headlines'),
                    axios.get('http://localhost:5000/api/cbc-data')
                ]);

                // Parse and set BBC data
                const bbcData = JSON.parse(bbcResponse.data.body);
                // Parse and set CBC data
                const cbcData = JSON.parse(cbcResponse.data.body);

                setNewsData({ bbc: bbcData, cbc: cbcData });
            } catch (error) {
                console.error('Error fetching news data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Paper style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Paper>
        );
    }

    // Helper function to truncate text
    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6">News Alerts</Typography>

            <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                BBC News
            </Typography>
            <List>
                {newsData.bbc.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={truncateText(item.summary, 200)}
                            secondary={
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
                                    </Button>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                CBC News
            </Typography>
            <List>
                {newsData.cbc.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={truncateText(item.summary, 200)}
                            secondary={
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
                                    </Button>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default News;