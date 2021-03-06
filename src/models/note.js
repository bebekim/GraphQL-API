// Require the mongoose library
const mongoose = require('mongoose');

// Define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    // Assign createdAt and updatedAt fields with a Data type
    timestamps: true
  }
);

// Definte the Note model with the schema
const Note = mongoose.model('Note', noteSchema);
// Export the module
module.exports = Note;
