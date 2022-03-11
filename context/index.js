import {createContext, useEffect, useReducer} from 'react'

// initialize state
const initialState = {
    user: null,
}

// create context
const Context = createContext()

// create reducer function
// anytime you dispatch an action it returns the type and payload
const rootReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload} // return user payload
        case 'LOGOUT':
            return {...state, user: null} // return null user
        default:
            return state
    }
}

// context provider, use provider to wrap app so state is available
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}