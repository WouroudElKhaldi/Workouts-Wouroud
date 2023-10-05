import { useWorkoutContext } from "../hooks/useContext"
const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutContext()

  const handleClick = async () => {
    const res = await fetch('/workout/' + workout._id , {
      method: "DELETE"
    })
    const json = await res.json()

    if(res.ok){
      dispatch({type: "DELETE_WORKOUT", payload: json})
    }
  }

    return (
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p><strong>Created at: </strong>{workout.createdAt}</p>
        <p><strong>Updated at: </strong>{workout.updatedAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default WorkoutDetails  