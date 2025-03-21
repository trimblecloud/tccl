// components/Participants.js
import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Avatar } from '@mui/material';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png'; // Replace with the actual path
import spartaLogo from './logo/sparta-logo.png'; // Replace with the actual path
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png'; // Replace with the actual path

const Participants = () => {
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

  // Find the maximum number of participants for any house
  const maxParticipants = Math.max(
    participants[1].length,
    participants[2].length,
    participants[3].length
  );

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        House Members
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography>The Yellow Sparks</Typography>
                  <Avatar src={yellowSparksLogo} alt="Yellow Sparks Logo" sx={{ width: 56, height: 56, borderRadius: '8px', marginTop: '8px' }} />
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography>Sparta</Typography>
                  <Avatar src={spartaLogo} alt="Sparta Logo" sx={{ width: 56, height: 56, borderRadius: '8px', marginTop: '8px' }} />
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography>Mission FunPossible</Typography>
                  <Avatar src={missionFunPossibleLogo} alt="Mission FunPossible Logo" sx={{ width: 56, height: 56, borderRadius: '8px', marginTop: '8px' }} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: maxParticipants }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>{participants[1][index] || ''}</TableCell>
                <TableCell>{participants[2][index] || ''}</TableCell>
                <TableCell>{participants[3][index] || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Participants;