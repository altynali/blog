import { ActionTypesEnum } from "./actionTypes";
import {Dispatch} from 'redux'
//import { useDispatch } from "react-redux";
import axios from 'axios'

const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
    Authorization: localStorage.getItem('access_token')
}

const api = axios.create({
    baseURL: 'https://fullstack.exercise.applifting.cz',
    headers: headers
})

export const ArticleActions = {
    fetchArticlesRequest: () => {
        return {
            type: ActionTypesEnum.FETCH_ARTICLES_REQUEST 
            
          }
    },
    fetchArticlesSuccess: (articles: Array<object>) => {
        return {
            type: ActionTypesEnum.FETCH_ARTICLES_SUCCESS,
            payload: articles
          }
    },
    ArticleFail: (error: string) => {
        return {
            type: ActionTypesEnum.FETCH_ARTICLES_FAIL,
            payload: error
          }
    },
    fetchArticleId: () => {
        return{
            type: ActionTypesEnum.FETCH_ARTICLE_ID
        }
    },
    fetchArticleIdSuccess: (article: object) => {
        return{
            type: ActionTypesEnum.FETCH_ARTICLE_ID_SUCCESS,
            payload: article
        }
    }
};


export const fetchArticles = () => {
    return async (dispatch: Dispatch) => {

        dispatch(ArticleActions.fetchArticlesRequest())    
        console.log(localStorage.getItem('access_token'));    

        await api.get('/articles')
        .then(response =>{
            const articles = response.data.items
            dispatch(ArticleActions.fetchArticlesSuccess(articles))
        })
        .catch( (error) => {
            dispatch(ArticleActions.ArticleFail(error))
        });
    }
}

export const renderArticleId = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(ArticleActions.fetchArticleId())

        await api.get(`/articles/${id}`)
        .then(response =>{
            const article = response.data
            dispatch(ArticleActions.fetchArticleIdSuccess(article))
        })
        .catch( (error) => {
            dispatch(ArticleActions.ArticleFail(error))
        });
    }
}

export const deleteArticle = (id: string) => {
    
    return async (dispatch: Dispatch) => {
        await api.delete(`/articles/${id}`)
        .then(response =>{
            console.log(response);
            fetchArticles()
        })
        .catch((error) =>{
            dispatch(ArticleActions.ArticleFail(error))
        })

        window.location.reload();
    }
     
}

export const createNewArticle = (title: string, content: string) => {

    const date = new Date().toISOString()

    return async (dispatch: Dispatch) => {
        await api.post('/articles', {
            "title": title,
            "perex": 'This is perex: '+ title,
            "imageId": "4352aa53-c9f7-4d79-baf2-4e5a388a835b",
            "createdAt": date,
            "lastUpdatedAt": date,
            "content": content
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) =>{
            dispatch(ArticleActions.ArticleFail(error))
        })
    }
     
}

export const editArticle = (article, title: string, content: string) => {

    const date = new Date().toISOString()
    
    return async (dispatch: Dispatch) => {
        await api.patch(`/articles/${article.articleId}`, {
            "title": title,
            "perex": article.perex,
            "imageId": article.imageId,
            "createdAt": article.createdAt,
            "lastUpdatedAt": date,
            "content": content
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) =>{
            dispatch(ArticleActions.ArticleFail(error))
        })
    }
     
}
