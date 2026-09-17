require('dotenv').config();

const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const movies = [
  {
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    rating: 8.8,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given a chance at redemption.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    rating: 9.0,
    description: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Add it to your .env file.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');

  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log(`Inserted ${movies.length} movies with poster URLs`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  });
