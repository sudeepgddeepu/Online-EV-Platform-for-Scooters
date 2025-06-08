const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'src')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'gallery.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'contact-form.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'feedback.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'src', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
  console.log('\nWebsite URLs:');
  console.log(`Homepage: http://localhost:${PORT}`);
  console.log(`Gallery: http://localhost:${PORT}/gallery`);
  console.log(`Contact: http://localhost:${PORT}/contact`);
  console.log(`Feedback: http://localhost:${PORT}/feedback`);
}); 