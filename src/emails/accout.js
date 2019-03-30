const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vito045@icloud.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get alone with the app.`
    });
}

const sendCencelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vito045@icloud.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see your back somethimes soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCencelationEmail
}