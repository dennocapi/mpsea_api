const express = require('express')
const mpesaRoute = require('./routes/routes')
const app = express()

app.use(express.json())
app.use('/mpesa',mpesaRoute)

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log('Server running on port 6000')
}); 