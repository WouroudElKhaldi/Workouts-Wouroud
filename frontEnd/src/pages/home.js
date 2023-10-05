import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import Form from "../components/form"

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/workout')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: "SET_WORKOUTS", payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <Form/>
    </div>
  )
}

export default Home ;