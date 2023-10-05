const Workout = require("../modules/schema");
const mongoose = require("mongoose");

// get all workouts
const getAll = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }); // descending order
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get one workout by id
const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: `workout with id ${id} dosn't exist` });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      res.status(404).json({ error: `workout with id ${id} dosn't exist` });
    } else {
      res.status(200).json(workout);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ceate a workout
const create = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update a workout by id
const update = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: `workout with id ${id} dosn't exist` });
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({
        error: `workout with id ${id} dosn't exist`,
      });
    } else {
      return res.status(200).json({
        message: `workout with id ${id} and name : ${workout.title} id updated`,
        data: workout,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internel Server Error" });
  }
};

// delete a workout by id
const deleteId = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: `workout with id ${id} dosn't exist`,
      });
    }
    const workout = await Workout.findByIdAndDelete(id);
    const workouts = await Workout.find({}).sort({ createdAt: -1 }); // descending order
    if (!workout) {
      res.status(404).json({
        error: `workout with id ${id} dosn't exist`,
      });
    } else {
      res.status(200).json({
        message: `workout with id : ${id} , name: ${workout.title} is deleted`,
        data: workouts,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internel Server Error" });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteId,
  update,
};
