const request = require('request')

const access =  (req, res, next) => {
    // access token
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer.from("NaMbT5rCJGDhzxWN19icZGdKOAerYGIg:tGhSoAqmZ38zBXG9").toString('base64');

    request(
        {
            url: url,
            headers: {
                "Authorization": "Basic " + auth
            }
        },
        (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                req.access_token = JSON.parse(body).access_token
                next()
            }
        }
    )
}

module.exports.access = access