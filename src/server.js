require('dotenv').config();
const express = require('express');
const path = require ('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500; 
const mongoose = require ('mongoose');
const connectDB = require('./config/dbConn');

//connect to mongoDB
connectDB();

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(errorHandler);

app.use(verifyJWT);

mongoose.connect.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
