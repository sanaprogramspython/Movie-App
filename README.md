# Movie Library

A simple movie CRUD application built with Node.js, Express, MongoDB, Mongoose, and EJS.

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from `.env.example` and set your database connection:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/movie-library
   PORT=3000
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

To load three sample movies with poster images, configure `MONGODB_URI` and run:

```bash
npm run seed
```

The app supports creating, viewing, editing, and deleting movies. Poster URLs are optional; movies without one use the bundled default poster.
# Movie-App
