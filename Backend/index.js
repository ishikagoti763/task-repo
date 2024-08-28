const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const port =  8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Global Middlewar
app.use(express.json());

mongoose.connect(
    "mongodb://localhost:27017/TypeRacer",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Available Routes
app.use('/auth', require('./Routes/auth'));
app.use('/api', require('./Routes/task'));


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});



