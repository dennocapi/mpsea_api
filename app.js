const express = require('express')
const mpesaRoute = require('./routes/routes')
const app = express()

app.use(express.json())
app.use('/mpesa',mpesaRoute)

app.listen(6000, () => {
    console.log('Server running on port 6000')
}); 