// Utility script to generate placeholder images using Canvas
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

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

// Configuration for placeholder images
const width = 400;
const height = 400;

// Function to create a placeholder image for a participant
const generatePlaceholderImage = (name, houseId, outputDir) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background with house color
  ctx.fillStyle = houseColors[houseId] || '#CCCCCC';
  ctx.fillRect(0, 0, width, height);
  
  // Add some visual interest - diagonal stripes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = -height; i < width; i += 40) {
    ctx.fillRect(i, 0, 20, height);
  }
  
  // Add border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, width - 20, height - 20);
  
  // Add text - participant name
  ctx.fillStyle = 'white';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle long names by splitting into multiple lines
  const words = name.split(' ');
  let lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;
    
    if (testWidth > width - 60 && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  const lineHeight = 40;
  const totalTextHeight = lines.length * lineHeight;
  let y = (height - totalTextHeight) / 2;
  
  lines.forEach(line => {
    ctx.fillText(line, width / 2, y);
    y += lineHeight;
  });
  
  // Add house indicator
  ctx.font = '20px Arial';
  ctx.fillText(`House ${houseId}`, width / 2, height - 40);
  
  // Save the image
  const filename = `participant_${name.replace(/\s+/g, '_').toLowerCase()}.jpg`;
  const outputPath = path.join(outputDir, filename);
  
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  
  return filename;
};

// Generate images for all participants
const generateAllImages = () => {
  // Get the absolute path to the images/participants directory
  const outputDir = path.join(__dirname, '..', 'images', 'participants');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let count = 0;
  Object.entries(participants).forEach(([houseId, members]) => {
    members.forEach(name => {
      generatePlaceholderImage(name, houseId, outputDir);
      count++;
    });
  });
  
  console.log(`Generated ${count} placeholder images in ${outputDir}`);
};

// Run the image generation
generateAllImages();