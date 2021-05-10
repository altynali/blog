import * as React from 'react'
import * as ReactDom from 'react-dom'
import './Article.scss'
import cat from '../../images/img.png'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { renderArticleId } from '../../actions/articleActions'
import {RootState} from '../../reducers/rootReducer'

var year, month, day;

function dateFromISO(isostr) {

    var datetime = new Date(isostr)

        year = datetime.getFullYear()

        month = datetime.getMonth() + 1
        if(month < 10){
            month = '0' + month
        }
        
        day = datetime.getDate()
        if(day < 10){
            day = '0' + day
        }
    
}
// var article;
// async function getArt(i) {
//     console.log(i);
    
//     await axios.get(`https://fullstack.exercise.applifting.cz/articles/${i?.articleId}`,{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
//                 Authorization: localStorage.getItem('access_token')}
//         })
//         .then(response => {
//             article = response.data
            
//         })

//         return article
// }

type Props = {
    articleInList: Record<string, any>
}
// const headers = {
//     'Content-Type': 'application/json',
//     'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
//     Authorization: localStorage.getItem('access_token')
// }
const Article: React.FC<Props>  = ({
    articleInList
}) => {
    
    {
        /*
        500 error
        const img = axios.get(`https://fullstack.exercise.applifting.cz/images/${article.imageId}`, {
        headers: headers
    })
    */
    }
    dateFromISO(articleInList?.createdAt)
    const dispatch = useDispatch()
    
     const {countOfComments} = useSelector((state: RootState) => state.commentReducer);
     console.log(countOfComments);

    var finalCount

     if(countOfComments[articleInList.articleId] !== undefined)
     finalCount = countOfComments[articleInList.articleId] 
     else
     finalCount = 0
    
    return(
        <div className="article item">
            <div>
                <img src={cat} alt=""/>
            </div>
            <div className='article-description'>
                <div className='article-title'>{articleInList.title}</div>
                
                <div className='article-nametime'>
                    <span>Author Author</span><span className='article-date'>{year}/{month}/{day}</span>
                </div>
                
                <div className='article-text'>
                    <p>{articleInList.perex}</p>
                </div>

                <div className='article-detail'>

                    <NavLink  to={{
                    pathname: `/whole/${articleInList.articleId}`
                    }}>Read whole article
                    </NavLink>
                    <span className='article-comments'>{finalCount} comments</span>
                    
                </div>

            </div>
        </div>
    )
}

export default Article
