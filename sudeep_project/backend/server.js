require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Compass Connection Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/electroride';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB via Compass...');
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    console.log('Connection Port:', conn.connection.port);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB Compass is running and connected to localhost:27017');
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  scooterModel: { type: String, required: true },
  recommend: { type: String, required: true },
  improvements: String,
  satisfaction: { type: Number, min: 1, max: 10, required: true },
  contactPreference: String,
  comments: String,
  hearAboutUs: String,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'feedback'
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  city: { type: String, required: true },
  preferredContactTime: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'contacts'
});

const Contact = mongoose.model('Contact', contactSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'bookings'
});

const Booking = mongoose.model('Booking', bookingSchema);

// API Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    console.log('Feedback saved:', feedback);
    res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    console.log(`Retrieved ${feedbacks.length} feedback entries`);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: error.message });
  }
});

// Contact form API route
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log('Contact form submitted:', contact);
    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`Retrieved ${contacts.length} contact form submissions`);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ error: error.message });
  }
});

// Booking API routes
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    console.log('Booking saved:', booking);
    res.status(201).json({ 
      message: 'Booking submitted successfully!', 
      booking,
      bookingId: booking._id 
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    console.log(`Retrieved ${bookings.length} bookings`);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000; // Changed to 5000 for backend
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  console.log(`MongoDB URL: ${MONGODB_URI}`);
  console.log('\nAPI Endpoints:');
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log(`Get Feedback: http://localhost:${PORT}/api/feedback`);
  console.log(`Post Feedback: http://localhost:${PORT}/api/feedback (POST)`);
  console.log(`Get Contacts: http://localhost:${PORT}/api/contact`);
  console.log(`Post Contact: http://localhost:${PORT}/api/contact (POST)`);
  console.log(`Get Bookings: http://localhost:${PORT}/api/bookings`);
  console.log(`Post Booking: http://localhost:${PORT}/api/bookings (POST)`);
  console.log(`Get Booking by ID: http://localhost:${PORT}/api/bookings/:id`);
}); 