// components/Winners.js
import React, { useState } from 'react';
import { 
  Typography, Box, Paper, useTheme, styled, Grid, Avatar, Chip, Divider,
  Card, CardHeader, CardContent, Tabs, Tab
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Import participant photos - Bet Your Brain
import senthilKumarPhoto from './images/participants/participant_senthil_kumar_palanivelu.jpg';
import aravinthKarthikeyanPhoto from './images/participants/participant_aravinth_karthikeyan.jpg';
import beulahMercyPhoto from './images/participants/participant_beulah_mercy_paul_manickam.jpg';
import vivekTSPhoto from './images/participants/participant_vivek_t_s.jpg';
import hemaDharshiniPhoto from './images/participants/participant_hema_priya_dharshini_v.jpg';
import vikashSRPhoto from './images/participants/participant_vikash_s_r.jpg';
import sivakumarSPhoto from './images/participants/participant_sivakumar_soundarapandian.jpg';
import nikhileshSPPhoto from './images/participants/participant_nikhilesh_s_p.jpg';
import jayanthBalakrishnanPhoto from './images/participants/participant_jayanth_balakrishnan.jpg';
import priyaRousiniPhoto from './images/participants/participant_priya_rousini_duraiazhagan.jpg';
import kamalakkannanRPhoto from './images/participants/participant_kamalakkannan_r.jpg';
import rajkumarSPhoto from './images/participants/participant_rajkumar_s.jpg';

// Import additional participants for Football and Tug of War
import shankarChandranPhoto from './images/participants/participant_shankar_chandran.jpg';
import sasidharanRajaganapathiPhoto from './images/participants/participant_sasidharan_rajaganapathi.jpg';
import dharmarajanRajendranPhoto from './images/participants/participant_dharmarajan_rajendran.jpg';
import yogiSPhoto from './images/participants/participant_yogi_s.jpg';
import ajeysuriyaKanakarhajPhoto from './images/participants/participant_ajeysurya_kanakarhaj.jpg';
import sakthiganeshRPhoto from './images/participants/participant_sakthiganesh_r.jpg';
import bharathBabuRPhoto from './images/participants/participant_bharath_babu_r.jpg';
import ragulKarthickPhoto from './images/participants/participant_ragul_karthick.jpg';
import dhivyadharshiniTPhoto from './images/participants/participant_dhivyadharshini_t.jpg';
import kedharMummadisetttiPhoto from './images/participants/participant_kedhar_mummadisetti.jpg';
import vineshParamasivamPhoto from './images/participants/participant_vinesh_paramasivam.jpg';
import ajayRajanRPhoto from './images/participants/participant_ajay_rajan_r.jpg';
import prabuMonkayarkarasiAyyappanPhoto from './images/participants/participant_prabu_monkayarkarasi_ayyappan.jpg';

// Import participant photos - Table Tennis Doubles
import sathishkumarSPhoto from './images/participants/participant_sathishkumar_sampathkumar.jpg';
import sathyakumarSPhoto from './images/participants/participant_sathyakumar_seshachalam.jpg';
import raviThangaduraiPhoto from './images/participants/participant_ravi_thangadurai.jpg';
import krithickSPhoto from './images/participants/participant_krithick_s.jpg';

// Import participant photos - Carrom
import praneshKPhoto from './images/participants/participant_pranesh_k.jpg';
import madhanBabuSPhoto from './images/participants/participant_madhan_babu_s.jpg';
import karthikKPhoto from './images/participants/participant_karthik_k.jpg';

// Import participant photos - Chess
import josephDanielPhoto from './images/participants/participant_joseph_daniel_raj_ignaci.jpg';
import ranjithbabuDarumanPhoto from './images/participants/participant_ranjithbabu_daruman.jpg';

// Import participant photos - Badminton
import balajiLakshmananPhoto from './images/participants/participant_balaji_lakshmanan.jpg';
import sweathaSPhoto from './images/participants/participant_sweatha_s.jpg';
import raahaviMPhoto from './images/participants/participant_raahavi_m.jpg';
import ragupathiVeluduraiPhoto from './images/participants/participant_ragupathi_veludurai.jpg';

// Import participant photos - Card Tower
import infantShinyPhoto from './images/participants/participant_infant_shiny_a.jpg';
import keerthanaDhandapaniPhoto from './images/participants/participant_keerthana_dhandapani.jpg';
import gowsalyaRamasamyPhoto from './images/participants/participant_gowsalya_ramasamy.jpg';
import snehaThangaveluPhoto from './images/participants/participant_sneha_thangavelu.jpg';
import miruthuvikasiniSPhoto from './images/participants/participant_miruthuvikasini_s.jpg';
import meghnaSathyaMoorthyPhoto from './images/participants/participant_meghna_sathya_moorthy.jpg';

// Import participant photos - Build Your Logo
import dharaniSanjaiBPhoto from './images/participants/participant_dharani_sanjai_b.jpg';
import paulsonJPhoto from './images/participants/participant_paulson_j.jpg';
import harivarthiniRPhoto from './images/participants/participant_harivarthini_r.jpg';
import vinociKLPhoto from './images/participants/participant_vinoci_k_l.jpg';
import sudeepMPhoto from './images/participants/participant_sudeep_m.jpg';
import dhineshkumarDPhoto from './images/participants/participant_dhineshkumar_d.jpg';
import sumithraKamalakkannanPhoto from './images/participants/participant_sumithra_kamalakkannan.jpg';
import abdulKhaliqPhoto from './images/participants/participant_abdul_khaliq_mohamed_sherfudeen.jpg';
import vinethPPhoto from './images/participants/participant_vineth_p.jpg';

// Styled components
const EventCard = styled(Card)(({ theme, color }) => ({
  marginBottom: '24px',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  }
}));

