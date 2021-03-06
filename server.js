const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname))
require('./routes/routes')(app)


app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}`)
})