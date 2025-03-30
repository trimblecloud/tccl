// components/Participants.js
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Avatar, 
  Card, 
  CardContent, 
  Grid, 
  Tabs, 
  Tab, 
  Chip, 
  useMediaQuery, 
  useTheme, 
  Zoom,
  Grow,
  Fade,
  Badge,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Import participant photos
import sweathaSPhoto from './images/participants/participant_sweatha_s.jpg';
import vikashSRPhoto from './images/participants/participant_vikash_s_r.jpg';
import harivarthiniRPhoto from './images/participants/participant_harivarthini_r.jpg';
import dharaniSanjaiBPhoto from './images/participants/participant_dharani_sanjai_b.jpg';
import vishaliSenniappanPhoto from './images/participants/participant_vishali_senniappan.jpg';
import praneshKPhoto from './images/participants/participant_pranesh_k.jpg';

// Styled components for each house
const YellowSparksChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#FFCF50',
  color: '#000000',
  fontWeight: 'bold',
  boxShadow: '0px 2px 6px rgba(255, 207, 80, 0.5)',
  '&:hover': {
    backgroundColor: '#F5C43C',
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
  },
}));

const SpartaChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#C41E3A',
  color: '#FFFFFF',
  fontWeight: 'bold',
  boxShadow: '0px 2px 6px rgba(196, 30, 58, 0.5)',
  '&:hover': {
    backgroundColor: '#B01C35',
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
  },
}));

const MissionChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#2E073F',
  color: '#FFFFFF',
  fontWeight: 'bold',
  boxShadow: '0px 2px 6px rgba(46, 7, 63, 0.5)',
  '&:hover': {
    backgroundColor: '#240631',
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
  },
}));

// Styled paper for each house's tab panel
const HousePaper = styled(Paper)(({ houseId, theme }) => {
  const colors = {
    1: {
      background: theme.palette.mode === 'light' ? 'linear-gradient(135deg, #FFEB3B 0%, #FF9800 100%)' : 'linear-gradient(135deg, #705500 0%, #703600 100%)',
      color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
    },
    2: {
      background: theme.palette.mode === 'light' ? 'linear-gradient(135deg, #E53935 0%, #880E4F 100%)' : 'linear-gradient(135deg, #702020 0%, #3F0022 100%)',
      color: '#FFFFFF',
    },
    3: {
      background: theme.palette.mode === 'light' ? 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)' : 'linear-gradient(135deg, #250544 0%, #3E0B51 100%)',
      color: '#FFFFFF',
    },
  };

  return {
    background: colors[houseId]?.background || theme.palette.background.paper,
    color: colors[houseId]?.color || theme.palette.text.primary,
    padding: '24px',
    borderRadius: '16px',
    minHeight: '500px',
    boxShadow: theme.shadows[8],
  };
});