const EventCardHeader = styled(CardHeader)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%)`,
  color: '#FFF',
  padding: '16px',
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  '& .MuiCardHeader-subheader': {
    color: 'rgba(255, 255, 255, 0.8)',
  }
}));

const TeamCard = styled(Paper)(({ theme, houseColor }) => ({
  padding: '16px',
  borderRadius: '12px',
  height: '100%',
  background: theme.palette.mode === 'light' ? '#fff' : '#2d2d2d',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `4px solid ${houseColor}`,
  position: 'relative'
}));

// We no longer need this styled component as we're using inline styles directly
// in the renderTeamMembers function with the proper sizing and border

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  minWidth: '100px',
  borderRadius: '8px 8px 0 0',
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
  }
}));

const Winners = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // House data
  const houses = {
    'house1': {
      name: 'The Yellow Sparks',
      logo: yellowSparksLogo,
      color: '#FFD700',
    },
    'house2': {
      name: 'Sparta',
      logo: spartaLogo,
      color: '#FF4C4C',
    },
    'house3': {
      name: 'Mission FunPossible',
      logo: missionFunPossibleLogo,
      color: '#4C70FF',
    }
  };  // Winners data for each event
  const eventsData = [
    {
      id: 'football',
      name: 'Football',
      icon: <SportsFootballIcon />,
      colors: ['#4CAF50', '#388E3C'],
      description: 'Team competition showcasing footballing skills and teamwork',
      winners: {
        house: 'house1',
        members: [
          { name: 'Aravinth Karthikeyan', photo: aravinthKarthikeyanPhoto },
          { name: 'Madhan Babu S', photo: madhanBabuSPhoto },
          { name: 'Karthik K', photo: karthikKPhoto },
          { name: 'Shankar Chandran', photo: shankarChandranPhoto },
          { name: 'Sasidharan Rajaganapathi', photo: sasidharanRajaganapathiPhoto },
          { name: 'Senthil Kumar Palanivelu', photo: senthilKumarPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'RanjithBabu Daruman', photo: ranjithbabuDarumanPhoto },
          { name: 'Paulson J', photo: paulsonJPhoto },
          { name: 'Dharani Sanjai B', photo: dharaniSanjaiBPhoto },
          { name: 'Sudeep M', photo: sudeepMPhoto },
          { name: 'Ravi Thangadurai', photo: raviThangaduraiPhoto },
          { name: 'Balaji Lakshmanan', photo: balajiLakshmananPhoto },
          { name: 'Yogi S', photo: yogiSPhoto }
        ]
      }
    },
    {
      id: 'tugofwar',
      name: 'Tug Of War',
      icon: <FitnessCenterIcon />,
      colors: ['#9C27B0', '#7B1FA2'],
      description: 'Team competition testing strength, strategy and coordination',
      winners: {
        house: 'house3',
        members: [
          { name: 'Ajeysurya Kanakarhaj', photo: ajeysuriyaKanakarhajPhoto },
          { name: 'Sakthiganesh R', photo: sakthiganeshRPhoto },
          { name: 'Bharath Babu R', photo: bharathBabuRPhoto },
          { name: 'Pranesh K', photo: praneshKPhoto },
          { name: 'Nikhilesh S P', photo: nikhileshSPPhoto },
          { name: 'Ragupathi Veludurai', photo: ragupathiVeluduraiPhoto },
          { name: 'Ragul Karthick', photo: ragulKarthickPhoto },
          { name: 'Sumithra Kamalakannan', photo: sumithraKamalakkannanPhoto },
          { name: 'Kamalakkannan R', photo: kamalakkannanRPhoto },
          { name: 'Dhivyadharshini T', photo: dhivyadharshiniTPhoto }
        ]
      },
      runners: {
        house: 'house1',
        members: [
          { name: 'Kedhar Mummadisetti', photo: kedharMummadisetttiPhoto },
          { name: 'Aravinth Karthikeyan', photo: aravinthKarthikeyanPhoto },
          { name: 'Karthik K', photo: karthikKPhoto },
          { name: 'Vinesh Paramasivam', photo: vineshParamasivamPhoto },
          { name: 'Ajay Rajan R', photo: ajayRajanRPhoto },
          { name: 'Vikash S R', photo: vikashSRPhoto },
          { name: 'Prabu Monkayarkarasi Ayyappan', photo: prabuMonkayarkarasiAyyappanPhoto },
          { name: 'Sasidharan Rajaganapathi', photo: sasidharanRajaganapathiPhoto },
          { name: 'Beulah Mercy Paul Manickam', photo: beulahMercyPhoto },
          { name: 'Dharmarajan Rajendran', photo: dharmarajanRajendranPhoto }
        ]
      }
    },
    {
      id: 'badminton-men',
      name: 'Badminton Men\'s Doubles',
      icon: <SportsTennisIcon />,
      colors: ['#3F51B5', '#303F9F'],
      description: 'Men\'s doubles tournament with knockout format',
      winners: {
        house: 'house2',
        members: [
          { name: 'Balaji Lakshmanan', photo: balajiLakshmananPhoto },
          { name: 'Ravi Thangadurai', photo: raviThangaduraiPhoto }
        ]
      },
      runners: {
        house: 'house1',
        members: [
          { name: 'Karthik K', photo: karthikKPhoto },
          { name: 'Madhan Babu S', photo: madhanBabuSPhoto }
        ]
      }
    },
    {
      id: 'badminton-women',
      name: 'Badminton Women\'s Doubles',
      icon: <SportsTennisIcon />,
      colors: ['#009688', '#00796B'],
      description: 'Women\'s doubles tournament with knockout format',
      winners: {
        house: 'house1',
        members: [
          { name: 'Sweatha S', photo: sweathaSPhoto },
          { name: 'Hema Priya Dharshini V', photo: hemaDharshiniPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'Infant Shiny A', photo: infantShinyPhoto },
          { name: 'Vinoci K L', photo: vinociKLPhoto }
        ]
      }
    },
    {
      id: 'badminton-mixed',
      name: 'Badminton Mixed Doubles',
      icon: <SportsTennisIcon />,
      colors: ['#673AB7', '#512DA8'],
      description: 'Mixed doubles tournament with knockout format',
      winners: {
        house: 'house3',
        members: [
          { name: 'Ragupathi Veludurai', photo: ragupathiVeluduraiPhoto },
          { name: 'Raahavi M', photo: raahaviMPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'Balaji Lakshmanan', photo: balajiLakshmananPhoto },
          { name: 'Infant Shiny A', photo: infantShinyPhoto }
        ]
      }
    },
    {
      id: 'build-your-logo',
      name: 'Build Your Logo',
      icon: <EmojiEventsIcon />,
      colors: ['#2196F3', '#1565C0'],
      description: 'Team competition to design and create the most creative and representative logo',
      winners: {
        house: 'house2',
        members: [
          { name: 'Dharani Sanjai B', photo: dharaniSanjaiBPhoto },
          { name: 'RanjithBabu Daruman', photo: ranjithbabuDarumanPhoto },
          { name: 'Paulson J', photo: paulsonJPhoto },
          { name: 'Harivarthini R', photo: harivarthiniRPhoto },
          { name: 'Vinoci K L', photo: vinociKLPhoto },
          { name: 'Gowsalya Ramasamy', photo: gowsalyaRamasamyPhoto },
          { name: 'Sudeep M', photo: sudeepMPhoto },
          { name: 'Dhineshkumar D', photo: dhineshkumarDPhoto },
          { name: 'Infant Shiny A', photo: infantShinyPhoto }
        ]
      },
      runners: {
        house: 'house3',
        members: [
          { name: 'Sneha Thangavelu', photo: snehaThangaveluPhoto },
          { name: 'Rajkumar S', photo: rajkumarSPhoto },
          { name: 'Sumithra Kamalakannan', photo: sumithraKamalakkannanPhoto },
          { name: 'Dhivyadharshini T', photo: dhivyadharshiniTPhoto },
          { name: 'Abdul Khaliq Mohamed Sherfudeen', photo: abdulKhaliqPhoto },
          { name: 'Priya Rousini Duraiazhagan', photo: priyaRousiniPhoto },
          { name: 'Nikhilesh S P', photo: nikhileshSPPhoto },
          { name: 'Vineth P', photo: vinethPPhoto },
          { name: 'Miruthuvikasini S', photo: miruthuvikasiniSPhoto }
        ]
      }
    },
    {
      id: 'chess',
      name: 'Chess',
      icon: <SportsEsportsIcon />,
      colors: ['#4CAF50', '#388E3C'],
      description: 'Classic strategy board game with tournament format',
      winners: {
        house: 'house2',
        members: [
          { name: 'Joseph Daniel Raj Ignaci', photo: josephDanielPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'RanjithBabu Daruman', photo: ranjithbabuDarumanPhoto }
        ]
      }
    },
    {
      id: 'card-tower',
      name: 'Card Tower',
      icon: <EmojiEventsIcon />,
      colors: ['#9C27B0', '#7B1FA2'],
      description: 'Team competition to build the highest and most creative card tower',
      winners: {
        house: 'house2',
        members: [
          { name: 'Infant Shiny A', photo: infantShinyPhoto },
          { name: 'Keerthana Dhandapani', photo: keerthanaDhandapaniPhoto },
          { name: 'Gowsalya Ramasamy', photo: gowsalyaRamasamyPhoto }
        ]
      },
      runners: {
        house: 'house3',
        members: [
          { name: 'Sneha Thangavelu', photo: snehaThangaveluPhoto },
          { name: 'Miruthuvikasini S', photo: miruthuvikasiniSPhoto },
          { name: 'Meghna Sathya Moorthy', photo: meghnaSathyaMoorthyPhoto }
        ]
      }
    },
    {
      id: 'bet-your-brain',
      name: 'Bet Your Brain',
      icon: <PsychologyIcon />,
      colors: ['#FF9800', '#F57C00'],
      description: 'A quiz competition that tests knowledge and quick thinking',
      winners: {
        house: 'house1',
        members: [
          { name: 'Senthil Kumar Palanivelu', photo: senthilKumarPhoto },
          { name: 'Aravinth Karthikeyan', photo: aravinthKarthikeyanPhoto },
          { name: 'Beulah Mercy Paul Manickam', photo: beulahMercyPhoto },
          { name: 'Vivek T S', photo: vivekTSPhoto },
          { name: 'Hema Priya Dharshini V', photo: hemaDharshiniPhoto },
          { name: 'Vikash S R', photo: vikashSRPhoto }
        ]
      },
      runners: {
        house: 'house3',
        members: [
          { name: 'Sivakumar Soundarapandian', photo: sivakumarSPhoto },
          { name: 'Nikhilesh S P', photo: nikhileshSPPhoto },
          { name: 'Jayanth Balakrishnan', photo: jayanthBalakrishnanPhoto },
          { name: 'Priya Rousini Duraiazhagan', photo: priyaRousiniPhoto },
          { name: 'Kamalakkannan R', photo: kamalakkannanRPhoto },
          { name: 'Rajkumar S', photo: rajkumarSPhoto }
        ]
      }
    },
    {
      id: 'table-tennis',
      name: 'Table Tennis Doubles',
      icon: <SportsTennisIcon />,
      colors: ['#E91E63', '#C2185B'],
      description: 'Doubles tournament with knockout format',
      winners: {
        house: 'house2',
        members: [
          { name: 'Sathishkumar Sampathkumar', photo: sathishkumarSPhoto },
          { name: 'Sathyakumar Seshachalam', photo: sathyakumarSPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'Ravi Thangadurai', photo: raviThangaduraiPhoto },
          { name: 'Krithick S', photo: krithickSPhoto }
        ]
      }
    },    {
      id: 'carrom',
      name: 'Carrom',
      icon: <CasinoIcon />,
      colors: ['#FF9800', '#F57C00'],
      description: 'Doubles tournament with knockout format',
      winners: {
        house: 'house3',
        members: [
          { name: 'Jayanth Balakrishnan', photo: jayanthBalakrishnanPhoto },
          { name: 'Pranesh K', photo: praneshKPhoto }
        ]
      },
      runners: {
        house: 'house1',
        members: [
          { name: 'Madhan Babu S', photo: madhanBabuSPhoto },
          { name: 'Karthik K', photo: karthikKPhoto }
        ]
      }
    }
  ];

  // Filtered events based on tab selection
  const displayEvents = selectedTab === 0 
    ? eventsData 
    : eventsData.filter((event, index) => index === selectedTab - 1);
  const renderTeamMembers = (members, houseColor) => (
    <Box sx={{ mt: 1 }}>
      {members.map((member, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar 
            src={member.photo} 
            alt={member.name}
            sx={{ 
              width: 45, 
              height: 45, 
              marginRight: '12px',
              border: `2px solid ${houseColor}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {member.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ 
      padding: { xs: '16px', sm: '24px' }, 
      borderRadius: '16px',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' 
        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold" 
          sx={{ 
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 1
          }}
        >
          <EmojiEventsIcon fontSize="large" color="primary" />
          Event Winners & Runners-up
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Congratulations to all the winners and participants
        </Typography>
      </Box>

      {/* Tab navigation */}
      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 3
          }
        }}
      >
        <StyledTab label="All Events" />
        {eventsData.map((event, idx) => (
          <StyledTab 
            key={event.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: event.colors[0] }}>
                  {React.cloneElement(event.icon, { fontSize: 'small' })}
                </Avatar>
                {event.name}
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Event cards */}
      {displayEvents.map((event) => (
        <EventCard key={event.id} color={event.colors}>
          <EventCardHeader
            color={event.colors}
            avatar={
              <Avatar sx={{ bgcolor: '#fff' }}>
                {React.cloneElement(event.icon, { sx: { color: event.colors[0] } })}
              </Avatar>
            }
            title={event.name}
            subheader={event.description}
          />
          <CardContent>
            <Grid container spacing={3}>              {/* Winners */}
              <Grid item xs={12} md={6}>
                <TeamCard houseColor={houses[event.winners.house].color}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: -16,
                        width: 'calc(100% + 32px)',
                        height: '1px',
                        backgroundColor: theme.palette.divider,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        mr: 2
                      }}
                    >
                      <Avatar 
                        src={houses[event.winners.house].logo} 
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          border: `3px solid ${houses[event.winners.house].color}`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                        }} 
                      />
                      <Avatar
                        sx={{
                          position: 'absolute',
                          bottom: -10,
                          right: -10,
                          width: 28,
                          height: 28,
                          bgcolor: 'gold',
                          color: '#000',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          fontSize: '0.8rem'
                        }}
                      >
                        1st
                      </Avatar>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {houses[event.winners.house].name}
                        </Typography>
                        <Chip 
                          label="WINNERS" 
                          size="small" 
                          color="success" 
                          sx={{ fontWeight: 'bold', height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {renderTeamMembers(event.winners.members, houses[event.winners.house].color)}
                </TeamCard>
              </Grid>

              {/* Runners */}
              <Grid item xs={12} md={6}>
                <TeamCard houseColor={houses[event.runners.house].color}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: -16,
                        width: 'calc(100% + 32px)',
                        height: '1px',
                        backgroundColor: theme.palette.divider,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        mr: 2
                      }}
                    >
                      <Avatar 
                        src={houses[event.runners.house].logo} 
                        sx={{ 
                          width: 60, 
                          height: 60,
                          border: `3px solid ${houses[event.runners.house].color}`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                        }} 
                      />
                      <Avatar
                        sx={{
                          position: 'absolute',
                          bottom: -10,
                          right: -10,
                          width: 28,
                          height: 28,
                          bgcolor: 'silver',
                          color: '#000',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          fontSize: '0.8rem'
                        }}
                      >
                        2nd
                      </Avatar>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {houses[event.runners.house].name}
                        </Typography>
                        <Chip 
                          label="RUNNERS-UP" 
                          size="small" 
                          color="primary" 
                          sx={{ fontWeight: 'bold', height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {renderTeamMembers(event.runners.members, houses[event.runners.house].color)}
                </TeamCard>
              </Grid>
            </Grid>
          </CardContent>
        </EventCard>
      ))}
    </Paper>
  );
};

export default Winners;
