const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "resistance or cardio required",
      },
      name: {
        type: String,
        trim: true,
        unique: true,
        required: "exercise name required",
      },
      duration: {
        type: Number,
        min: 1,
      },
      distance: {
        type: Number,
        min: 1,
      },
      weight: {
        type: Number,
        min: 1,
      },
      reps: {
        type: Number,
        min: 1,
      },
      sets: {
        type: Number,
        min: 1,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
