const express = require('express');
const path = require ('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500; 

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT);