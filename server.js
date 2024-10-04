const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Function to send message to Telegram
const sendToTelegram = (message) => {
    const token = '7790844861:AAF7HLfS0V6y8AB045QslaM816gdmFqWfCM'; // Replace with your bot token
    const chatId = '6733551649'; // Replace with your chat ID
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
        }),
        headers: { 'Content-Type': 'application/json' },
    });
};

// Serve the Product Page
app.get('/product.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// Serve the Checkout HTML page
app.get('/checkout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// Handle form submission
app.post('/submit-checkout', (req, res) => {
    const { name, email, address, 'payment-method': paymentMethod } = req.body;

    // Prepare message
    const message = `
        New Checkout Submission:
        <b>Name:</b> ${name}
        <b>Email:</b> ${email}
        <b>Address:</b> ${address}
        <b>Payment Method:</b> ${paymentMethod}
    `;

    // Send message to Telegram
    sendToTelegram(message);

    res.send(`
    <h1>Checkout Complete</h1>
    <p>Thank you, ${name}. Your order will be sent to:</p>
    <p>${address}</p>
    <p>Payment Method: ${paymentMethod}</p>
    <p>A confirmation email has been sent to ${email}.</p>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
