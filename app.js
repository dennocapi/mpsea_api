const express = require('express')
require('dotenv/config')
const mpesaRoute = require('./routes/routes')
const c2bRoute = require('./routes/atC2b')
const app = express()

app.get('/',(req,res) => {
    res.send('Mpesa Api')
})
app.use(express.json())
app.use('/mpesa',mpesaRoute)
app.use('/pay', c2bRoute)

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
}); 