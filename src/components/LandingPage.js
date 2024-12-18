import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Collapse, Tooltip, Fab } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./LandingPage.css"; // Import the external CSS for styling

const LandingPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const handleLearnMore = () => {
    setShowDetails((prev) => !prev);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const profileData = [
    {
      name: "VISITHRAN D",
      image: "https://media.licdn.com/dms/image/v2/D5635AQHnl-8ugJQXdA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1734328352236?e=1734933600&v=beta&t=U_qdca8SyuIAyiDnsrAgOWhwZ7qZNb95SwF75wfGTe0",
      linkedIn: "https://www.linkedin.com/in/visithran-d-37a877291/",
    },
    {
      name: "VIJAY SYAM BK",
      image: "https://media.licdn.com/dms/image/v2/D5635AQFJDsrPyU2iPA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1733758807411?e=1734933600&v=beta&t=QZM5QE1SwBGDptZvpMpaUojWcRiYIrsgtJEa8Vkfhgc",
      linkedIn: "https://www.linkedin.com/in/vijaysyam-bk/",
    },
    {
      name: "VEDESH N",
      image: "https://media.licdn.com/dms/image/v2/D5635AQGiU7CJ-VWPNg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1734328371715?e=1734933600&v=beta&t=tN1kuSE9REbX3UcGTBbWEULU_ys0Cd33F83eVvV52e8",
      linkedIn: "https://www.linkedin.com/in/vedesh-n-b631b82a1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "VIJAY PH",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFitx-5u0FrSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710745107626?e=1740009600&v=beta&t=58HV_k0QD8s0wxqAZg7PzMaQGOdykGqodR8bANDQGig",
      linkedIn: "https://www.linkedin.com/",
    },
  ];

  return (
    <Box className="landing-page">
      {/* Running Text */}
      <Box className="running-text-container">
      </Box>

      {/* Navigation Bar */}
      <AppBar position="absolute" color="transparent" elevation={0} className="app-bar">
        <Toolbar sx={{ justifyContent: "space-between", marginTop: "80px" }}>
          
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box className="content-container" textAlign="center" sx={{ pt: 10 }}>
      <Box className="glass-card">
  <Typography
    variant="h1"
    sx={{
      fontSize: "4rem",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      mb: 3,
    }}
  >
    <span style={{ color: "#4285F4" }}>T</span>
    <span style={{ color: "#EA4335" }}>R</span>
    <span style={{ color: "#FBBC05" }}>A</span>
    <span style={{ color: "#34A853" }}>I</span>
    <span style={{ color: "#EA4335" }}>L</span>
    <span style={{ color: "#4285F4" }}>B</span>
    <span style={{ color: "#FBBC05" }}>L</span>
    <span style={{ color: "#34A853" }}>A</span>
    <span style={{ color: "#EA4335" }}>Z</span>
    <span style={{ color: "#4285F4" }}>E</span>
    <span style={{ color: "#FBBC05" }}>R</span>
    <span style={{ color: "#34A853" }}>S</span>
    <span style={{ color: "#EA4335" }}>!</span>
  </Typography>

  <Typography
    variant="h4"
    sx={{
      fontWeight: "light",
      color: "#666",
      mb: 3,
    }}
  >
    — Write to the Future —
  </Typography>

  <Typography
    variant="body1"
    className="content-text"
    sx={{
      mb: 4, // Add a larger bottom margin here
    }}
  >
    Dear Future Me, <br />
    Hey there! What are you up to a year from now? Or, from your perspective,
    what was I doing a year ago? Time travel is weird. Honestly, I don’t know
    what to say—just a quick “Hi, how’s it going?” from your carefree, clueless
    past self. <br />
    Stay safe, have fun, and keep being awesome.
  </Typography>

  <Button
    variant="contained"
    color="primary"
    onClick={handleLearnMore}
    className="learn-more-btn"
    sx={{
      mt: 2, // Add margin at the top to push it further down
    }}
  >
    {showDetails ? "Hide Details" : "Learn More"}
  </Button>

  <Collapse in={showDetails} timeout="auto" unmountOnExit>
    <Box className="details-box">
      <Typography variant="body1">
        ❤️ <strong>Reliving memories</strong> in vivid detail <br />
        📈 <strong>Acknowledging growth</strong> & achievements <br />
        ✅ <strong>Setting goals</strong> for the future <br />
        😌 <strong>Decluttering your mind</strong> to find some headspace
      </Typography>
    </Box>
  </Collapse>
</Box>


        {/* Action Buttons */}
        <Box className="action-buttons" textAlign="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            className="login-btn"
            sx={{
              mx: 2,
              fontWeight: "bold",
              borderRadius: "20px",
              textTransform: "none",
              backgroundColor: "transparent",
              color: "black",
              fontSize: "1.25rem", // Medium-large font size
              padding: "12px 24px", // Slightly smaller padding
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            className="signup-btn"
            sx={{
              mx: 2,
              fontWeight: "bold",
              borderRadius: "20px",
              textTransform: "none",
              borderColor: "black",
              color: "black",
              fontSize: "1.25rem", // Medium-large font size
              padding: "12px 24px", // Slightly smaller padding
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </Box>
      </Box>

      {/* Profile Section */}
      <Box className="profile-container">
  {profileData.map((profile, index) => (
    <Box key={index} className="profile-frame">
      <img src={profile.image} alt={profile.name} className="profile-image" />
      <Typography className="profile-name">{profile.name}</Typography>
      <Typography className="profile-role">Software Engineer</Typography> {/* Add this line */}
      <IconButton href={profile.linkedIn} target="_blank" className="linkedin-btn">
        <LinkedInIcon fontSize="large" />
      </IconButton>
    </Box>
  ))}
</Box>



      {/* Social Icons */}
      <Box className="social-icons">
  <IconButton href="https://facebook.com" target="_blank">
    <FacebookIcon className="facebook-icon" />
  </IconButton>
  <IconButton href="https://twitter.com" target="_blank">
    <TwitterIcon className="twitter-icon" />
  </IconButton>
  <IconButton href="https://instagram.com" target="_blank">
    <InstagramIcon className="instagram-icon" />
  </IconButton>
</Box>


      {/* Scroll to Top */}
      {showScroll && (
        <Tooltip title="Scroll to top">
          <Fab color="primary" size="small" onClick={scrollToTop} className="scroll-to-top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};
export default LandingPage; 
