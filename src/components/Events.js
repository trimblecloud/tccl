// components/Events.js
import React from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Chip, Grid, Card, CardContent, Divider, Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Events = () => {
  // Format date to add day of week
  const formatDateWithDay = (dateStr) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr.replace(/-/g, ' '));
    const dayOfWeek = days[date.getDay()];
    return `${dayOfWeek}, ${dateStr}`;
  };

  const upcomingEvents = [
    { 
      name: 'Table Tennis(Doubles) Men/Women/Mixed', 
      dates: ['02-April-2025', '03-April-2025', '04-April-2025'], 
      time: '16:30-18:30' 
    },
    { 
      name: 'Badminton(Doubles) Men/Women/Mixed', 
      dates: ['11-April-2025', '12-April-2025'], 
      time: '16:00-19:00' 
    },
    { 
      name: 'Carrom', 
      dates: ['16-April-2025', '17-April-2025'], 
      time: '16:30-18:30' 
    },
    { 
      name: 'Cards Tower', 
      dates: ['23-April-2025'], 
      time: '16:00-17:00' 
    },
    { 
      name: 'Chess', 
      dates: ['24-April-2025', '25-April-2025'], 
      time: '16:00-18:00' 
    },
    { 
      name: 'Football', 
      dates: ['26-April-2025', '27-April-2025'], 
      time: '07:00-11:00' 
    },
    { 
      name: 'Build your Logo', 
      dates: ['30-April-2025'], 
      time: '16:00-17:00' 
    },
    { 
      name: 'Cricket', 
      dates: ['03-May-2025', '04-May-2025'], 
      time: '07:00-11:00' 
    },
    { 
      name: 'Tug of war', 
      dates: ['07-May-2025'], 
      time: '16:00-17:00' 
    },
  ];

  const endedEvents = [
    { 
      name: 'Bet Your Brain', 
      dates: ['21-March-2025'], 
      time: '16:00' 
    },
  ];

  // Check if the event is upcoming or past
  const isUpcoming = (dateStr) => {
    const today = new Date();
    const eventDate = new Date(dateStr.replace(/-/g, ' '));
    return eventDate > today;
  };

  // Custom event card component
  const EventCard = ({ event }) => (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%',
        borderRadius: '10px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Event Title */}
        <Typography variant="h6" gutterBottom sx={{ 
          minHeight: '3.6em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {event.name}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Date Section - Directly after title */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Date{event.dates.length > 1 ? 's' : ''}:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {event.dates.map((date, idx) => (
              <Chip 
                key={idx}
                icon={<CalendarTodayIcon />} 
                label={formatDateWithDay(date)} 
                color={isUpcoming(date) ? "primary" : "default"}
                variant="outlined"
                size="medium"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
        
        {/* Time Section */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Time:
          </Typography>
          <Chip 
            icon={<AccessTimeIcon />} 
            label={event.time} 
            color="secondary" 
            variant="outlined"
            size="medium"
          />
        </Box>
        
        {/* Spacer to push content to the top */}
        <Box sx={{ flexGrow: 1 }} />
      </CardContent>
    </Card>
  );

  // Create grid of event cards 
  const EventGrid = ({ events }) => (
    <Grid container spacing={2}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Accordion defaultExpanded={true} sx={{ borderRadius: '8px' }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          sx={{ borderRadius: '8px' }}
        >
          <Typography variant="h6">Upcoming Events</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '16px' }}>
          <EventGrid events={upcomingEvents} />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false} sx={{ marginTop: '20px', borderRadius: '8px' }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          sx={{ borderRadius: '8px' }}
        >
          <Typography variant="h6">Previous Events</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '16px' }}>
          <EventGrid events={endedEvents} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Events;