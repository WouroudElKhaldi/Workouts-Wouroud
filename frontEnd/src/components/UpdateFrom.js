import React, { useState, useEffect } from "react";
import { useWorkoutContext } from "../hooks/useContext";

export const UpdateWorkoutForm = ({ workoutId , onUpdateComplete}) => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    load: "",
    reps: "",
  });

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const workout = {title, load , reps}
        const response = await fetch(`/workout/${workoutId}`);
        console.log("URL:", `/workout/${workoutId}`); 
        if (response.ok) {
          const workoutData = await response.json();
          setFormData({
            title: workoutData.title,
            load: workoutData.load,
            reps: workoutData.reps,
          });
          setTitle('')
          setLoad('')
          setReps('')
        } else {
          console.error("Error fetching workout data");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchWorkoutData();
  }, [load, reps, title, workoutId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); 

    try {
      const response = await fetch(`/workout/${workoutId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedWorkout = await response.json();
        console.log("Updated Workout Data:", updatedWorkout);
        console.log("Updated Workout Data:", updatedWorkout);
        setFormData(updatedWorkout);
        dispatch({ type: "UPDATE_WORKOUT", payload: updatedWorkout });
        onUpdateComplete(updatedWorkout);
      }
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="load">Load (kg):</label>
      <input
        type="number"
        name="load"
        id="load"
        value={formData.load}
        onChange={handleChange}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        name="reps"
        id="reps"
        value={formData.reps}
        onChange={handleChange}
      />
    
      <button type="submit">Update Workout</button>
    </form>
  );
};
