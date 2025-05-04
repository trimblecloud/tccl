// components/Scores.js
import React from 'react';
import { 
  Typography, Box, Paper, useTheme
} from '@mui/material';
import DetailedScores from './DetailedScores';
import { EmojiEvents } from '@mui/icons-material';

// Import TCCL logo 
import tcclLogo from '../components/logo/trimble-cloud-championship-league-logo.png';

const Scores = () => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: { xs: '16px', sm: '24px' }, 
        borderRadius: '16px',
        background: theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 2
        }}>
          <img 
            src={tcclLogo} 
            alt="TCCL Logo" 
            style={{ 
              width: 48, 
              height: 48, 
              marginRight: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            sx={{ 
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Scores
            <EmojiEvents fontSize="large" color="primary" />
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          A comprehensive breakdown of all points earned by each house across all events
        </Typography>
      </Box>
      
      {/* Detailed Scores Table */}
      <DetailedScores 
        showButton={false} 
        initiallyOpen={true}
        containerSx={{ mb: 0 }}
      />
      
      {/* Scoring Legend */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Scoring Legend
        </Typography>        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>          {[
            { name: 'Winner', color: '#4CAF50', description: 'First place in any event' },
            { name: 'Runner-Up', color: '#9C27B0', description: 'Second place in any event' },
            { name: 'Mid-Level Participants', color: '#FF9800', description: 'Group Stage Runner, Semi-Final Participant, Semi-Final Runner' },
            { name: 'Participants', color: 'text.secondary', description: 'Round 1 and Group Stage Participation' }
          ].map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                flexGrow: 1,
                width: { xs: '100%', sm: '45%', md: '22%' },
                maxWidth: '240px',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Box 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: item.color, 
                  borderRadius: '50%',
                  mb: 2 
                }} 
              />
              <Typography variant="subtitle2" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Scores;
