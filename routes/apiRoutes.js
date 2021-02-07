const workouts = require("../models/workouts");

module.exports = function (app) {
  //GET workouts
  app.get("/api/workouts", (req, res) => {
    workouts
      .aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ])
      .then((seeWorkout) => {
        res.json(seeWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //POST a new workout
  app.post("/api/workouts", (req, res) => {
    workouts
      .create(req.body)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //PUT exercise by id
  app.put("/api/workouts/:id", (req, res) => {
    workouts
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            exercises: [req.body],
          },
        }
      )
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //range
  app.get("/api/workouts/range", (req, res) => {
    workouts
      .aggregate([
        //add total duration and total weight
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
            totalWeight: {
              $sum: "$exercises.weight",
            },
          },
        },
        //sort most recent to least recent
        {
          $sort: { _id: -1 },
        },
        // limit to 7 responses
        {
          $limit: 7,
        },
      ])
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
