// components/Events.js
import React, { useState, useEffect } from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Chip, Grid, Card, CardContent, Divider, Stack, Paper,
  useTheme, Badge, Tooltip, Tab, Tabs, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { motion } from 'framer-motion';

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
  borderRadius: '12px',
  backgroundColor: isPast 
    ? theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 30, 30, 0.7)'
    : theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(50, 50, 50, 0.9)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: isPast 
    ? theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'
    : theme.palette.mode === 'light' ? 'rgba(255,152,0,0.3)' : 'rgba(255,152,0,0.2)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

// Status badge for events
const StatusBadge = styled(Badge)(({ theme, status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: status === 'completed' 
      ? '#4caf50' 
      : status === 'active' 
        ? '#ff9800'
        : '#2196f3',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.7rem',
    padding: '0 8px',
    minWidth: '16px',
    height: '16px',
  }
}));

const getCurrentDate = () => {
  return new Date();
};

const Events = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');
  const today = getCurrentDate();
  
  // Format dates for display
  const formatDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    return `${day}-${month}-${year}`;
  };

  // Parse date strings into Date objects
  const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
  };

  // Check event status
  const getEventStatus = (startDateStr, endDateStr) => {
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    
    if (today > endDate) return 'completed';
    if (today >= startDate && today <= endDate) return 'active';
    return 'upcoming';
  };
  
  // Format date ranges for display
  const formatDateRange = (startDateStr, endDateStr) => {
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    
    if (startDateStr === endDateStr) {
      return startDate.toLocaleDateString('en-US', options);
    } else {
      const startFormatted = startDate.toLocaleDateString('en-US', options);
      const endFormatted = endDate.toLocaleDateString('en-US', options);
      return `${startFormatted} - ${endFormatted}`;
    }
  };

  // Events data from the provided information
  const events = [
    { 
      name: 'Bet Your Brain', 
      startDate: '3/20/2025',
      endDate: '3/20/2025',
      dayInfo: 'Thursday',
      time: '4:00 - 5:00 PM',
      details: 'Test your knowledge in this exciting brain challenge!',
      categories: ['Indoor']
    },
    { 
      name: 'Table Tennis (Doubles) - Mixed/Men/Women',
      startDate: '4/2/2025',
      endDate: '4/4/2025',
      dayInfo: '3 days (Wed, Thurs, Fri)',
      time: '4:30 - 6:30 PM',
      details: 'Doubles tournament with separate categories for men, women and mixed teams.',
      categories: ['Indoor', 'Sports']
    },
    { 
      name: 'Carrom',
      startDate: '4/22/2025',
      endDate: '4/24/2025',
      dayInfo: '4 days (Tues - Fri)',
      time: '4:30 - 6:30 PM',
      details: 'Show your skills in this popular board game.',
      categories: ['Indoor', 'Board Game']
    },
    { 
      name: 'Chess',
      startDate: '4/28/2025',
      endDate: '4/30/2025',
      dayInfo: '4 Days (Thurs - Tues)',
      time: '4:00 - 6:00 PM',
      details: 'Strategic chess tournament for all skill levels.',
      categories: ['Indoor', 'Board Game']
    },
    { 
      name: 'Build your Logo',
      startDate: '5/07/2025',
      endDate: '5/07/2025',
      dayInfo: 'Wednesday',
      time: '4:00 - 5:00 PM',
      details: 'Creative competition to design and build team logos.',
      categories: ['Creative', 'Indoor']
    },
    { 
      name: 'Cards Tower',
      startDate: '4/30/2025',
      endDate: '4/30/2025',
      dayInfo: 'Wednesday',
      time: '4:00 - 5:00 PM',
      details: 'Build the highest card tower in this women-only precision challenge.',
      categories: ['Indoor', 'Skill']
    },
    { 
      name: 'Tug of war',
      startDate: '5/14/2025',
      endDate: '5/14/2025',
      dayInfo: 'Wednesday',
      time: '4:00 - 5:00 PM',
      details: 'Show your team strength in this classic tug of war competition.',
      categories: ['Team', 'Outdoor']
    },
    { 
      name: 'Badminton (Doubles) - Men/Women/Mixed',
      startDate: '5/15/2025',
      endDate: '5/16/2025',
      dayInfo: '2 days (Men - Thurs, Women - Thurs, Mixed - Fri)',
      time: '4:00 - 7:00 PM',
      details: 'Badminton doubles tournament with men\'s, women\'s, and mixed categories.',
      categories: ['Indoor', 'Sports']
    },
    { 
      name: 'Cricket',
      startDate: '5/10/2025',
      endDate: '5/10/2025',
      dayInfo: 'Saturday',
      time: '6:00 - 11:00 AM',
      details: 'Morning cricket tournament between house teams.',
      categories: ['Outdoor', 'Sports']
    },
    { 
      name: 'Football',
      startDate: '5/17/2025',
      endDate: '5/17/2025',
      dayInfo: 'Saturday',
      time: '7:00 - 11:00 AM',
      details: 'Morning football tournament between house teams.',
      categories: ['Outdoor', 'Sports']
    }
  ];

  // Add status to each event
  const eventsWithStatus = events.map(event => {
    const status = getEventStatus(event.startDate, event.endDate);
    return { ...event, status };
  });

  // Sort events by date (ongoing first, then upcoming, then completed)
  const sortedEvents = [...eventsWithStatus].sort((a, b) => {
    // First sort by status priority: active > upcoming > completed
    const statusPriority = { active: 0, upcoming: 1, completed: 2 };
    if (statusPriority[a.status] !== statusPriority[b.status]) {
      return statusPriority[a.status] - statusPriority[b.status];
    }
    // Then by start date
    return parseDate(a.startDate) - parseDate(b.startDate);
  });

  // Filter events based on selected tab
  const filteredEvents = filter === 'all' 
    ? sortedEvents 
    : sortedEvents.filter(event => event.status === filter);

  // Event card component
  const EventCard = ({ event }) => {
    const isPast = event.status === 'completed';
    const isActive = event.status === 'active';
    
    // Status colors and text
    const statusConfig = {
      completed: {
        icon: <CheckCircleIcon fontSize="small" />,
        color: '#4caf50',
        text: 'Completed'
      },
      active: {
        icon: <PendingIcon fontSize="small" />,
        color: '#ff9800',
        text: 'Ongoing'
      },
      upcoming: {
        icon: <DateRangeIcon fontSize="small" />,
        color: '#2196f3',
        text: 'Upcoming'
      }
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StyledEventCard isPast={isPast}>
          <CardContent sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            p: 2.5,
            position: 'relative'
          }}>
            {/* Status Badge */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: statusConfig[event.status].color + '22',
                color: statusConfig[event.status].color,
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
              }}
            >
              {statusConfig[event.status].icon}
              <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                {statusConfig[event.status].text}
              </Typography>
            </Box>
              {/* Event Title */}
            <Typography variant="h6" gutterBottom sx={{ 
              fontSize: '1.1rem',
              fontWeight: 'bold',
              mb: 2,
              mt: 0.5,
              pr: 8, // Add right padding to prevent overlap with the status badge
              color: isPast 
                ? (theme.palette.mode === 'light' ? '#777' : 'rgba(255, 255, 255, 0.6)')
                : (theme.palette.mode === 'light' 
                  ? theme.palette.primary.main 
                  : theme.palette.primary.light)
            }}>
              {event.name}
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
              {/* Date Range */}
            <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'flex-start' }}>
              <CalendarTodayIcon fontSize="small" sx={{ 
                mr: 1, 
                mt: 0.3, 
                color: isPast 
                  ? (theme.palette.mode === 'light' ? '#777' : 'rgba(255, 255, 255, 0.6)') 
                  : (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light)
              }} />
              <Box>
                <Typography variant="body2" sx={{ 
                  fontWeight: 'medium',
                  color: theme.palette.mode === 'dark' && !isPast ? 'rgba(255, 255, 255, 0.9)' : undefined
                }}>
                  {formatDateRange(event.startDate, event.endDate)}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.mode === 'dark' 
                    ? (isPast ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.7)')
                    : theme.palette.text.secondary
                }}>
                  {event.dayInfo}
                </Typography>
              </Box>
            </Box>
            
            {/* Time */}
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <AccessTimeIcon fontSize="small" sx={{ 
                mr: 1, 
                color: isPast 
                  ? (theme.palette.mode === 'light' ? '#777' : 'rgba(255, 255, 255, 0.6)') 
                  : (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light)
              }} />
              <Typography variant="body2" sx={{ 
                fontWeight: 'medium',
                color: theme.palette.mode === 'dark' && !isPast ? 'rgba(255, 255, 255, 0.9)' : undefined
              }}>
                {event.time}
              </Typography>
            </Box>
              {/* Categories */}
            <Box sx={{ mt: 'auto', pt: 1 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {event.categories.map((category, i) => (
                  <Chip 
                    key={i} 
                    label={category} 
                    size="small"
                    sx={{ 
                      opacity: isPast ? 0.7 : 1,
                      backgroundColor: theme.palette.mode === 'light'
                        ? (isPast ? '#e0e0e0' : '#ffecb3')
                        : (isPast ? 'rgba(66, 66, 66, 0.8)' : 'rgba(255, 193, 7, 0.2)'),
                      color: theme.palette.mode === 'light'
                        ? 'text.primary'
                        : (isPast ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 193, 7, 0.9)'),
                      borderColor: theme.palette.mode === 'dark' && !isPast
                        ? 'rgba(255, 193, 7, 0.3)'
                        : 'transparent',
                      border: theme.palette.mode === 'dark' ? '1px solid' : 'none'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </StyledEventCard>
      </motion.div>
    );
  };

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setFilter(newValue);
  };

  // Get counts for each category
  const activeEventsCount = sortedEvents.filter(e => e.status === 'active').length;
  const upcomingEventsCount = sortedEvents.filter(e => e.status === 'upcoming').length;
  const completedEventsCount = sortedEvents.filter(e => e.status === 'completed').length;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: { xs: '16px', sm: '24px' }, 
        borderRadius: '16px',
        background: theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' 
          : 'linear-gradient(135deg, #212121 0%, #424242 100%)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textAlign: 'center',
            mb: 1
          }}
        >
          Tournament Events
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 3 }}>
          View all scheduled events for the workplace tournament. Filter by ongoing, upcoming, or completed events.
        </Typography>
          {/* Filter Tabs */}
        <Tabs 
          value={filter} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          orientation={window.innerWidth < 600 ? "vertical" : "horizontal"}
          sx={{ 
            mb: 3,
            width: '100%',
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: { xs: 1.5, sm: 3 },
              py: 1,
              mx: { xs: 0, sm: 0.5 },
              my: { xs: 0.5, sm: 0 },
              justifyContent: { xs: 'flex-start', sm: 'center' },
              borderRadius: { xs: '8px', sm: '4px' },
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            },
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
                justifyContent: { xs: 'space-between', sm: 'center' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEventsIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                  <span>All Events</span>
                </Box>
                <Chip 
                  label={sortedEvents.length} 
                  size="small" 
                  sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.75rem' }}
                />
              </Box>
            } 
            value="all" 
          />
          <Tab 
            label={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                justifyContent: { xs: 'space-between', sm: 'center' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PendingIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#ff9800' }} />
                  <span>Ongoing</span>
                </Box>
                <Chip 
                  label={activeEventsCount} 
                  size="small" 
                  color="warning"
                  sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.75rem' }}
                />
              </Box>
            } 
            value="active" 
          />
          <Tab 
            label={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                justifyContent: { xs: 'space-between', sm: 'center' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DateRangeIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#2196f3' }} />
                  <span>Upcoming</span>
                </Box>
                <Chip 
                  label={upcomingEventsCount} 
                  size="small" 
                  color="primary"
                  sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.75rem' }}
                />
              </Box>
            } 
            value="upcoming" 
          />
          <Tab 
            label={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                justifyContent: { xs: 'space-between', sm: 'center' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#4caf50' }} />
                  <span>Completed</span>
                </Box>
                <Chip 
                  label={completedEventsCount} 
                  size="small" 
                  color="success"
                  sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.75rem' }}
                />
              </Box>
            } 
            value="completed" 
          />
        </Tabs>
      </Box>

      {/* Events Grid */}
      <Box sx={{ px: { xs: 0, sm: 1 } }}>
        {filteredEvents.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="textSecondary">No events found in this category</Typography>
          </Box>
        )}
      </Box>
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          Last updated: April 20, 2025
        </Typography>
      </Box>
    </Paper>
  );
};

export default Events;