const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: [4, 'Trip code must contain at least 4 characters']
    },
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true
    },
    length: {
      type: String,
      required: [true, 'Trip length is required'],
      trim: true
    },
    start: {
      type: String,
      required: [true, 'Trip start information is required'],
      trim: true
    },
    resort: {
      type: String,
      required: [true, 'Resort is required'],
      trim: true
    },
    perPerson: {
      type: Number,
      required: [true, 'Per-person price is required'],
      min: [0, 'Per-person price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Trip image is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Trip description is required'],
      trim: true,
      minlength: [10, 'Trip description must contain at least 10 characters']
    }
  },
  {
    collection: 'trips',
    timestamps: true
  }
);

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
