// components/Fixtures.js
import React, { useState } from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Paper, useTheme, styled, Grid, Fade, Grow, Chip,
  Card, CardContent, Divider, Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
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

const Fixtures = () => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : null);
  };
  
  // Define tournament categories with colors and icons
  const tournamentCategories = {
    completed: {
      title: 'Indoor',
      colorGradient: ['#4A148C', '#7B1FA2'], // Purple gradient
      icon: <SportsTennisIcon />
    },
    upcoming: {
      title: 'Upcoming Tournaments',
      colorGradient: ['#FFEB3B', '#FF9800'], // Yellow-orange gradient (Yellow Sparks theme)
      icon: <SportsCricketIcon />
    }
  };
  
  // Completed tournaments
  const completedTournaments = [
    {
      id: 'table-tennis',
      name: 'Table Tennis',
      icon: <SportsTennisIcon />,
      color: '#E91E63', // Pink
      description: 'Teams are divided into 6 groups. Each group has 3 teams. Top team from each group advances to Semifinal League.',
      venue: '5th Floor TT Play Area',
      timings: [
        { 
          date: '2nd April 2025 (Wednesday)', 
          details: 'Group Stage for Groups A, B, and C',
          specificTimings: [
            { group: 'Group A', time: '4:00 PM sharp' },
            { group: 'Group B', time: '4:30 PM sharp' },
            { group: 'Group C', time: '5:15 PM sharp' }
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
    }
  ];

  // Upcoming tournaments
  const upcomingTournaments = [
    {
      id: 'badminton',
      name: 'Badminton (Doubles) Men/Women/Mixed',
      icon: <DirectionsRunIcon />,
      color: '#2196F3', // Blue
      description: 'Doubles tournament with men\'s, women\'s, and mixed categories.',
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/trimblecloud/badminton2025',
          notes: []
        }
      ]
    },
    {
      id: 'carrom',
      name: 'Carrom',
      icon: <SportsEsportsIcon />,
      color: '#FF9800', // Orange
      description: 'Indoor board game with singles and doubles categories.',
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/trimblecloud/carrom2025',
          notes: []
        }
      ]
    },
    {
      id: 'chess',
      name: 'Chess',
      icon: <SportsEsportsIcon />,
      color: '#4CAF50', // Green
      description: 'Classic strategy board game with tournament format.',
      fixtures: [
        {
          title: 'Tournament Bracket',
          url: 'https://challonge.com/trimblecloud/chess2025',
          notes: []
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
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {tournament.description}
      </Typography>

      {/* Match Timings Section */}
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
                  }}
                >
                  ✅ {tournament.venue}
                </Typography>
              </Paper>
            </Box>
          )}

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
                    bgcolor: idx % 2 === 0 
                      ? 'rgba(0, 0, 0, 0.03)' 
                      : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.06)'
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
                    <Typography variant="body1" sx={{ mb: timing.specificTimings ? 1 : 0 }}>
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
                            <Typography variant="body2">
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
      )}

      {tournament.fixtures.map((fixture, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {fixture.title}
          </Typography>

          {fixture.notes.length > 0 && (
            <Paper elevation={0} sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.05)',
              borderRadius: '8px' 
            }}>
              <Typography variant="body2" color="text.secondary" component="div">
                <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                  {fixture.notes.map((note, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{note}</li>
                  ))}
                </ul>
              </Typography>
              
              {fixture.additionalNotes && fixture.additionalNotes.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Note:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div">
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
            <Box sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: theme.shadows[4] }}>
              <TournamentFrame url={fixture.url} />
            </Box>
          </Grow>
        </Box>
      ))}
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ 
      padding: '20px', 
      borderRadius: '16px',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' 
        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    }}>
      <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 3 }}>
        Tournament Fixtures
      </Typography>


      
      {/* Completed Tournaments Section */}
      <Box sx={{ mb: 4 }}>
        <StyledAccordion 
          expanded={expandedSection === 'completed'}
          onChange={handleAccordionChange('completed')}
          categoryColor={tournamentCategories.completed.colorGradient}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <TournamentIcon color={tournamentCategories.completed.colorGradient[0]}>
              {tournamentCategories.completed.icon}
            </TournamentIcon>
            <Typography variant="h6" fontWeight="bold">
              {tournamentCategories.completed.title}
            </Typography>
          </StyledAccordionSummary>
          <AccordionDetails sx={{ 
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)',
            color: theme.palette.mode === 'light' ? 'text.primary' : 'text.primary',
            padding: '24px'
          }}>
            <Box>
              {completedTournaments.map((tournament, index) => (
                <Fade key={tournament.id} in={true} timeout={800} style={{ transitionDelay: `${index * 150}ms` }}>
                  <Box sx={{ mb: index !== completedTournaments.length - 1 ? 4 : 0 }}>
                    <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                      <TournamentIcon color={tournament.color}>
                        {tournament.icon}
                      </TournamentIcon>
                      <Typography variant="h6" fontWeight="bold">
                        {tournament.name}
                      </Typography>
                    </Box>
                    {renderTournamentFixtures(tournament)}
                  </Box>
                </Fade>
              ))}
            </Box>
          </AccordionDetails>
        </StyledAccordion>
      </Box>

      
    </Paper>
  );
};

export default Fixtures;