// components/Events.js
import React from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Chip, Grid, Card, CardContent, Divider, Stack, Paper,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Styled components for events
const StyledAccordion = styled(Accordion)(({ theme, isUpcoming }) => ({
  borderRadius: '16px !important',
  marginBottom: '16px',
  background: isUpcoming
    ? 'linear-gradient(135deg, #FFEB3B 0%, #FF9800 100%)'
    : 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
  color: isUpcoming ? '#000' : '#FFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  '&::before': {
    display: 'none', // Remove the default accordion divider
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme, isUpcoming }) => ({
  borderRadius: '16px',
  '& .MuiAccordionSummary-content': {
    margin: '12px 0 !important',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: isUpcoming ? '#000' : '#FFF',
  }
}));

const StyledEventCard = styled(Card)(({ theme, isPast }) => ({
  height: '100%',
  borderRadius: '10px',
  backgroundColor: isPast 
    ? theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 30, 30, 0.7)'
    : theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(50, 50, 50, 0.9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  border: 'none',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const Events = () => {
  const theme = useTheme();

  // Format date to add day of week
  const formatDateWithDay = (dateStr) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr.replace(/-/g, ' '));
    const dayOfWeek = days[date.getDay()];
    return `${dayOfWeek}, ${dateStr}`;
  };

  // Check if the event is upcoming or past
  const isUpcoming = (dateStr) => {
    const today = new Date();
    const eventDate = new Date(dateStr.replace(/-/g, ' '));
    return eventDate > today;
  };

  const upcomingEvents = [
    { 
      name: 'Table Tennis(Doubles) Men/Women/Mixed', 
      dates: ['02-April-2025', '03-April-2025', '04-April-2025'], 
      time: '16:30-18:30' 
    },
    { 
      name: 'Badminton(Doubles) Men/Women/Mixed', 
      dates: ['TBD-April-2025', 'TDB-April-2025'], 
      time: '16:00-19:00' 
    },
    { 
      name: 'Carrom', 
      dates: ['TDB-April-2025', 'TDB-April-2025'], 
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

  // Custom event card component
  const EventCard = ({ event }) => {
    const isPast = !event.dates.some(date => isUpcoming(date));
    const cardTextColor = isPast 
      ? theme.palette.mode === 'light' ? '#000000' : '#FFFFFF'
      : theme.palette.mode === 'light' ? '#000000' : '#FFFFFF';
    
    return (
      <StyledEventCard isPast={isPast}>
        <CardContent sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          p: 3
        }}>
          {/* Event Title */}
          <Typography variant="h6" gutterBottom sx={{ 
            minHeight: '3.6em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            fontWeight: 'bold',
            color: theme.palette.mode === 'light' 
              ? isPast ? '#555' : theme.palette.primary.main 
              : isPast ? '#CCC' : theme.palette.primary.light
          }}>
            {event.name}
          </Typography>
          
          <Divider sx={{ 
            mb: 2, 
            backgroundColor: isPast 
              ? theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
              : theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
          }} />
          
          {/* Date Section */}
          <Box>
            <Typography variant="subtitle2" 
              sx={{ 
                mb: 0.5, 
                fontWeight: 'bold',
                color: theme.palette.mode === 'light'
                  ? 'text.primary'
                  : 'text.primary'
              }}
            >
              Date{event.dates.length > 1 ? 's' : ''}:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {event.dates.map((date, idx) => (
                <Chip 
                  key={idx}
                  icon={<CalendarTodayIcon />} 
                  label={formatDateWithDay(date)} 
                  color={isUpcoming(date) ? "primary" : "default"}
                  variant="filled"
                  size="medium"
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'medium',
                    backgroundColor: isUpcoming(date) 
                      ? 'rgba(255, 207, 80, 0.9)' 
                      : theme.palette.mode === 'light' 
                        ? 'rgba(180, 180, 180, 0.5)' 
                        : 'rgba(80, 80, 80, 0.7)',
                    color: isUpcoming(date) ? '#000' : theme.palette.mode === 'light' ? '#000' : '#fff',
                    '& .MuiChip-icon': {
                      color: 'inherit'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
          
          {/* Time Section */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" 
              sx={{ 
                mb: 0.5, 
                fontWeight: 'bold',
                color: theme.palette.mode === 'light'
                  ? 'text.primary'
                  : 'text.primary'
              }}
            >
              Time:
            </Typography>
            <Chip 
              icon={<AccessTimeIcon />} 
              label={event.time} 
              size="medium"
              sx={{ 
                fontWeight: 'medium',
                backgroundColor: isPast 
                  ? theme.palette.mode === 'light' ? 'rgba(123, 31, 162, 0.7)' : 'rgba(123, 31, 162, 0.7)'
                  : theme.palette.mode === 'light' ? '#4a148c' : '#7B1FA2',
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          </Box>
          
          {/* Spacer to push content to the top */}
          <Box sx={{ flexGrow: 1 }} />
        </CardContent>
      </StyledEventCard>
    );
  };

  // Create grid of event cards with animation
  const EventGrid = ({ events }) => (
    <Grid container spacing={3}>
      {events.map((event, index) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={index}
          sx={{
            transform: 'scale(0)',
            animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`,
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'scale(0.9)',
              },
              '100%': {
                opacity: 1,
                transform: 'scale(1)',
              },
            },
          }}
        >
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ padding: '20px', borderRadius: '16px' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Tournament Events
      </Typography>
      
      <StyledAccordion defaultExpanded={true} isUpcoming={true}>
        <StyledAccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          isUpcoming={true}
        >
          <Typography variant="h6" fontWeight="bold">Upcoming Events</Typography>
        </StyledAccordionSummary>
        <AccordionDetails sx={{ padding: '24px 16px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <EventGrid events={upcomingEvents} />
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion defaultExpanded={false} isUpcoming={false}>
        <StyledAccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          isUpcoming={false}
        >
          <Typography variant="h6" fontWeight="bold">Previous Events</Typography>
        </StyledAccordionSummary>
        <AccordionDetails sx={{ padding: '24px 16px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <EventGrid events={endedEvents} />
        </AccordionDetails>
      </StyledAccordion>
    </Paper>
  );
};

export default Events;