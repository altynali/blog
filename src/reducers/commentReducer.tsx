import { Reducer } from "redux";
import {ActionTypesEnum} from '../actions/actionTypes'


const initialState = {
    errorMessage: '',
    cnt: 0,
    countOfComments: null
}

const commentReducer: Reducer = (state = initialState, action: any) => {
    switch(action.type){
        case ActionTypesEnum.NEW_COMMENT_CNT:
            return{
                ...state,
                countOfComments: {
                    ...state.countOfComments,
                    [action.id]: action.count + 1
                }                
            }
        case ActionTypesEnum.NEW_COMMENT_FAIL:
            return{ 
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }

}

export default commentReducer