const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Checkout HTML page
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Checkout Page</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <header>
            <h1>Amazon Checkout</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Your Orders</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
            </nav>
        </header>

        <main>
            <section id="billing-details">
                <h2>Billing Details</h2>
                <form action="/submit-checkout" method="POST">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>

                    <label for="address">Shipping Address</label>
                    <textarea id="address" name="address" required></textarea>

                    <label for="payment-method">Payment Method</label>
                    <select id="payment-method" name="payment-method" required>
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>

                    <button type="submit">Continue to Review</button>
                </form>
            </section>

            <section id="order-summary">
                <h2>Order Summary</h2>
                <ul>
                    <li>Item 1 - $19.99</li>
                    <li>Item 2 - $29.99</li>
                    <li>Item 3 - $9.99</li>
                    <li><strong>Total: $59.97</strong></li>
                </ul>
            </section>
        </main>

        <footer>
            <p>&copy; 2024 Amazon Clone</p>
        </footer>
    </body>
    </html>
    `);
});

// Handle form submission
app.post('/submit-checkout', (req, res) => {
    const { name, email, address, 'payment-method': paymentMethod } = req.body;
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
