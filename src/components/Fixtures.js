// components/Fixtures.js
import React, { useState } from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Paper, useTheme, styled, Grid, Fade, Grow, Chip,
  Card, CardContent, Divider, Avatar, Tabs, Tab
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CasinoIcon from '@mui/icons-material/Casino';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Styled components
const StyledAccordion = styled(Accordion)(({ theme, categoryColor }) => ({
  marginBottom: '16px',
  borderRadius: '16px !important',
  background: categoryColor ? 
    `linear-gradient(135deg, ${categoryColor[0]} 0%, ${categoryColor[1]} 100%)` :
    theme.palette.background.paper,
  color: categoryColor ? '#FFF' : theme.palette.text.primary,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s ease',
  overflow: 'hidden',
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: '16px',
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '12px 0 !important',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#FFF',
  }
}));

const TournamentDetailsCard = styled(Card)(({ theme, colorAccent }) => ({
  marginBottom: '16px',
  borderRadius: '12px',
  background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)',
  boxShadow: theme.shadows[3],
  borderLeft: `4px solid ${colorAccent || theme.palette.primary.main}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  }
}));

const TournamentIcon = styled(Avatar)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: '#FFFFFF',
  width: 40,
  height: 40,
}));

const StyledCategoryChip = styled(Chip)(({ theme }) => ({
  margin: '0 4px 4px 0',
  backgroundColor: theme.palette.mode === 'light' 
    ? 'rgba(0, 0, 0, 0.08)'
    : 'rgba(255, 255, 255, 0.15)',
  color: theme.palette.mode === 'light'
    ? theme.palette.text.primary
    : theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.12)'
      : 'rgba(255, 255, 255, 0.25)',
  }
}));

const Fixtures = () => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [currentDate] = useState(new Date()); // Get current date once when component mounts

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : null);
  };

  const handleEventChange = (event, newValue) => {
    setSelectedEvent(newValue);
  };
  
  // Helper function to parse date strings
  const parseEventDate = (dateStr) => {
    // Extract the date part (e.g., "22nd April 2025" from "22nd April 2025 (Tuesday)")
    const datePart = dateStr.split(' (')[0];
    
    // Extract day, month, and year
    const dayMatch = datePart.match(/(\d+)(st|nd|rd|th)/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
    
    const monthMatch = datePart.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
    const month = monthMatch ? new Date(Date.parse(monthMatch[1] + " 1, 2000")).getMonth() : 0;
    
    const yearMatch = datePart.match(/\d{4}/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : 2025;
    
    return new Date(year, month, day);
  };
  
  // Helper function to determine event status
  const determineEventStatus = (timings) => {
    if (!timings || timings.length === 0) return 'upcoming';
    
    // Get first and last day of the event
    const firstDay = parseEventDate(timings[0].date);
    const lastDay = parseEventDate(timings[timings.length - 1].date);
    
    // Add one day to last day to include the entire day
    lastDay.setDate(lastDay.getDate() + 1);
    
    if (currentDate > lastDay) return 'completed';
    if (currentDate >= firstDay && currentDate < lastDay) return 'active';
    return 'upcoming';
  };
  
  // All tournaments data combined
  const allTournaments = [     {
      id: 'badminton',
      name: 'Badminton (Doubles)',
      icon: <SportsTennisIcon />,
      color: '#2196F3', // Blue
      categories: ['Indoor', 'Sports'],
      description: 'Doubles tournament with men\'s, women\'s, and mixed categories.',
      venue: 'DB Jain College, Thoraipakkam',
      timings: [
        { 
          date: '15th May 2025 (Thursday)', 
          details: 'Men\'s and Women\'s Doubles',
          specificTimings: [
            { group: 'Men\'s Doubles', time: '4:00 PM - 5:30 PM' },
            { group: 'Women\'s Doubles', time: '5:30 PM - 7:00 PM' }
          ]
        },
        { 
          date: '16th May 2025 (Friday)', 
          details: 'Mixed Doubles and Finals',
          specificTimings: [
            { group: 'Mixed Doubles', time: '4:00 PM - 5:30 PM' },
            { group: 'All Finals', time: '5:30 PM - 7:00 PM' }
          ]
        },
      ],
      fixtures: [
        {
          title: 'Men\'s Doubles Tournament',
          url: 'https://challonge.com/tcclmensbadminton/module?theme=4779',
          notes: [
            'This bracket shows the Men\'s Doubles tournament matches and results.'
          ]
        },
        {
          title: 'Women\'s Doubles Tournament',
          url: 'https://challonge.com/tcclwomensbadminton/module?theme=4779',
          notes: [
            'This bracket shows the Women\'s Doubles tournament matches and results.'
          ]
        },
        {
          title: 'Mixed Doubles Tournament',
          url: 'https://challonge.com/tcclmixedbadminton/module?theme=4779',
          notes: [
            'This bracket shows the Mixed Doubles tournament matches and results.'
          ]
        }
      ]
    },{
      id: 'chess',
      name: 'Chess',
      icon: <ViewCompactIcon />,
      color: '#4CAF50', // Green
      categories: ['Indoor', 'Board Games'],
      description: 'Classic strategy board game with tournament format.',
      venue: '3rd Floor',
      timings: [
        { date: '28th April 2025 (Monday)', details: 'Round 1 and Round 2' },
        { date: '29th April 2025 (Tuesday)', details: 'Round 3 and Quarter-Finals' },
        { date: '30th April 2025 (Wednesday)', details: 'Semi-Finals and Finals' }
      ],
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/tccl_chess/module',
          notes: [
            'It is going to be a knockout format!',
          ]
        }
      ]
    },
    {
      id: 'carrom',
      name: 'Carrom',
      icon: <CasinoIcon />,
      color: '#FF9800', // Orange
      categories: ['Indoor', 'Board Games'],
      description: 'Indoor board game',
      venue: '3rd Floor Recreation Area',
      timings: [
        { date: '22nd April 2025 (Tuesday)', details: 'Group Stage Day 1' },
        { date: '23rd April 2025 (Wednesday)', details: 'Group Stage Day 2' },
        { date: '24th April 2025 (Thursday)', details: 'Quarter-Finals' },
        { date: '25th April 2025 (Friday)', details: 'Semi-Finals and Finals 🏆' },
      ],
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/TCCL_CARROM/module',
          notes: [
            'it is going to be a knockout format!'
          ]
        }
      ]
    },    {
      id: 'table-tennis',
      name: 'Table Tennis',
      icon: <SportsTennisIcon />,
      color: '#E91E63', // Pink
      categories: ['Indoor', 'Sports'],
      description: 'Teams are divided into 6 groups. Each group has 3 teams. Top team from each group advances to Semifinal League.',
      venue: '5th Floor TT Play Area',
      timings: [
        { 
          date: '2nd April 2025 (Wednesday)', 
          details: 'Group Stage for Groups A, B, and C',
          specificTimings: [
            { group: 'Group A', time: '4:00 PM' },
            { group: 'Group B', time: '4:30 PM' },
            { group: 'Group C', time: '5:15 PM' }
          ]
        },
        { date: '3rd April 2025 (Thursday)', details: 'Group Stage for Groups D, E, and F' },
        { date: '4th April 2025 (Friday)', details: 'Semi-Final League and the Finals 🏆' },
      ],
      fixtures: [
        {
          title: 'Group League',
          url: 'https://challonge.com/Tccl_TT/module',
          notes: [
            'Each team plays against each other in their group.',
            'In case of a tie, the team winning with highest point difference will advance.'
          ],
          additionalNotes: [
            'Ignore "Final Stage" in below bracket. You will find another bracket for the Semifinal league below',
            'Click on "Matches" in below bracket'
          ]
        },
        {
          title: 'Semifinal League',
          url: 'https://challonge.com/Tccl_TT_Finals/module',
          notes: []
        }
      ]
    },    {
      id: 'cricket',
      name: 'Cricket',
      icon: <SportsCricketIcon />,
      color: '#673AB7', // Purple
      categories: ['Outdoor', 'Sports', 'Team'],
      description: 'Cricket tournament between house teams.',
      venue: 'Kovilambaakam Whitefield Cricket Ground',
      timings: [
        { date: '13th June 2025 (Friday)', details: 'All matches from 3:00 PM to 9:30 PM' },
      ],
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/trimblecloud/cricket2025/module',
          notes: [
            'Rules TBD',
          ]
        }
      ]
    }
  ];

  // Tournament frame component
  const TournamentFrame = ({ url }) => (
    <Box sx={{ width: '100%', height: '500px', mb: 2, borderRadius: '8px', overflow: 'hidden' }}>
      <iframe
        src={url}
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="auto"
        allowTransparency="true"
        title="Tournament Bracket"
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );

  // Render tournament fixtures
  const renderTournamentFixtures = (tournament) => (
    <Box>
      {/* Categories */}      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap' }}>
        {tournament.categories.map((category, idx) => (
          <StyledCategoryChip key={idx} label={category} size="small" />
        ))}
        {(() => {
          const status = determineEventStatus(tournament.timings);
          return (
            <StyledCategoryChip 
              label={status === 'completed' ? 'Completed' : status === 'active' ? 'Active' : 'Upcoming'} 
              size="small"
              color={status === 'completed' ? 'success' : status === 'active' ? 'warning' : 'primary'}
            />
          );
        })()}
      </Box>

      <Typography variant="h6" gutterBottom sx={{ 
        mb: 3,
        color: theme.palette.mode === 'light' ? tournament.color : theme.palette.primary.light
      }}>
        {tournament.description}
      </Typography>      {/* Match Timings Section */}
      {tournament.timings && tournament.timings.length > 0 && (
        <Box sx={{ mb: 4 }}>
          {/* Venue Section */}
          {tournament.venue && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme.palette.mode === 'light' ? tournament.color : theme.palette.primary.light
              }}>
                🎯 Venue:
              </Typography>
              <Paper elevation={2} sx={{ 
                p: 2, 
                mb: 3,
                borderRadius: '12px',
                background: theme.palette.mode === 'light' 
                  ? 'linear-gradient(145deg, #ffffff, #f5f5f5)' 
                  : 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                  }}
                >
                  ✅ {tournament.venue}
                </Typography>
              </Paper>
            </Box>
          )}
          
          {/* Tournament Brackets - Moved below venue section */}
          {tournament.fixtures.map((fixture, idx) => (
            <Box key={`fixture-${idx}`} sx={{ mb: 5 }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: theme.palette.mode === 'light' ? tournament.color : theme.palette.primary.light
                }}
              >
                🏆 {fixture.title}:
              </Typography>
              
              {fixture.notes && fixture.notes.length > 0 && (
                <Paper elevation={0} sx={{ 
                  p: 2, 
                  mb: 2, 
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'inherit'
                }}>
                  <Typography variant="body2" component="div">
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                      {fixture.notes.filter(note => note).map((note, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{note}</li>
                      ))}
                    </ul>
                  </Typography>
                  
                  {fixture.additionalNotes && fixture.additionalNotes.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Note:
                      </Typography>
                      <Typography variant="body2" component="div">
                        <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                          {fixture.additionalNotes.map((note, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{note}</li>
                          ))}
                        </ul>
                      </Typography>
                    </>
                  )}
                </Paper>
              )}
              
              <Grow in={true} timeout={800}>
                <Box sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: theme.shadows[4], mb: 3 }}>
                  <TournamentFrame url={fixture.url} />
                </Box>
              </Grow>
            </Box>
          ))}

          <Typography variant="h6" gutterBottom sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.mode === 'light' ? tournament.color : theme.palette.primary.light
          }}>
            🚀 Match Timings:
          </Typography>

          <Paper elevation={2} sx={{ 
            p: 2, 
            mb: 3,
            borderRadius: '12px',
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(145deg, #ffffff, #f5f5f5)' 
              : 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tournament.timings.map((timing, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2 },
                    padding: 1,
                    borderRadius: '8px',
                    bgcolor: theme.palette.mode === 'light'
                      ? (idx % 2 === 0 ? 'rgba(0, 0, 0, 0.03)' : 'transparent')
                      : (idx % 2 === 0 ? 'rgba(255, 255, 255, 0.03)' : 'transparent'),
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.06)'
                        : 'rgba(255, 255, 255, 0.06)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      minWidth: { xs: '100%', sm: '200px' }
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      fontWeight="bold"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.mode === 'light' 
                          ? tournament.color 
                          : theme.palette.primary.light
                      }}
                    >
                      ✅ {timing.date}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: timing.specificTimings ? 1 : 0,
                        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                      }}
                    >
                      {timing.details}
                    </Typography>
                    
                    {/* Specific timings for each group if available */}
                    {timing.specificTimings && timing.specificTimings.length > 0 && (
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 1,
                        ml: { xs: 0, sm: 2 },
                        mt: 1,
                        p: 1,
                        borderLeft: '3px solid',
                        borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
                        borderRadius: '0 8px 8px 0',
                      }}>
                        {timing.specificTimings.map((specificTiming, timeIdx) => (
                          <Box 
                            key={timeIdx}
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <Typography 
                              variant="body2" 
                              fontWeight="medium"
                              sx={{ 
                                minWidth: '80px',
                                color: theme.palette.mode === 'light' ? tournament.color : theme.palette.primary.light,
                              }}
                            >
                              ✅ {specificTiming.group}
                            </Typography>
                            <Typography 
                              variant="body2"
                              sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}
                            >
                              → {specificTiming.time}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}      {/* Tournament Fixtures */}
      
      
      
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ 
      padding: { xs: '16px', sm: '20px' }, 
      borderRadius: '16px',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' 
        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textAlign: 'center', 
            mb: 3
          }}
        >
          Tournament Fixtures
        </Typography>
        
        {/* Event Tabs */}
        <Tabs 
          value={selectedEvent}
          onChange={handleEventChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            width: '100%',
            mb: 3,
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'flex-start', md: 'center' }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3
            },
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: { xs: 1, sm: 2 },
              py: 1.5,
              mx: 0.5,
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }
          }}
        >
          {allTournaments.map((tournament, index) => (
            <Tab 
              key={tournament.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 26, 
                      height: 26, 
                      mr: 1,
                      bgcolor: tournament.color
                    }}
                  >
                    {tournament.icon}
                  </Avatar>
                  <Typography sx={{ fontWeight: selectedEvent === index ? 'bold' : 'normal' }}>
                    {tournament.name}
                  </Typography>
                </Box>
              }
              sx={{
                opacity: selectedEvent === index ? 1 : 0.7,
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit'
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Display current tournament content */}
      <Box sx={{ px: { xs: 0, sm: 2 } }}>
        {allTournaments.map((tournament, index) => (
          <Box
            key={tournament.id}
            sx={{ display: selectedEvent === index ? 'block' : 'none' }}
          >
            <Fade in={selectedEvent === index} timeout={500}>
              <Box>                {(() => {
                  const status = determineEventStatus(tournament.timings);
                  const statusColors = {
                    completed: {
                      bg: theme.palette.mode === 'light' ? 'rgba(102, 187, 106, 0.1)' : 'rgba(102, 187, 106, 0.2)',
                      border: theme.palette.mode === 'light' ? 'rgba(102, 187, 106, 0.3)' : 'rgba(102, 187, 106, 0.4)',
                      text: '#4CAF50'
                    },
                    active: {
                      bg: theme.palette.mode === 'light' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 152, 0, 0.2)',
                      border: theme.palette.mode === 'light' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(255, 152, 0, 0.4)',
                      text: '#FF9800'
                    },
                    upcoming: {
                      bg: theme.palette.mode === 'light' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.2)',
                      border: theme.palette.mode === 'light' ? 'rgba(33, 150, 243, 0.3)' : 'rgba(33, 150, 243, 0.4)',
                      text: '#2196F3'
                    }
                  };
                  
                  return (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2, 
                        mb: 3,
                        p: 2,
                        borderRadius: '12px',
                        bgcolor: statusColors[status].bg,
                        border: '1px solid',
                        borderColor: statusColors[status].border,
                      }}
                    >
                      <TournamentIcon color={tournament.color}>
                        {tournament.icon}
                      </TournamentIcon>
                      <Box>
                        <Typography 
                          variant="h5" 
                          fontWeight="bold"
                          sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'inherit' }}
                        >
                          {tournament.name}
                        </Typography>                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'light' ? statusColors[status].text : 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 'medium',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          {status === 'completed' ? '✓' : status === 'active' ? '⚡' : '🕒'} 
                          Status: {status === 'completed' ? 'Completed' : status === 'active' ? 'In Progress' : 'Upcoming'}
                          {status === 'active' && (
                            <Chip 
                              label="HAPPENING NOW" 
                              size="small" 
                              color="warning" 
                              sx={{ ml: 1, height: 20, fontSize: '0.6rem' }}
                            />
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })()}
                {renderTournamentFixtures(tournament)}
              </Box>
            </Fade>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Fixtures;