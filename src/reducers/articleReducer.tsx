import { Reducer } from "redux";
import {ActionTypesEnum} from '../actions/actionTypes'


const initialState = {
    articles: [],
    errorMessage: '',
    article: null,
    loading: false
}

const articleReducer: Reducer = (state = initialState, action: any) => {
    switch(action.type){
        case ActionTypesEnum.FETCH_ARTICLES_REQUEST:
        return{
            ...state,
            loading: true
        }
        case ActionTypesEnum.FETCH_ARTICLES_SUCCESS:
        return{
            ...state,
            articles: action.payload,
            loading: false
        }
        case ActionTypesEnum.FETCH_ARTICLES_FAIL:
        return{
            ...state,
            errorMessage: action.payload,
            loading: false
        }
        case ActionTypesEnum.FETCH_ARTICLE_ID:
        return{
            ...state,
            loading: true

        }
        case ActionTypesEnum.FETCH_ARTICLE_ID_SUCCESS:
        return{
            ...state,
            article: action.payload,
            loading: false
            
        }
        default:
            return state
    }
}

export default articleReducer