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
                "ConfirmationURL": "http://197.248.86.122.801/confirmation",
                "ValidationURL": "http://197.248.86.122.801/validation_url"
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
                "Misdn": "254708374149",
                "BillRefNumber": "Bloow Test"
            }
        },
        (error, response,body) => {
            if(error) console.log(error)
            res.status(200).json(body)
        }
    )
})

router.get('/balance', (req,res) => {
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
                "SecurityCredential": "O9dkkVNU4qfRW6ZFPf871t4tPr71TAFQyKuxRatgpfNH8djISztL0kK8bjbbiVwS9yZXOaGHyv0YMhvU9Wp2N55tOhhC2IkXYMueaTJ0ZZPRR8Nkx",
                "CommandID": "AccountBalance",
                "PartyA": "601342",
                "IdentifierType": "4",
                "Remarks": "Remarks",
                "QueueTimeOutURL": "http://197.248.86.122.801/timeout_url",
                "ResultURL": "http://197.248.86.122.801/result_url"

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
    let BusinessShortCode = 174379
    // let date = new Date()
    // let year = date.getFullYear()
    // let month = date.getMonth()+1
    // let day = date.getDate()
    // let hours = date.getHours()
    // let minutes = date.getMinutes()
    // let seconds = date.getSeconds()
    // const timestamp = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds

    let date = new Date()
    const timestamp = date.getFullYear() + "" + "" + date.getMonth() + "" + "" + date.getDate() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds()

    console.log(timestamp)
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
            "PartyA": "600996",
            "PartyB": "600000",
            "PhoneNumber": "254715134415",
            "CallBackURL": "https://mpesanodejs.herokuapp.com/stk_callback",
            "AccountReference": "123TEST",
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

router.post('stk_callback',(req,res) => {
    console.log('-----STK-----')
    console.log(req.body)
})

module.exports = router