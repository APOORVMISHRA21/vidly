const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vidly',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err));

const genreRouter = require('./Routes/genres.js');
const customerRouter = require('./Routes/customers.js');
const movieRouter = require('./Routes/movies.js');
const rentalRouter = require('./Routes/rentals.js');
const userRouter = require('./Routes/users.js');
const authRouter = require('./Routes/auth.js');

let  app = express();

app.use(express.json());

app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log('Listening to port 3000')});