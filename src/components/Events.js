// components/Events.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Events = () => {
  const upcomingEvents = [
    { name: 'Table Tennis(Doubles) : Men/Women/Mixed', date: '02 to 04-04-2025', time: '16:30-18:30' },
    { name: 'Badminton(Doubles) : Men/Women/Mixed', date: '11 to 12-04-2025', time: '16:00-19:00' },
    { name: 'Carrom', date: '16 to 17-04-2025', time: '16:30-18:30' },
    { name: 'Cards Tower - Girls Only', date: '23-04-2025', time: '16:00-17:00' },
    { name: 'Chess', date: '24 to 25-04-2025', time: '16:00-18:00' },
    { name: 'Football', date: '26 to 27-04-2025', time: '07:00-11:00' },
    { name: 'Build your Logo', date: '30-04-2025', time: '16:00-17:00' },
    { name: 'Cricket', date: '03 to 04-05-2025', time: '07:00-11:00' },
    { name: 'Thug of war', date: '07-05-2025', time: '16:00-17:00' },
  ];

  const endedEvents = [
    { name: 'Bet Your Brain', date: '21-03-2025', time: '16:00' },
  ];

  return (
    <>
      <Accordion defaultExpanded={true} sx={{ borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderRadius: '8px' }}>
          <Typography variant="h6">Upcoming Events</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0 0 20px 0' }}>
          <Box sx={{ width: '100%' }}>
            <Paper elevation={3} sx={{ padding: '20px', width: '80%', margin: '0 auto' }}>
              <List>
                {upcomingEvents.map((event, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={event.name} secondary={`Date: ${event.date}, Time: ${event.time}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false} sx={{ marginTop: '20px', borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderRadius: '8px' }}>
          <Typography variant="h6">Previous Events</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0 0 20px 0' }}>
          <Box sx={{ width: '100%' }}>
            <Paper elevation={3} sx={{ padding: '20px', width: '80%', margin: '0 auto' }}>
              <List>
                {endedEvents.map((event, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={event.name} secondary={`Date: ${event.date}, Time: ${event.time}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Events;