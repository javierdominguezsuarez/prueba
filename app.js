// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/deploymentTracker', { // Specify database name in connection URI
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const deploymentsRoute = require('./routes/deployments');
const errorsRoute = require('./routes/errors');
const patchesRoute = require('./routes/patches');

app.use('/deployments', deploymentsRoute);
app.use('/errors', errorsRoute);
app.use('/patches', patchesRoute);

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'views')));

// Define route to serve index.html for root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
