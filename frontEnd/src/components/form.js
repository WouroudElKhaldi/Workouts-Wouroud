import { useState } from "react";
import { useWorkoutContext } from "../hooks/useContext";

const Form = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load , reps}
        const res = await fetch('/workout' , {
            method: 'POST', 
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await res.json()
        if (!res.ok){
            setError(json.error)
        }
        if (res.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New workout added', json)
            dispatch({type: "CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label htmlFor="title">Title :</label>
            <input 
                type="text" 
                name="title" 
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title} />

            <label htmlFor="load">load (in kg):</label>
            <input 
                type="number" 
                name="load" 
                id="load"
                onChange={(e) => setLoad(e.target.value)}
                value={load} />

            <label htmlFor="reps">reps :</label>
            <input 
                type="number" 
                name="reps" 
                id="reps"
                onChange={(e) => setReps(e.target.value)}
                value={reps} />

            <button type="submit">Add Wrokout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Form ;