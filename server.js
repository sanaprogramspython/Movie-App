require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const { getAllMovies } = require('./controllers/movieController');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.message = req.query.message;
  res.locals.error = req.query.error;
  next();
});

app.get('/', getAllMovies);
app.use('/movies', movieRoutes);

app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you requested does not exist.'
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('error', {
    title: 'Server Error',
    message: 'An unexpected error occurred. Please try again.'
  });
});

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Movie Library running at http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer().catch(() => process.exit(1));
}

module.exports = app;
