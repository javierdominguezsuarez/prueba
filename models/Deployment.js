// models/Deployment.js
const mongoose = require('mongoose');

const DeploymentSchema = new mongoose.Schema({
    server: String,
    deploymentDate: { type: Date, default: Date.now },
    status: String
});

module.exports = mongoose.model('Deployment', DeploymentSchema);
