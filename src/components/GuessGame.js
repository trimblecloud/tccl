// components/GuessGame.js
import React, { useState } from 'react';
import { 
  Paper, Typography, Button, Box, Grid, Card,
  CardContent, CardMedia, Radio, RadioGroup,
  FormControlLabel, FormControl, Fade, Alert,
  Snackbar, Backdrop, CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

const GuessGame = () => {
  // Game states
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState('default'); // 'default' or 'all'
  // Add a new state to track question results
  const [roundResults, setRoundResults] = useState([]);

  // House themes including border styles, backgrounds, and badge shapes
  const houseThemes = {
    1: { // Yellow Sparks
      main: '#FFD700',
      border: '5px solid #FFD700',
      shadow: '0 0 15px 5px rgba(255, 215, 0, 0.3)',
      gradient: 'linear-gradient(135deg, #FFC700 0%, #FFE700 50%, #FFC700 100%)',
      badgeColor: '#FFD700',
      badgeText: '#000',
      logo: yellowSparksLogo
    },
    2: { // Sparta - Changed from red to white-gray-black theme
      main: '#303030',
      border: '5px solid #303030',
      shadow: '0 0 15px 5px rgba(0, 0, 0, 0.3)',
      gradient: 'linear-gradient(135deg, #303030 0%, #A0A0A0 50%, #303030 100%)',
      badgeColor: '#C0C0C0',
      badgeText: '#000',
      logo: spartaLogo
    },
    3: { // Mission FunPossible
      main: '#4B0082',
      border: '5px solid #4B0082',
      shadow: '0 0 15px 5px rgba(75, 0, 130, 0.3)',
      gradient: 'linear-gradient(135deg, #4B0082 0%, #9370DB 50%, #4B0082 100%)',
      badgeColor: '#4B0082',
      badgeText: '#FFF',
      logo: missionFunPossibleLogo
    }
  };

  // Styled components for the photo display
  const StyledPhotoFrame = styled(Box)(({ theme, houseId }) => ({
    position: 'relative',
    padding: '8px',
    borderRadius: '12px',
    background: houseThemes[houseId]?.gradient || houseThemes.default.gradient,
    border: houseThemes[houseId]?.border || houseThemes.default.border,
    boxShadow: houseThemes[houseId]?.shadow || houseThemes.default.shadow,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    aspectRatio: '1/1', // Make frame square
    overflow: 'hidden', // Clip the image to the frame's bounds
  
    '& img': { // Style the image inside the frame
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Ensure the image fills the frame, cropping if needed
      display: 'block', // Ensure no extra space due to inline image layout
    },
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    },
  }));

  const HouseBadge = styled('div')(({ theme, houseId }) => ({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '60px',
    height: '60px',
    borderRadius: '50%', // Already circular, but making it explicit
    backgroundColor: 'white',
    border: `3px solid ${houseThemes[houseId]?.main || '#CCC'}`,
    boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '0', // Remove padding to maximize logo space
  }));

  // Helper function to get house badge content
  const getHouseLogo = (houseId) => {
    return houseThemes[parseInt(houseId)]?.logo || '';
  };

  // Feedback messages
  const correctMessages = [
    "Great job! That's correct!",
    "Awesome! You know your colleagues!",
    "You got it right! High five!",
    "Spot on! Keep up the good work!",
    "Correct! You're on fire!"
  ];

  const incorrectMessages = [
    "Oops! Not quite right, but nice try!",
    "Almost there! Better luck on the next one!",
    "Not this time, but you're still in the game!",
    "That's not it, but don't worry!",
    "Wrong answer, but keep going!"
  ];

  // List of female participants
  const femaleParticipants = [
    'Vinodhini Sakthivel',
    'Beulah Mercy Paul Manickam',
    'Prasidha Sivasankar',
    'K Sahana',
    'Ravina C',
    'Hema Priya Dharshini V',
    'Sweatha S',
    'Elammathi M',
    'Divya S',
    'Ashlesa Goyal',
    'Saranyadevi M S',
    'Preethi Rangamma',
    'Monalisha Kurusamy',
    'Hari Priya P',
    'Muskan Kumari',
    'Infant Shiny A',
    'Sharmila Arumugam',
    'Vinoci K L',
    'Gowsalya Ramasamy',
    'Harivarthini R',
    'Keerthana Dhandapani',
    'Sreenidhi Anbazhahan',
    'Nithiya Devi',
    'Sneha Thangavelu',
    'Raahavi M',
    'Kirthana Krishnan',
    'Geetha Pandiyan',
    'Dhivyadharshini T',
    'Vishali Senniappan',
    'Sumithra Kamalakannan',
    'Miruthuvikasini S',
    'Meghna Sathya Moorthy',
    'Priya Rousini Duraiazhagan'
  ];

  // Participant data from the Participants component
  const participants = {
    1: [
      'Aravinth Karthikeyan',
      'Balaji Bava Srikumar',
      'Vinodhini Sakthivel',
      'Beulah Mercy Paul Manickam',
      'Karpaga Vinayagam Thangavelu',
      'Sasidharan Rajaganapathi',
      'Prasidha Sivasankar',
      'K Sahana',
      'Padmanabhan SivaramaSubramonian',
      'Kedhar Mummadisetti',
      'Madhan Babu S',
      'Ravina C',
      'Vikash S R',
      'Srivatsan Tharageswaran',
      'Shankar Chandran',
      'Hema Priya Dharshini V',
      'Sweatha S',
      'Praveen Chinnathambi',
      'Prabu Monkayarkarasi Ayyappan',
      'Dharmarajan Rajendran',
      'Kondalarao Garlapati',
      'Dharanidharan R',
      'Elammathi M',
      'Mohammed Suaid Rayan',
      'Prakash Sah',
      'Ajay Rajan R',
      'Divya S',
      'Naganathan Kannan',
      'Ashlesa Goyal',
      'Saranyadevi M S',
      'Ashokkumar Subburaj',
      'Sarouj Charan Murugan',
      'Vinesh Paramasivam',
      'Karthik K',
      'Senthil Kumar Palanivelu',
      'Vivek T S',
      'Preethi Rangamma',
      'Monalisha Kurusamy'
    ],
    2: [
      'Hari Priya P',
      'Joseph Daniel Raj Ignaci',
      'Santhosh Kumar',
      'Ujjwal Raj',
      'Paulson J',
      'Allan Daniel D',
      'RanjithBabu Daruman',
      'Muskan Kumari',
      'Infant Shiny A',
      'Venkat Prasadh',
      'Gokul Subburaj B',
      'Shaju Gopinath',
      'Sharmila Arumugam',
      'Sudeep M',
      'Ravi Thangadurai',
      'Roshan Baskaran',
      'Vinoci K L',
      'Abhishekvarun M',
      'Dineshkumar D',
      'Balaji Lakshmanan',
      'Manoj Chandrasekar',
      'Sateesh Kumar Palanisamy',
      'Dharani Sanjai B',
      'Gowsalya Ramasamy',
      'Muhammed Rasik Fareed Mubarak',
      'Vijay Selvaraj',
      'Arvind K R',
      'Harivarthini R',
      'Rajil Contractor',
      'Keerthana Dhandapani',
      'Sreenidhi Anbazhahan',
      'Tiruttani Praveen Reddy',
      'Srinath Raghavendran',
      'Vasudev Jayachandran',
      'Sathyakumar Seshachalam',
      'Sathishkumar Sampathkumar',
      'Ezhil Alagesan',
      'Krithick S'
    ],
    3: [
      'Jayanth Balakrishnan',
      'Nithiya Devi',
      'Jeevanand Sundaram',
      'Nikhilesh S P',
      'Sneha Thangavelu',
      'Pranesh K',
      'Gomathinayagam Shanmugasadaiappan',
      'Ragul Karthick',
      'Sivakumar Soundarapandian',
      'Raahavi M',
      'Kirthana Krishnan',
      'Mohamed Pakkeer',
      'Dharvesh Ubaidhullah',
      'Rajagopalan Ramanujam',
      'Geetha Pandiyan',
      'Abdul Wahid Nainar',
      'Dhivakar K S',
      'Guru Lokesh Uppala',
      'Sibi Palvannan',
      'Rajkumar S',
      'Sakthiganesh R',
      'MariaSekar Vedhamanickam',
      'Abdul Khaliq Mohamed Sherfudeen',
      'Dhivyadharshini T',
      'Kamalakkannan R',
      'Pradeep Dhanarajan',
      'Vishali Senniappan',
      'Bharath Babu R',
      'Karthik S M',
      'Sumithra Kamalakannan',
      'Miruthuvikasini S',
      'Ashok Balaraman',
      'Rishap K',
      'Vineth P',
      'Meghna Sathya Moorthy',
      'Madankumar Sakthivel',
      'Priya Rousini Duraiazhagan',
      'Ajeysurya Kanakarhaj'
    ],
  };

  // House colors
  const houseColors = {
    1: '#FFD700', // Yellow for The Yellow Sparks
    2: '#8B0000', // Dark Red for Sparta
    3: '#4B0082', // Indigo for Mission FunPossible
  };

  // Flattened participants list with house info and image paths
  const allParticipantsWithHouse = Object.entries(participants).flatMap(
    ([houseId, members]) => members.map(name => ({ 
      name, 
      houseId: parseInt(houseId),
      imagePath: require(`./images/participants/participant_${name.replace(/\s+/g, '_').toLowerCase()}.jpg`),
      isFemale: femaleParticipants.includes(name)
    }))
  );

  // Separate participant lists by gender
  const femaleParticipantsWithHouse = allParticipantsWithHouse.filter(p => p.isFemale);
  const maleParticipantsWithHouse = allParticipantsWithHouse.filter(p => !p.isFemale);

  // Helper to get house name based on house ID
  const getHouseName = (houseId) => {
    switch (parseInt(houseId)) {
      case 1:
        return "The Yellow Sparks";
      case 2:
        return "Sparta";
      case 3:
        return "Mission FunPossible";
      default:
        return "";
    }
  };

  // Helper to get color based on house ID
  const getHouseColor = (houseId) => {
    return houseColors[houseId] || '#CCCCCC';
  };

  // Helper to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Generate a question with gender-matched options
  const generateQuestion = () => {
    // Select a random participant for the question
    const correctParticipant = allParticipantsWithHouse[
      Math.floor(Math.random() * allParticipantsWithHouse.length)
    ];
    
    // Determine the participant's gender
    const isCorrectFemale = correctParticipant.isFemale;
    
    // Get participants of the same gender only
    const sameGenderParticipants = isCorrectFemale 
      ? femaleParticipantsWithHouse.filter(p => p.name !== correctParticipant.name)
      : maleParticipantsWithHouse.filter(p => p.name !== correctParticipant.name);
    
    // Shuffle the same gender participants
    const shuffledParticipants = [...sameGenderParticipants].sort(() => 0.5 - Math.random());
    
    // Take 3 random options from the same gender
    const incorrectOptions = shuffledParticipants.slice(0, 3);
    
    // Combine correct and incorrect options and shuffle
    const options = [correctParticipant, ...incorrectOptions].sort(() => 0.5 - Math.random());
    
    return {
      participant: correctParticipant,
      options: options,
      correctAnswer: correctParticipant.name
    };
  };

  // Initialize the game with selected number of questions
  const initializeGame = () => {
    setIsLoading(true);
    
    // Calculate number of questions based on game mode
    const totalQuestions = gameMode === 'all' ? allParticipantsWithHouse.length : 10;
    
    // Generate questions
    const newQuestions = [];
    const usedParticipants = new Set();
    
    while (newQuestions.length < totalQuestions) {
      const question = generateQuestion();
      if (!usedParticipants.has(question.participant.name)) {
        usedParticipants.add(question.participant.name);
        newQuestions.push(question);
      }
    }
    
    setQuestions(newQuestions);
    setCurrentRound(0);
    setScore(0);
    setIsGameStarted(true);
    setIsGameEnded(false);
    setSelectedAnswer('');
    setShowResult(false);
    setRoundResults([]); // Reset round results
    setIsLoading(false);
  };

  // Handle user's answer selection
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // Update the handleSubmitAnswer to handle different total questions
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentRound];
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Store the result of this round
    setRoundResults(prev => [...prev, isAnswerCorrect]);
    
    setShowResult(true);

    // Automatically move to next question after 3 second
    setTimeout(() => {
      if (currentRound < questions.length - 1) {
        setCurrentRound(prevRound => prevRound + 1);
        setShowResult(false);
        setSelectedAnswer('');
      } else {
        setIsGameEnded(true);
      }
    }, 3000);
  };

  // Handle skipping current question
  const handleSkip = () => {
    // Record skipped questions as incorrect
    setRoundResults(prev => [...prev, false]);
    
    if (currentRound < questions.length - 1) {
      setCurrentRound(prevRound => prevRound + 1);
      setShowResult(false);
      setSelectedAnswer('');
    } else {
      setIsGameEnded(true);
    }
  };

  // Get a random feedback message based on correctness
  const getRandomFeedbackMessage = (isCorrect) => {
    const messages = isCorrect ? correctMessages : incorrectMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Restart the game
  const handleRestartGame = () => {
    initializeGame();
  };

  // Create individual progress segments
  const renderProgressSegments = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', mb: 3, height: 10, borderRadius: 5, overflow: 'hidden' }}>
        {questions.map((_, index) => {
          let backgroundColor = 'grey.300'; // Default color for future questions
          
          if (index < roundResults.length) {
            // Answered questions
            backgroundColor = roundResults[index] ? 'success.main' : 'warning.main'; // Green for correct, Orange for wrong
          } else if (index === currentRound) {
            // Current question
            backgroundColor = 'primary.main';
          }
          
          return (
            <Box
              key={index}
              sx={{
                height: '100%',
                flexGrow: 1,
                backgroundColor,
                borderRight: index < questions.length - 1 ? '1px solid white' : 'none',
              }}
            />
          );
        })}
      </Box>
    );
  };

  // Current question object
  const currentQuestion = questions[currentRound];

  return (
    <Paper elevation={3} sx={{ padding: '20px', minHeight: '500px' }}>
      <Typography variant="h5" gutterBottom align="center">
        Guess Who? Challenge
      </Typography>
      
      {!isGameStarted && !isGameEnded && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Think you know your colleagues? Test your knowledge!
          </Typography>
          <Typography variant="body1" paragraph>
            You will be shown an image of a colleague and need to guess their name.
            Select your game mode to begin!
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Button
              variant={gameMode === 'default' ? "contained" : "outlined"}
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => setGameMode('default')}
            >
              Quick Game
            </Button>
            <Button
              variant={gameMode === 'all' ? "contained" : "outlined"}
              color="primary"
              onClick={() => setGameMode('all')}
            >
              Full Game 
              {/* ({allParticipantsWithHouse.length} Questions) */}
            </Button>
          </Box>

          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={initializeGame}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Game'}
          </Button>
        </Box>
      )}
      
      {isLoading && (
        <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      
      {isGameStarted && !isGameEnded && !isLoading && currentQuestion && (
        <Fade in={true}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Round {currentRound + 1}/{questions.length}
              </Typography>
              <Typography variant="h6">
                Score: {score}
              </Typography>
            </Box>
            
            {renderProgressSegments()}
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    overflow: 'visible'
                  }}
                >
                  <StyledPhotoFrame houseId={currentQuestion.participant.houseId}>
                    <HouseBadge houseId={currentQuestion.participant.houseId}>
                      <img src={getHouseLogo(currentQuestion.participant.houseId)} alt="House Logo" style={{ width: '100%', height: '100%' }} />
                    </HouseBadge>
                    <CardMedia
                      component="img"
                      height="300"
                      image={currentQuestion.participant.imagePath}
                      alt="Participant"
                      sx={{ 
                        objectFit: 'contain', 
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }}
                    />
                  </StyledPhotoFrame>
                  <CardContent>
                    <Box
                      sx={{
                        position: 'relative',
                        mt: 1,
                        p: 1,
                        borderRadius: '4px',
                        border: `2px solid ${houseThemes[currentQuestion.participant.houseId]?.main || '#CCC'}`,
                        backgroundColor: `${houseThemes[currentQuestion.participant.houseId]?.main || '#CCC'}22`,
                        textAlign: 'center'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        fontWeight="bold"
                        color={houseThemes[currentQuestion.participant.houseId]?.badgeText === '#000' ? 'text.primary' : houseThemes[currentQuestion.participant.houseId]?.main}
                      >
                        {getHouseName(currentQuestion.participant.houseId)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Who is this?
                </Typography>
                
                <FormControl component="fieldset" fullWidth disabled={showResult}>
                  <RadioGroup
                    value={selectedAnswer}
                    onChange={handleAnswerChange}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option.name}
                        control={<Radio />}
                        label={option.name}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                
                {showResult ? (
                  <Box sx={{ mt: 3 }}>
                    <Alert 
                      severity={isCorrect ? "success" : "error"}
                      sx={{ mb: 2 }}
                    >
                      {getRandomFeedbackMessage(isCorrect)}
                      {!isCorrect && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          The correct answer is: {currentQuestion.correctAnswer}
                        </Typography>
                      )}
                    </Alert>
                    {currentRound === questions.length - 1 && (
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setIsGameEnded(true)}
                        fullWidth
                      >
                        See Results
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      fullWidth
                      sx={{ mt: 3, mb: 1 }}
                    >
                      Submit Answer
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleSkip}
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      Skip Question
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}
      
      {isGameEnded && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Game Complete!
          </Typography>
          
          <Typography variant="h5" color={score >= questions.length * 0.7 ? "success.main" : score >= questions.length * 0.4 ? "info.main" : "error.main"} sx={{ mb: 3 }}>
            Your Score: {score} out of {questions.length}
          </Typography>
          
          {score >= questions.length * 0.7 ? (
            <Typography variant="body1" paragraph>
              Impressive! You really know your colleagues well!
            </Typography>
          ) : score >= questions.length * 0.4 ? (
            <Typography variant="body1" paragraph>
              Good effort! You're getting to know your teammates!
            </Typography>
          ) : (
            <Typography variant="body1" paragraph>
              Don't worry! This game will help you get to know everyone better!
            </Typography>
          )}
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => {
              setGameMode('default');
              handleRestartGame();
            }}
          >
            Play Again
          </Button>
        </Box>
      )}
      
      <Snackbar
  open={showResult}
  autoHideDuration={3000}
  onClose={() => {}}
  message={isCorrect ? "Correct answer!" : "Incorrect answer"}
/>
    </Paper>
  );
};

export default GuessGame;