const express = require('express');
const path = require ('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500; 

application.use('/register', require('./routes/register'));
application.use('/auth', require('./routes/auth'));

k