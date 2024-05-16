// models/Error.js
const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
    deploymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deployment', required: true },
    description: String,
    dateReported: { type: Date, default: Date.now },
    status: String
});

module.exports = mongoose.model('Error', ErrorSchema);
