const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    testimonial: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    location: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
