const workouts = require("../models/workouts");

module.exports = function (app) {
  //GET workouts
  app.get("/api/workouts", (req, res) => {
    workouts
      .find({})
      .then((seeWorkout) => {
        res.json(seeWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //POST a new workout
  app.post("/api/workouts", (req, res) => {
    console.log(req.body);
    workouts
      .create(req.body)
      .then((expl) => console.log(expl))
      .catch((err) => {
        res.json(err);
      });
  });

  //PUT exercise by id
  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
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
};