// Animated member card
const MemberCard = styled(Card)(({ houseId, theme }) => {
  const colors = {
    1: {
      borderLeft: '4px solid #FFCF50',
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 248, 225, 0.9)' : 'rgba(51, 43, 17, 0.9)',
    },
    2: {
      borderLeft: '4px solid #C41E3A',
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 235, 238, 0.9)' : 'rgba(51, 17, 20, 0.9)',
    },
    3: {
      borderLeft: '4px solid #7B1FA2',
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(243, 229, 245, 0.9)' : 'rgba(39, 15, 41, 0.9)',
    },
  };

  return {
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    borderLeft: colors[houseId]?.borderLeft,
    backgroundColor: colors[houseId]?.backgroundColor,
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[8],
    },
  };
});

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`house-tabpanel-${index}`}
      aria-labelledby={`house-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Participants = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // House information
  const houses = [
    {
      id: 1,
      name: 'The Yellow Sparks',
      logo: yellowSparksLogo,
      description: 'Bright as the sun, quick as lightning, the Yellow Sparks bring energy and enthusiasm to every challenge!',
      color: '#FFCF50',
      textColor: '#000000',
      ChipComponent: YellowSparksChip
    },
    {
      id: 2,
      name: 'Sparta',
      logo: spartaLogo,
      description: 'With strength and determination, the Spartans face every battle with courage and teamwork.',
      color: '#C41E3A',
      textColor: '#FFFFFF',
      ChipComponent: SpartaChip
    },
    {
      id: 3,
      name: 'Mission FunPossible',
      logo: missionFunPossibleLogo,
      description: 'Where creativity meets strategy, Mission FunPossible turns the impossible into reality!',
      color: '#2E073F',
      textColor: '#FFFFFF',
      ChipComponent: MissionChip
    }
  ];

  // Restructured participants with role information
  const participants = {
    1: [
      { name: 'Sweatha S', role: 'Captain', photo: sweathaSPhoto },
      { name: 'Vikash S R', role: 'Vice Captain', photo: vikashSRPhoto },
      { name: 'Aravinth Karthikeyan', role: 'Member' },
      { name: 'Balaji Bava Srikumar', role: 'Member' },
      { name: 'Vinodhini Sakthivel', role: 'Member' },
      { name: 'Beulah Mercy Paul Manickam', role: 'Member' },
      { name: 'Karpaga Vinayagam Thangavelu', role: 'Member' },
      { name: 'Sasidharan Rajaganapathi', role: 'Member' },
      { name: 'Prasidha Sivasankar', role: 'Member' },
      { name: 'K Sahana', role: 'Member' },
      { name: 'Padmanabhan SivaramaSubramonian', role: 'Member' },
      { name: 'Kedhar Mummadisetti', role: 'Member' },
      { name: 'Madhan Babu S', role: 'Member' },
      { name: 'Ravina C', role: 'Member' },
      { name: 'Srivatsan Tharageswaran', role: 'Member' },
      { name: 'Shankar Chandran', role: 'Member' },
      { name: 'Hema Priya Dharshini V', role: 'Member' },
      { name: 'Praveen Chinnathambi', role: 'Member' },
      { name: 'Prabu Monkayarkarasi Ayyappan', role: 'Member' },
      { name: 'Dharmarajan Rajendran', role: 'Member' },
      { name: 'Kondalarao Garlapati', role: 'Member' },
      { name: 'Dharanidharan R', role: 'Member' },
      { name: 'Elammathi M', role: 'Member' },
      { name: 'Mohammed Suaid Rayan', role: 'Member' },
      { name: 'Prakash Sah', role: 'Member' },
      { name: 'Ajay Rajan R', role: 'Member' },
      { name: 'Divya S', role: 'Member' },
      { name: 'Naganathan Kannan', role: 'Member' },
      { name: 'Ashlesa Goyal', role: 'Member' },
      { name: 'Saranyadevi M S', role: 'Member' },
      { name: 'Ashokkumar Subburaj', role: 'Member' },
      { name: 'Sarouj Charan Murugan', role: 'Member' },
      { name: 'Vinesh Paramasivam', role: 'Member' },
      { name: 'Karthik K', role: 'Member' },
      { name: 'Senthil Kumar Palanivelu', role: 'Member' },
      { name: 'Vivek T S', role: 'Member' },
      { name: 'Preethi Rangamma', role: 'Member' },
      { name: 'Monalisha Kurusamy', role: 'Member' }
    ],
    2: [
      { name: 'Harivarthini R', role: 'Captain', photo: harivarthiniRPhoto },
      { name: 'Dharani Sanjai B', role: 'Vice Captain', photo: dharaniSanjaiBPhoto },
      { name: 'Hari Priya P', role: 'Member' },
      { name: 'Joseph Daniel Raj Ignaci', role: 'Member' },
      { name: 'Santhosh Kumar', role: 'Member' },
      { name: 'Ujjwal Raj', role: 'Member' },
      { name: 'Paulson J', role: 'Member' },
      { name: 'Allan Daniel D', role: 'Member' },
      { name: 'RanjithBabu Daruman', role: 'Member' },
      { name: 'Muskan Kumari', role: 'Member' },
      { name: 'Infant Shiny A', role: 'Member' },
      { name: 'Venkat Prasadh', role: 'Member' },
      { name: 'Gokul Subburaj B', role: 'Member' },
      { name: 'Shaju Gopinath', role: 'Member' },
      { name: 'Sharmila Arumugam', role: 'Member' },
      { name: 'Sudeep M', role: 'Member' },
      { name: 'Ravi Thangadurai', role: 'Member' },
      { name: 'Roshan Baskaran', role: 'Member' },
      { name: 'Vinoci K L', role: 'Member' },
      { name: 'Abhishekvarun M', role: 'Member' },
      { name: 'Dineshkumar D', role: 'Member' },
      { name: 'Balaji Lakshmanan', role: 'Member' },
      { name: 'Manoj Chandrasekar', role: 'Member' },
      { name: 'Sateesh Kumar Palanisamy', role: 'Member' },
      { name: 'Gowsalya Ramasamy', role: 'Member' },
      { name: 'Muhammed Rasik Fareed Mubarak', role: 'Member' },
      { name: 'Vijay Selvaraj', role: 'Member' },
      { name: 'Arvind K R', role: 'Member' },
      { name: 'Rajil Contractor', role: 'Member' },
      { name: 'Keerthana Dhandapani', role: 'Member' },
      { name: 'Sreenidhi Anbazhahan', role: 'Member' },
      { name: 'Tiruttani Praveen Reddy', role: 'Member' },
      { name: 'Srinath Raghavendran', role: 'Member' },
      { name: 'Vasudev Jayachandran', role: 'Member' },
      { name: 'Sathyakumar Seshachalam', role: 'Member' },
      { name: 'Sathishkumar Sampathkumar', role: 'Member' },
      { name: 'Ezhil Alagesan', role: 'Member' },
      { name: 'Krithick S', role: 'Member' }
    ],
    3: [
      { name: 'Vishali Senniappan', role: 'Captain', photo: vishaliSenniappanPhoto },
      { name: 'Pranesh K', role: 'Vice Captain', photo: praneshKPhoto },
      { name: 'Jayanth Balakrishnan', role: 'Member' },
      { name: 'Nithiya Devi', role: 'Member' },
      { name: 'Jeevanand Sundaram', role: 'Member' },
      { name: 'Nikhilesh S P', role: 'Member' },
      { name: 'Sneha Thangavelu', role: 'Member' },
      { name: 'Gomathinayagam Shanmugasadaiappan', role: 'Member' },
      { name: 'Ragul Karthick', role: 'Member' },
      { name: 'Sivakumar Soundarapandian', role: 'Member' },
      { name: 'Raahavi M', role: 'Member' },
      { name: 'Kirthana Krishnan', role: 'Member' },
      { name: 'Mohamed Pakkeer', role: 'Member' },
      { name: 'Dharvesh Ubaidhullah', role: 'Member' },
      { name: 'Rajagopalan Ramanujam', role: 'Member' },
      { name: 'Geetha Pandiyan', role: 'Member' },
      { name: 'Abdul Wahid Nainar', role: 'Member' },
      { name: 'Dhivakar K S', role: 'Member' },
      { name: 'Guru Lokesh Uppala', role: 'Member' },
      { name: 'Sibi Palvannan', role: 'Member' },
      { name: 'Rajkumar S', role: 'Member' },
      { name: 'Sakthiganesh R', role: 'Member' },
      { name: 'MariaSekar Vedhamanickam', role: 'Member' },
      { name: 'Abdul Khaliq Mohamed Sherfudeen', role: 'Member' },
      { name: 'Dhivyadharshini T', role: 'Member' },
      { name: 'Kamalakkannan R', role: 'Member' },
      { name: 'Pradeep Dhanarajan', role: 'Member' },
      { name: 'Bharath Babu R', role: 'Member' },
      { name: 'Karthik S M', role: 'Member' },
      { name: 'Sumithra Kamalakannan', role: 'Member' },
      { name: 'Miruthuvikasini S', role: 'Member' },
      { name: 'Ashok Balaraman', role: 'Member' },
      { name: 'Rishap K', role: 'Member' },
      { name: 'Vineth P', role: 'Member' },
      { name: 'Meghna Sathya Moorthy', role: 'Member' },
      { name: 'Madankumar Sakthivel', role: 'Member' },
      { name: 'Priya Rousini Duraiazhagan', role: 'Member' },
      { name: 'Ajeysurya Kanakarhaj', role: 'Member' }
    ],
  };

  // Render members with animation
  const renderMembers = (houseId) => {
    return participants[houseId].map((member, index) => {
      // Different animation timing for each member
      const animationDelay = index % 10 * 100;
      
      return (
        <Grow 
          key={index} 
          in={true} 
          style={{ transformOrigin: '0 0 0', transitionDelay: `${animationDelay}ms` }}
          timeout={1000}
        >
          <Grid item xs={12} sm={6} md={4}>
            <MemberCard houseId={houseId}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  {React.createElement(houses[activeTab].ChipComponent, {
                    size: "small",
                    label: `${index + 1}`
                  })}
                  {member.role === 'Captain' ? (
                    <Tooltip title="Team Captain">
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={
                          <EmojiEventsIcon sx={{ 
                            color: houses[activeTab].color, 
                            backgroundColor: 'white', 
                            borderRadius: '50%',
                            fontSize: '16px',
                            padding: '2px'
                          }} />
                        }
                      >
                        <Avatar
                          alt={member.name}
                          src={member.photo}
                          sx={{ width: 36, height: 36, mr: 1 }}
                        />
                      </Badge>
                    </Tooltip>
                  ) : member.role === 'Vice Captain' ? (
                    <Tooltip title="Vice Captain">
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={
                          <StarIcon sx={{ 
                            color: houses[activeTab].color,
                            backgroundColor: 'white', 
                            borderRadius: '50%',
                            fontSize: '16px',
                            padding: '2px'
                          }} />
                        }
                      >
                        <Avatar
                          alt={member.name}
                          src={member.photo}
                          sx={{ width: 36, height: 36, mr: 1 }}
                        />
                      </Badge>
                    </Tooltip>
                  ) : null}
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={member.role !== 'Member' ? 'bold' : 'normal'}>
                      {member.name}
                    </Typography>
                    {member.role !== 'Member' && (
                      <Typography variant="caption" color="text.secondary">
                        {member.role}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </MemberCard>
          </Grid>
        </Grow>
      );
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: isMobile ? '12px' : '20px' }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        House Members
      </Typography>
      
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        TabIndicatorProps={{
          style: {
            backgroundColor: houses[activeTab].color,
            height: 3
          }
        }}
      >
        {houses.map((house, index) => (
          <Tab 
            key={house.id} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  src={house.logo} 
                  alt={`${house.name} Logo`} 
                  sx={{ width: 24, height: 24 }} 
                />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {house.name}
                </Typography>
              </Box>
            }
            sx={{
              '&.Mui-selected': {
                color: house.color,
                fontWeight: 'bold'
              }
            }}
          />
        ))}
      </Tabs>

      {houses.map((house, index) => (
        <TabPanel key={house.id} value={activeTab} index={index}>
          <Fade in={activeTab === index} timeout={800}>
            <HousePaper houseId={house.id}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar 
                  src={house.logo} 
                  alt={`${house.name} Logo`} 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '12px',
                    boxShadow: 4,
                    mb: 2 
                  }} 
                />
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {house.name}
                </Typography>
                <Typography variant="body1" textAlign="center">
                  {house.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {participants[house.id].length} Members
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {renderMembers(house.id)}
              </Grid>
            </HousePaper>
          </Fade>
        </TabPanel>
      ))}
    </Paper>
  );
};

export default Participants;