// routes/deployments.js
const express = require('express');
const router = express.Router();
const Deployment = require('../models/Deployment');

// Get all deployments
router.get('/', async (req, res) => {
    try {
        const deployments = await Deployment.find();
        res.json(deployments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new deployment
router.post('/', async (req, res) => {
    const deployment = new Deployment({
        server: req.body.server,
        deploymentDate: req.body.deploymentDate,
        status: req.body.status
    });

    try {
        const newDeployment = await deployment.save();
        res.status(201).json(newDeployment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDeployment = await Deployment.findByIdAndDelete(id);
        if (!deletedDeployment) {
            return res.status(404).json({ message: 'Deployment not found' });
        }
        res.json({ message: 'Deployment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { server, status } = req.body;
        const deployment = await Deployment.findByIdAndUpdate(req.params.id, { server, status }, { new: true });

        if (!deployment) {
            return res.status(404).json({ message: "Deployment not found" });
        }

        res.json(deployment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;
