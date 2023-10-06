import { useWorkoutContext } from "../hooks/useContext"
import { useEffect , useState } from "react"
import { UpdateWorkoutForm } from "./UpdateFrom"

// date fns 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutContext()
  const [json, setJson] = useState(null);
  const [res, setRes] = useState(null);  
  const [isUpdating, setIsUpdating] = useState(false);
  const [workoutData, setWorkoutData] = useState(workout);


  const handleClick = async () => {
    try{
      const res = await fetch('/workout/' + workout._id , {
        method: "DELETE"
      })
      const json = await res.json()

      if(res.ok){
        dispatch({type: "DELETE_WORKOUT", payload: workout})
        setJson(json);
        setRes(res);
      }
    }catch(error) {
      console.log(`Error deleting the workout : ${error}`)
    }

  }

  const toggleUpdateForm = () => {
    setIsUpdating(!isUpdating);
  };

  useEffect(() => {
    if (json && res.ok) {

      dispatch({ type: "DELETE_WORKOUT", payload: workout });
    }
  }, [json, res, workout, dispatch]);

  const handleUpdateComplete = (updatedWorkout) => {
    console.log('updates')
    setWorkoutData(updatedWorkout);
    toggleUpdateForm();
  };

  return (
    <div className="workout-details">
      {isUpdating ? (
        <UpdateWorkoutForm workoutId={workout._id} onUpdateComplete={handleUpdateComplete} />

      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workoutData.load}</p>
          <p><strong>Number of reps: </strong>{workoutData.reps}</p>
          <p><strong>Created at: </strong>{workoutData.createdAt}</p>
          <p><strong>Updated at: </strong>{formatDistanceToNow( new Date(workout.createdAt), {addSuffix: true})}</p>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
          <button onClick={toggleUpdateForm}>Update</button> 
        </>
      )}
    </div>
  )
}
  
  export default WorkoutDetails  