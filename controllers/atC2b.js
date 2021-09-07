// Set your app credentials
const credentials = {
    apiKey: process.env.AT_APIKEY,
    username: process.env.AT_USERNAME
}

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the payments service
const payments = AfricasTalking.PAYMENTS;

exports.initiateMobileCheckout = async(req, res) => {
    const options = {
        // Set the name of your Africa's Talking payment product
        productName: 'Bloow',
        // Set the phone number you want to send to in international format
        phoneNumber: '+254715134415',
        // Set the 3-Letter ISO currency code and the checkout amount
        currencyCode: 'KES',
        amount: 10,
        // Set any metadata that you would like to send along with this request.
        // This metadata will be included when we send back the final payment notification
        metadata: {
            foo: "bar",
            key: "value"
        }
    };

    // That's it hit send and we'll take care of the rest
    try {
        const result = await payments.mobileCheckout(options);
        console.log(result);
    } catch (err) {
        console.log(err.toString());
    }
}

// initiateMobileCheckout();