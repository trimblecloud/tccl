// components/Events.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Events = () => {
  const upcomingEvents = [
    { name: 'Football Match', date: '2024-12-10', time: '14:00' },
    { name: 'Quiz Competition', date: '2024-12-15', time: '10:00' },
    { name: 'Volleyball Tournament', date: '2024-12-20', time: '16:00' },
  ];

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        {upcomingEvents.map((event, index) => (
          <ListItem key={index}>
            <ListItemText primary={event.name} secondary={`Date: ${event.date}, Time: ${event.time}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Events;