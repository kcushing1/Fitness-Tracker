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
    console.log("req.body of post new" + req.body);
    const addNew = {
      day: new Date(),
      exercises: [req.body],
    };
    workouts
      .create(addNew)
      .then((expl) => console.log("post new expl: " + expl))
      .catch((err) => {
        res.json(err);
      });
  });

  //PUT exercise by id
  app.put("/api/workouts/:id", (req, res) => {
    console.log("id is: " + req.params.id);
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
    console.log("inside range GET");

    workouts
      .aggregate([
        //sort most recent to least recent
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
