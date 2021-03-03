const express = require('express')
const app = express()
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./config/connection')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const NODE_ENV = process.env.NODE_ENV || "production"
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });



console.log(`Your env is ${process.env.NODE_ENV}`);

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//checking routes
app.get('/check', (req, res) => {
    res.send('API is working fine!')
});

//importing routes
// app.use('/api/v1/auth', require('./routes/v1/authRoutes'));
// app.use('/api/v1', require('./routes/v1/homeRoutes'));
// app.use('/api/v1', require('./routes/v1/userRoutes'));

//setting up custom error message for routes 
app.use((req, res, next) => {
    const error = new Error('This APIs does not exist');
    error.status = 404;
    next(error);
});

//Error handler function`
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//cors
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });


//server calling
app.listen(port, () => {
    console.log(`Server is running at:${port}`)
});

