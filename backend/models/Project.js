const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Residential', 'Commercial', 'Interior', 'Farmhouse', 'Survey', 'Other'],
      default: 'Residential'
    },
    location: { type: String, trim: true },
    year: { type: Number },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Completed', 'Ongoing', 'Upcoming'],
      default: 'Completed'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
