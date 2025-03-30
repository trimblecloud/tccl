// components/GuessGame.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Paper, Typography, Button, Box, Grid, Card,
  CardContent, CardMedia, Radio, RadioGroup,
  FormControlLabel, FormControl, Fade, Alert,
  Snackbar, Backdrop, CircularProgress, Avatar, Chip,
  List, ListItem, useMediaQuery, useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

const GuessGame = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  // Add authentication states
  const [user, setUser] = useState(null);
  const [highScores, setHighScores] = useState({
    default: 0,
    all: 0
  });
  // State to store leaderboard data
  const [leaderboard, setLeaderboard] = useState({
    default: [],
    all: []
  });
  // State to store timer ID for automatic advancement
  const [currentTimer, setCurrentTimer] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchHighScores(currentUser.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch high scores from Firebase
  const fetchHighScores = async (userId) => {
    try {
      const docRef = doc(db, "highScores", userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHighScores({
          default: data.default || 0,
          all: data.all || 0
        });
      }
    } catch (error) {
      console.error("Error fetching high scores:", error);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await fetchHighScores(result.user.displayName);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setHighScores({ default: 0, all: 0 });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Save high score to Firebase
  const saveHighScore = async (currentScore) => {
    if (!user) return;
    
    try {
      const username = user.displayName || "Anonymous"; // Use display name or fallback to "Anonymous"
      const userScoreRef = doc(db, "highScores", username);
      const currentHighScore = highScores[gameMode] || 0;
      
      // Only update if current score is higher than previous high score
      if (currentScore > currentHighScore) {
        const updatedScores = {
          ...highScores,
          [gameMode]: currentScore
        };
        
        await setDoc(userScoreRef, updatedScores, { merge: true });
        setHighScores(updatedScores);
      }
    } catch (error) {
      console.error("Error saving high score:", error);
    }
  };

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

  // Update the handleSubmitAnswer function to have different timeouts based on whether the answer is correct or incorrect
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

    // Set different timeout durations based on whether the answer is correct or incorrect
    const timeoutDuration = isAnswerCorrect ? 1000 : 3000; // 1 second for correct answers, 3 seconds for incorrect

    // Set a timer for automatic advancement
    const timer = setTimeout(() => {
      if (currentRound < questions.length - 1) {
        setCurrentRound(prevRound => prevRound + 1);
        setShowResult(false);
        setSelectedAnswer('');
      } else {
        setIsGameEnded(true);
      }
    }, timeoutDuration);

    // Save the timer ID so it can be cleared if user manually advances
    setCurrentTimer(timer);
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

  // When game ends, save the score to Firebase if user is logged in
  useEffect(() => {
    if (isGameEnded && user) {
      saveHighScore(score);
    }
  }, [isGameEnded]);

  // Current question object
  const currentQuestion = questions[currentRound];

  // Fetch leaderboard data from Firebase
  const fetchLeaderboard = async () => {
    try {
      const defaultQuery = query(
        collection(db, 'highScores'),
        orderBy('default', 'desc'),
        limit(5)
      );
      const allQuery = query(
        collection(db, 'highScores'),
        orderBy('all', 'desc'),
        limit(5)
      );

      const [defaultSnapshot, allSnapshot] = await Promise.all([
        getDocs(defaultQuery),
        getDocs(allQuery)
      ]);

      const defaultLeaderboard = defaultSnapshot.docs.map(doc => ({
        username: doc.id,
        score: doc.data().default || 0
      }));

      const allLeaderboard = allSnapshot.docs.map(doc => ({
        username: doc.id,
        score: doc.data().all || 0
      }));

      setLeaderboard({
        default: defaultLeaderboard,
        all: allLeaderboard
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  // Fetch leaderboard when the component mounts
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: '20px', minHeight: '500px', position: 'relative' }}>
      <Typography variant="h5" gutterBottom align="center">
        Guess Who? Challenge
      </Typography>
      
      {/* Authentication UI - Displayed at the top right corner - Mobile optimized */}
      <Box sx={{ 
        position: { xs: 'relative', md: 'absolute' },
        top: { md: '20px' }, 
        right: { md: '20px' },
        width: { xs: '100%', md: 'auto' },
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
        alignItems: 'center',
        mb: { xs: 2, md: 0 },
        mt: { xs: 1, md: 0 }
      }}>
        {user ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mr: { sm: 2 }
            }}>
              <Avatar 
                src={user.photoURL} 
                alt={user.displayName} 
                sx={{ width: 32, height: 32, mr: 1 }} 
              />
              <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Typography variant="body2" fontWeight="bold">
                  {user.displayName?.split(' ')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Signed in
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="outlined" 
              size="small" 
              color="inherit" 
              onClick={handleSignOut}
              startIcon={<LogoutIcon />}
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
            fullWidth={isMobile}
          >
            Sign in with Google
          </Button>
        )}
      </Box>
      
      {/* Game start screen */}
      {!isGameStarted && !isGameEnded && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Think you know your colleagues? Test your knowledge!
          </Typography>
          <Typography variant="body1" paragraph>
            You will be shown an image of a colleague and need to guess their name.
            Select your game mode to begin!
          </Typography>
          
          {/* Game Mode Selection */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant={gameMode === 'default' ? "contained" : "outlined"}
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => setGameMode('default')}
            >
              Quick Game
              {user && highScores.default > 0 && (
                <Chip 
                  size="small" 
                  icon={<EmojiEventsIcon fontSize="small" />}
                  label={`Best: ${highScores.default}`} 
                  color="secondary"
                  variant="outlined"
                  sx={{ ml: 1 }} 
                />
              )}
            </Button>
            <Button
              variant={gameMode === 'all' ? "contained" : "outlined"}
              color="primary"
              onClick={() => setGameMode('all')}
            >
              Full Game
              {user && highScores.all > 0 && (
                <Chip 
                  size="small" 
                  icon={<EmojiEventsIcon fontSize="small" />}
                  label={`Best: ${highScores.all}`} 
                  color="secondary"
                  variant="outlined"
                  sx={{ ml: 1 }} 
                />
              )}
            </Button>
          </Box>

          {/* Optional login prompt */}
          {!user && (
            <Alert severity="info" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
              <Typography variant="body2">
                Sign in with Google to save your high scores! (Optional)
              </Typography>
            </Alert>
          )}

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
      
      {/* Game in progress */}
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
      
      {/* Game end screen */}
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
          
          {/* New High Score notification */}
          {user && score > highScores[gameMode] && (
            <Alert severity="success" sx={{ mb: 3, maxWidth: '400px', mx: 'auto' }}>
              <Typography variant="body2" fontWeight="bold">
                New High Score! Previous best: {highScores[gameMode]}
              </Typography>
            </Alert>
          )}
          
          {/* Prompt to sign in to save score */}
          {!user && score > 0 && (
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleGoogleSignIn}
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
              >
                Sign in to Save Your Score
              </Button>
            </Box>
          )}
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => {
              setGameMode('default');
              handleRestartGame();
            }}
            sx={{ mr: 2 }}
          >
            Play Again
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
        </Box>
      )}
      
      {/* Countdown Snackbar */}
      <Snackbar
        open={showResult}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        message={`${isCorrect ? "Correct! " : "Incorrect! "}Next question coming up...`}
      />
      
      {/* Leaderboard Section with enhanced styling */}
      {user && (
        <Box sx={{ mt: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '20px',
              background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
              color: '#FFF',
              borderRadius: '16px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
              mb: 3
            }}
          >
            <Typography variant="h5" gutterBottom>
              Leaderboard
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'inline-block',
                borderBottom: '3px solid #FFCF50',
                paddingBottom: '4px'
              }}>
                Quick Game (Top 5)
              </Typography>
              {leaderboard.default.length > 0 && leaderboard.default.filter(entry => entry.score > 0).length > 0 ? (
                <List sx={{ width: '100%' }}>
                  {leaderboard.default
                    .filter(entry => entry.score > 0)
                    .map((entry, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          mb: 1,
                          '&:hover': {
                            transform: 'scale(1.02)',
                            transition: 'transform 0.3s ease',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <Avatar 
                              sx={{ 
                                bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'grey.500',
                                color: index < 3 ? 'black' : 'white',
                                mr: 2,
                                fontWeight: 'bold'
                              }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography fontWeight="bold">
                              {entry.username}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              backgroundColor: '#FFCF50',
                              color: '#000',
                              borderRadius: '12px',
                              fontWeight: 'bold',
                              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            {entry.score} pts
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Typography variant="body1" sx={{ 
                  mt: 2, 
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  p: 2
                }}>
                  No scores available yet.
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'inline-block',
                borderBottom: '3px solid #FFCF50',
                paddingBottom: '4px'
              }}>
                Full Game (Top 5)
              </Typography>
              {leaderboard.all.length > 0 && leaderboard.all.filter(entry => entry.score > 0).length > 0 ? (
                <List sx={{ width: '100%' }}>
                  {leaderboard.all
                    .filter(entry => entry.score > 0)
                    .map((entry, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          mb: 1,
                          '&:hover': {
                            transform: 'scale(1.02)',
                            transition: 'transform 0.3s ease',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <Avatar 
                              sx={{ 
                                bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'grey.500',
                                color: index < 3 ? 'black' : 'white',
                                mr: 2,
                                fontWeight: 'bold'
                              }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography fontWeight="bold">
                              {entry.username}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              backgroundColor: '#FFCF50',
                              color: '#000',
                              borderRadius: '12px',
                              fontWeight: 'bold',
                              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            {entry.score} pts
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Typography variant="body1" sx={{ 
                  mt: 2, 
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  p: 2
                }}>
                  No scores available yet.
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};

export default GuessGame;