require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/scores', require('./routes/scores'));
app.use('/draw', require('./routes/draw'));
app.use('/admin', require('./routes/admin'));
app.use('/subscription', require('./routes/subscription'));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);