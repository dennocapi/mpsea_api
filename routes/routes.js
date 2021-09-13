const express = require('express')
const router = express.Router()
const request = require('request')
const { access } = require('../middleware/token')

router.get('/access_token', access, (req, res) => {
    console.log('Token')
    res.status(200).json({access_token: req.access_token})
})

router.get('/register', access,(req, res) => {
    let url = 'https://sandbox.safaricom.co.ke/mpesa/v1/registerurl'
    let auth = 'Bearer ' + req.access_token

    request(
        {
            url: url,
            method:"POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": "600383",
                "ResponseType": "Complete",
                "ConfirmationURL": "https://mpesanodejs.herokuapp.com/confirmation",
                "ValidationURL": "https://mpesanodejs.herokuapp.com/validation_url"
            }
        },
        (error, response,body) => {
            if(error) {console.log(error)}
            res.status(200).json(body)
        }
    )

})

router.post('/confirmation', (req,res) => {
    console.log('...........confirmation............')
    console.log(req.body)
})

router.post('/validation', (req, res) => {
    console.log('...........validation............')
    console.log(req.body)
})

router.get('/simulate', access, (req,body) => {
    let url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
    let auth = 'Bearer ' + req.access_token

    request(
        {
            url: url,
            method:"POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": "600383",
                "CommandID": "CustomerPayBillOnline",
                "Amount": "100",
                "Misdn": "254715134415",
                "BillRefNumber": "Bloow Test"
            }
        },
        (error, res,body) => {
            if(error) console.log(error)
            res.status(200).json(body)
        }
    )
})

router.get('/balance',access, (req,res) => {

    console.log('Balance')
    let url = 'https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query'
    let auth = 'Bearer ' + req.access_token

    request(
        {
            url: url,
            method:"POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "Initiator":"testapi",
                "SecurityCredential": "k8azPoYhFx3nHPsaErfjiCi/zY98kdgqyeBcPBVmYEWym+MC7e4U1HuL8O6dwfod0hvzCzHsN59rfoOxeREf8MEjhB8zgVU/HRND/Dh2j4JAo1fRnqB3ZbeXxVJVCDJiAifX5ONhllKUxu42WWrQU1wvRCXKq1lGx/GJCV5tbmxgKwI4hII+24F2UZ8PRo4ErnOIXm7UDMMWTHbaC8NKz7iqEJljL2DhxzLSAAH7Lal81MnYp/gk3CJhgGJzHg2s1gs1+sTXViw6n6i41VJUDecDHZI3u/S5J0Urx2RO8Ey3pLGfsnhlSjFTPZKiAA1sfsWmDfOG27ATIXTKIDac+w==",
                "CommandID": "AccountBalance",
                "PartyA": "601342",
                "IdentifierType": "4",
                "Remarks": "Remarks",
                "QueueTimeOutURL": "https://mpesanodejs.herokuapp.com/timeout_url",
                "ResultURL": "https://mpesanodejs.herokuapp.com/result_url"

            }
        },
        (error, response,body) => {
            if(error) console.log(error)
            res.status(200).json(body)
        }
    )
})

router.post('/timeout_url', (req, res) => {
    console.log('...........Balance Timeout Response............')
    console.log(req.body)
}) 

router.post('/result_url', (req,res) => {
    console.log('...........Balance Response............')
    console.log(req.body.Result.ResultParameters)
})

router.get('/stk', access, (req, res) => {
    let endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    let auth = 'Bearer ' + req.access_token
    let passkey = process.env.PASSKEY
    let BusinessShortCode =174379 

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    console.log(month)
   
    if ( month < 10 ) {
        month = '0' + month   
    }
    if ( day < 10 ) {
        day = '0' + day
    }
    if ( hours < 10 ) {
        hours = '0' + hours
    }
    if ( minutes < 10 ) {
        minutes = '0' + minutes
    }
    if ( seconds < 10 ) {
        seconds = '0' + seconds
    }
   

    const timestamp = year+ "" + month + "" + day + "" + hours + "" + minutes + "" + seconds

    const password = new Buffer.from(BusinessShortCode + passkey + timestamp).toString('base64')

    request(
        {
            url: endpoint,
            method: "POST",
            headers: {
                "Authorization": auth

        },
        json: {
            "BusinessShortCode": BusinessShortCode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": "1",
            "PartyA": "600584",
            "PartyB": BusinessShortCode,
            "PhoneNumber": "254715134415",
            "CallBackURL": "https://mpesanodejs.herokuapp.com/stk_callback",
            "AccountReference": "Bloow",
            "TransactionDesc": "TestPay"
        }
    },

    (error, response, body) => {
        if(error) {
            console.log(error)
        }

        res.status(200).json(body)
    }
    )
})

router.post('/stk_callback',(req,res) => {
    console.log('-----STK-----')
    console.log(req.body)
    // console.log(req.body.Body.stkCallback.CallbackMetadata)
})

module.exports = router