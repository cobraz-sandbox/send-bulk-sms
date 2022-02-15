require('dotenv').config();
const Vonage = require('@vonage/server-sdk');
const recipients = require('./recipients.js');

const invariant = (check, message) => {
  if (!check) {
    throw new Error(message);
  }
};

const main = () => {
  invariant(process.env.API_KEY, 'need API_KEY');
  invariant(process.env.API_SECRET, 'need API_SECRET');
  // invariant(process.env.MESSAGE, 'need MESSAGE');

  const message =
    'Hei 👋 Forrige uke ble det avholdt eiermøte i Tabetalt, mye spennende ble snakket om, som det nå ligger en e-post om i innboksen din. Vi håper at alle kan møte på det kommende møtet mandag 21. februar kl. 19. Vi gleder oss 🚀';

  const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });

  recipients.map(recipient =>
    vonage.message.sendSms(
      'Tabetalt',
      recipient,
      message,
      { type: 'unicode' },
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]['status'] === '0') {
            console.log('Message sent successfully.');
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]['error-text']}`,
            );
          }
        }
      },
    ),
  );
};

main();
