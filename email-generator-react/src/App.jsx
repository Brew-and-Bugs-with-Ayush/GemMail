import React, { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { AutoAwesome, ErrorOutline, ContentCopy, CreditCard } from '@mui/icons-material';
import { Link } from 'react-scroll';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [darkMode, setDarkMode] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCopy = () => {
    if (!generatedReply) return;
    navigator.clipboard.writeText(generatedReply)
      .then(() => showSnackbar('Copied to clipboard!'))
      .catch(err => {
        console.error('Failed to copy:', err);
        showSnackbar('Failed to copy to clipboard.', 'error');
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      
      const reply = response.data && typeof response.data === 'object' 
        ? response.data.reply || JSON.stringify(response.data) 
        : response.data;
        
      setGeneratedReply(reply);
    } catch (err) {
      console.error('API Error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to generate reply. Please check the console and ensure the backend server is running.';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: darkMode ? '#333' : 'linear-gradient(to right, #e0eafc, #cfdef3)' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>GemMail: Smart Email Generator</Typography>
          <Button color="inherit" component={Link} to="about" smooth duration={500} sx={{ mr: 2 }}>About</Button>
          <Button color="inherit" component={Link} to="services" smooth duration={500}>Services</Button>
          <Button color="inherit" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, py: 8, backgroundColor: darkMode ? '#121212' : 'transparent' }}>
        <Container maxWidth="sm">
          <Paper elevation={10} sx={{ p: 5, borderRadius: 4, backgroundColor: darkMode ? '#424242' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)' }}>
            <Stack spacing={4}>
              <Typography variant="h4" fontWeight={700} color={darkMode ? 'white' : 'primary.dark'} textAlign="center">GemMail: Smart Email Generator</Typography>
              <Typography variant="subtitle1" textAlign="center" color={darkMode ? 'gray' : 'text.secondary'}>
                Let AI craft the perfect reply. Paste, pick a tone, and go!
              </Typography>
              <TextField
                multiline
                rows={6}
                label="Paste your email here"
                fullWidth
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                required
                InputProps={{
                  style: { backgroundColor: darkMode ? '#555' : '#fff' }
                }}
                color={darkMode ? 'primary' : 'default'}
              />
              <FormControl fullWidth>
                <InputLabel id="tone-label">Tone (Optional)</InputLabel>
                <Select
                  labelId="tone-label"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  label="Tone (Optional)"
                  sx={{ backgroundColor: darkMode ? '#555' : '#fff' }}
                >
                  <MenuItem value=""><em>Neutral</em></MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="direct">Direct</MenuItem>
                  <MenuItem value="empathetic">Empathetic</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                startIcon={!loading && <AutoAwesome />}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : 'Generate Reply'}
              </Button>
              {error && <Alert severity="error" icon={<ErrorOutline />}>{error}</Alert>}
              {generatedReply && !loading && (
                <Box>
                  <Typography variant="h6" fontWeight={600}>Generated Reply:</Typography>
                  <TextField multiline rows={6} fullWidth value={generatedReply} InputProps={{ readOnly: true }} />
                  <Button variant="outlined" startIcon={<ContentCopy />} onClick={handleCopy} sx={{ mt: 2 }}>Copy</Button>
                </Box>
              )}
            </Stack>
          </Paper>

          {/* Payment Card Section */}
          <Box sx={{ mt: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to right, #667eea,  #764ba2)',
                p: 3,
                textAlign: 'center',
                color: 'white'
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>Unlock Premium Features</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Get access to advanced tones and AI-generated email optimization. Only $9.99/month!
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <CreditCard sx={{ fontSize: 50 }} />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: 'rgb(194, 157, 232)'
                  }
                }}>
                  Subscribe Now
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box sx={{ py: 8, backgroundColor: darkMode ? '#424242' : '#f7f7f7' }} id="about">
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} color={darkMode ? 'white' : 'primary.dark'} textAlign="center">About Us</Typography>
          <Typography variant="body1" color={darkMode ? 'gray' : 'text.secondary'} sx={{ mt: 3, textAlign: 'center' }}>
            At GemMail, we use cutting-edge AI to help you write professional, personalized, and effective email replies with just a click. Our tool allows you to select from different tones and styles to match the nature of your email conversation.
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, backgroundColor: darkMode ? '#121212' : '#f1f1f1' }} id="services">
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} color={darkMode ? 'white' : 'primary.dark'} textAlign="center">Our Services</Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: darkMode ? '#333' : '#fff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>AI-Powered Replies</Typography>
                  <Typography variant="body2" color={darkMode ? 'gray' : 'text.secondary'} sx={{ mt: 2 }}>
                    Our AI generates context-aware email responses based on the input email, saving time and improving efficiency.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: darkMode ? '#333' : '#fff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>Tone Selection</Typography>
                  <Typography variant="body2" color={darkMode ? 'gray' : 'text.secondary'} sx={{ mt: 2 }}>
                    Choose from different tones like Professional, Casual, Formal, and more to match your communication style.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: darkMode ? '#333' : '#fff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>Premium Features</Typography>
                  <Typography variant="body2" color={darkMode ? 'gray' : 'text.secondary'} sx={{ mt: 2 }}>
                    Unlock advanced email generation features with a premium subscription and optimize your email experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: darkMode ? '#424242' : '#e0eafc' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color={darkMode ? 'gray' : 'text.secondary'}>
            © 2025 GemMail. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
