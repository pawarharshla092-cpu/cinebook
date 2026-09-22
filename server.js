// CineBook backend entry point.
// This server will later connect to MongoDB and provide booking APIs.
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 8080;

// Lets the server read JSON data sent from the website.
app.use(express.json());

// Serves index.html, CSS, JavaScript, and images from this folder.
app.use(express.static(__dirname));

// A simple API route to confirm the backend is working.
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CineBook backend is running',
    time: new Date().toISOString()
  });
});

// Returns every movie stored in MongoDB.
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({ isNowShowing: true }).sort({ title: 1 });
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load movies.' });
  }
});

// Returns one movie using its MongoDB id.
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
    res.json({ success: true, movie });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid movie id.' });
  }
});

// Shows already booked seats for one specific movie show.
app.get('/api/booked-seats', async (req, res) => {
  const { movieId, theatre, showDate, showtime } = req.query;
  if (!movieId || !theatre || !showDate || !showtime) {
    return res.status(400).json({ success: false, message: 'Show details are required.' });
  }

  try {
    const bookings = await Booking.find({ movie: movieId, theatre, showDate, showtime });
    const seats = bookings.flatMap(booking => booking.seats);
    res.json({ success: true, seats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load booked seats.' });
  }
});

// Saves a completed booking in MongoDB.
app.post('/api/bookings', async (req, res) => {
  const { movieId, theatre, showDate, showtime, seats, customerName, email, phone, paymentMethod } = req.body;

  if (!movieId || !theatre || !showDate || !showtime || !Array.isArray(seats) || !seats.length || !customerName || !email || !phone || !paymentMethod) {
    return res.status(400).json({ success: false, message: 'Please complete every booking field.' });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });

    const conflictingBooking = await Booking.findOne({
      movie: movieId,
      theatre,
      showDate,
      showtime,
      seats: { $in: seats }
    });
    if (conflictingBooking) {
      return res.status(409).json({ success: false, message: 'One or more seats were just booked. Please choose different seats.' });
    }

    const booking = await Booking.create({
      bookingId: `CB${Date.now().toString().slice(-8)}`,
      movie: movieId,
      theatre,
      showDate,
      showtime,
      seats,
      customerName,
      email,
      phone,
      paymentMethod,
      totalAmount: movie.price * seats.length
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not create booking.' });
  }
});

// Lets a customer look up their earlier bookings with their email address.
app.get('/api/bookings', async (req, res) => {
  if (!req.query.email) return res.status(400).json({ success: false, message: 'Email is required.' });

  try {
    const bookings = await Booking.find({ email: req.query.email.toLowerCase() })
      .populate('movie', 'title genre duration')
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not load bookings.' });
  }
});

// Sends visitors back to the home page if they open an unknown non-API route.
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error('MongoDB connection string is missing. Check your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`CineBook server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
