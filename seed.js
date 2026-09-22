require('dotenv').config();

const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const movies = require('./data/movies');

async function seedMovies() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Upsert means this can safely be run again without creating duplicate movies.
    await Promise.all(
      movies.map(movie =>
        Movie.updateOne({ title: movie.title }, { $set: movie }, { upsert: true })
      )
    );

    console.log(`${movies.length} movies added or updated successfully.`);
  } catch (error) {
    console.error('Movie seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedMovies();
