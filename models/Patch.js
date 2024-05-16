// models/Patch.js
const mongoose = require('mongoose');

const PatchSchema = new mongoose.Schema({
    errorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Error', required: true },
    patchDescription: String,
    dateApplied: { type: Date, default: Date.now },
    appliedIn: { type: mongoose.Schema.Types.ObjectId, ref: 'Deployment', required: false },
});

module.exports = mongoose.model('Patch', PatchSchema);
