import { ActionTypesEnum } from "./actionTypes";
import {Dispatch} from 'redux'

export const adminLoggedIn = () => {
    return{
        type: ActionTypesEnum.ADMIN_LOGGED_IN
    }   
}
export const adminLogout = () => {
    return{
        type: ActionTypesEnum.ADMIN_LOGOUT
    }   
}

export const autoLogout = () => {
    return (dispatch: Dispatch) => {
        setTimeout(() => {
            dispatch(adminLogout())
        }, 3600000);
    }
}