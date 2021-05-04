import axios from 'axios'
import { ActionTypesEnum } from "./actionTypes";
import {Dispatch} from 'redux'

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
    Authorization: localStorage.getItem('access_token')
}

const api = axios.create({
    baseURL: 'https://fullstack.exercise.applifting.cz',
    headers: headers
})

export const CommentActions = {
    newCommentCnt: (id: string, count: number) =>{
        return{ 
            type: ActionTypesEnum.NEW_COMMENT_CNT,
            id, 
            count
        }
    },
    commentFail: (error: string) => {
        return {
            type: ActionTypesEnum.NEW_COMMENT_FAIL,
            payload: error
          }
    }
};

export const createNewComment = (comment: string, id: string, count: number) => {
    return async (dispatch: Dispatch) => {
        await api.post('/comments', {
            "articleId": id,
            "author": "Author Author",
            "content": comment
        })
        .then((response) => {
            console.log(response.data);
            dispatch(CommentActions.newCommentCnt(id, count))
        })
        .catch((error) =>{
            dispatch(CommentActions.commentFail(error))
        })
    }
    
}

// export const newComment = (id: string, count: number) => {  
//         return {
//             type: ActionTypesEnum.NEW_COMMENT
            
//           }
// }

export const upVote = (id: string) => {
    
    return async () => {
        await api.post(`/comments/${id}/vote/up`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

}

export const downVote = (id: string) => {

    return async () => {
        await api.post(`/comments/${id}/vote/down`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
}