// routes/errors.js
const express = require('express');
const router = express.Router();
const Error = require('../models/Error');

// Get all errors
router.get('/', async (req, res) => {
    try {
        const errors = await Error.find().populate('deploymentId');
        res.json(errors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new error
router.post('/', async (req, res) => {
    const error = new Error({
        deploymentId: req.body.deploymentId,
        description: req.body.description,
        dateReported: req.body.dateReported,
        status: req.body.status
    });

    try {
        const newError = await error.save();
        res.status(201).json(newError);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedError = await Error.findByIdAndDelete(id);
        if (!deletedError) {
            return res.status(404).json({ message: 'Error not found' });
        }
        res.json({ message: 'Error deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { description } = req.body;
        const error = await Error.findByIdAndUpdate(req.params.id, { description }, { new: true });

        if (!error) {
            return res.status(404).json({ message: "Error not found" });
        }

        res.json(error);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
