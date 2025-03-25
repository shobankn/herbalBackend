require('dotenv').config({ path: '.env' });
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const DataBaseConnection = require('./config/dbconnection');
const router = require('./router/userroute');


// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Load env vars
dotenv.config({ path: '.env' });

DataBaseConnection();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({ origin: '*' }));

app.use(cookieParser());
app.use('/api/user',router);

// Welcome API
app.use('/api/test', (req, res) => {
    res.send("Welcome to herbal web");
});


app.listen(PORT, () => {
   console.log('server is running on 8000 port')
});
