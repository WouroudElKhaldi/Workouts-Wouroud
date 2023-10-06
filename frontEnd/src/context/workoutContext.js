import { createContext , useReducer } from "react";

export const WorkoutsContext = createContext()

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS' :
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT' :
            console.log('deleting workout' , action.payload)
            return{
                workouts : state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT' :
            const updatedWorkout = action.payload;
            const updatedWorkouts = state.workouts.map((workout) =>
              workout._id === updatedWorkout._id ? updatedWorkout : workout
            );
            return {
              workouts: updatedWorkouts,
            }
        default: 
        return state
    }
}

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, {
        workouts: null
    })

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}