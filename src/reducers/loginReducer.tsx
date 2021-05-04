import { Reducer } from "redux";
import {ActionTypesEnum} from '../actions/actionTypes'

const initialState = {
    isLoggedIn: false
}

const loginReducer: Reducer = (state = initialState, action: any) => {
    switch(action.type){
        case ActionTypesEnum.ADMIN_LOGGED_IN:
            return{
                ...state,
            isLoggedIn: true
        }
        case ActionTypesEnum.ADMIN_LOGOUT:
            return{
                ...state,
            isLoggedIn: false
        }

        default:
            return state
    }
}

export default loginReducer