// routes/patches.js
const express = require('express');
const router = express.Router();
const Patch = require('../models/Patch');

// Get all patches
router.get('/', async (req, res) => {
    try {
        const patches = await Patch.find().populate(['errorId','appliedIn']);
        res.json(patches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new patch
router.post('/', async (req, res) => {
    const patch = new Patch({
        errorId: req.body.errorId,
        patchDescription: req.body.patchDescription,
        dateApplied: req.body.dateApplied,
        appliedIn: req.body.appliedIn 
    });

    try {
        const newPatch = await patch.save();
        res.status(201).json(newPatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPatch = await Patch.findByIdAndDelete(id);
        if (!deletedPatch) {
            return res.status(404).json({ message: 'Patch not found' });
        }
        res.json({ message: 'Patch deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { patchDescription, appliedBy } = req.body;
        const patch = await Patch.findByIdAndUpdate(req.params.id, { patchDescription, appliedBy }, { new: true });

        if (!patch) {
            return res.status(404).json({ message: "Patch not found" });
        }

        res.json(patch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;
