const Mpesa = require("mpesa-api").Mpesa;

const credentials = {
    clientKey: 'NaMbT5rCJGDhzxWN19icZGdKOAerYGIg',
    clientSecret: 'tGhSoAqmZ38zBXG9',
    initiatorPassword: 'Safaricom981!',
    securityCredential: null,
    certificatePath: null
};
const environment = "sandbox"

// create a new instance of the api
const mpesa = new Mpesa(credentials, environment)

// mpesa
//   .c2bregister({
//     ShortCode: "174379",
//     ConfirmationURL: "https://mpesanodejs.herokuapp.com/confirmation",
//     ValidationURL: "https://mpesanodejs.herokuapp.com/validation_url",
//     ResponseType: "Completed",
//   })
//   .then((response) => {
//     //Do something with the response
//     //eg
//     console.log(response);
//   })
//   .catch((error) => {
//     //Do something with the error;
//     //eg
//     console.error(error);
//   });

exports.c2b = () => {
    mpesa
    .c2bsimulate({
      ShortCode: 174379,
      Amount: 1 /* 1000 is an example amount */,
      Msisdn: 254715134415,
      CommandID: "Command ID" /* OPTIONAL */,
      BillRefNumber: "Bill Reference Number" /* OPTIONAL */,
    })
    .then((response) => {
      //Do something with the response
      //eg
      console.log(response);
    })
    .catch((error) => {
      //Do something with the error;
      //eg
      console.error(error);
    });

  }


