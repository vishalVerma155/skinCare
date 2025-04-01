const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    colors: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every(hex => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex));
        },
        message: 'Invalid hex color code in array'
      }
    }
  }, { timestamps: true });
  
  const Color = mongoose.model('Color', ColorSchema);

  module.exports = Color;