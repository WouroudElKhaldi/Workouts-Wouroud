import { WorkoutsContext } from "../context/workoutContext";
import { useContext } from "react";
export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error('useContext must be used inside a contextProvider')
    }

    return context 
}