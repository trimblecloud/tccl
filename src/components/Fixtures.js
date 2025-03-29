// components/Fixtures.js
import React from 'react';
import { 
  Typography, Accordion, AccordionSummary, AccordionDetails, 
  Box, Paper, useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Fixtures = () => {
  const theme = useTheme();
  const tournaments = [
    {
      name: 'Table Tennis(Doubles) Men/Women/Mixed',
      fixture: 'https://challonge.com/trimblecloud/tabletennis2025'
    },
    {
      name: 'Badminton(Doubles) Men/Women/Mixed',
      fixture: 'https://challonge.com/trimblecloud/badminton2025'
    },
    {
      name: 'Carrom',
      fixture: 'https://challonge.com/trimblecloud/carrom2025'
    },
    {
      name: 'Chess',
      fixture: 'https://challonge.com/trimblecloud/chess2025'
    }
  ];

  // Tournament frame component
  const TournamentFrame = ({ url }) => (
    <Box sx={{ width: '100%', height: '500px', mb: 2 }}>
      <iframe
        src={url}
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="auto"
        allowTransparency="true"
        title="Tournament Bracket"
      />
    </Box>
  );

  return (
    <Box>
      {/* Archives Section Header */}
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          mb: 2,
          color: theme.palette.text.primary
        }}
      >
        Archives
      </Typography>

      {/* Archive Section */}
      <Accordion 
        defaultExpanded={false}
        sx={{ 
          mb: 4,
          borderRadius: '8px',
          '&:first-of-type': { borderRadius: '8px' },
          '&:last-of-type': { borderRadius: '8px' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderRadius: '8px' }}
        >
          <Typography variant="h6">2023</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Badminton
            </Typography>
            <Box sx={{ width: '100%', height: '500px' }}>
              <iframe
                src="https://challonge.com/trimblecloud/module"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="auto"
                allowTransparency="true"
                title="Badminton Tournament 2023"
              />
            </Box>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Current Tournaments */}
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          mt: 2, 
          mb: 2,
          color: theme.palette.text.primary
        }}
      >
        2025
      </Typography>
      {tournaments.map((tournament, index) => (
        <Accordion 
          key={index} 
          sx={{ 
            mb: 2,
            borderRadius: '8px',
            '&:first-of-type': { borderRadius: '8px' },
            '&:last-of-type': { borderRadius: '8px' }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ borderRadius: '8px' }}
          >
            <Typography variant="h6">{tournament.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TournamentFrame url={tournament.fixture} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Fixtures;