const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

// Review Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// API Endpoint to Save Review
app.post('/api/reviews', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const review = new Review({ name, email, message });
        await review.save();
        res.status(201).send({ success: true, message: 'Review saved!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error saving review.' });
    }
});

// API Endpoint to Fetch Reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching reviews.' });
    }
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
