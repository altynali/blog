import * as React from 'react'
import * as ReactDom from 'react-dom'
import './Home.scss'
import Article from './article/Article'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import { RootState } from '../reducers/rootReducer'
import {fetchArticles, renderArticleId} from '../actions/articleActions'

const Home: React.FC = () => {

    const {articles} = useSelector((state: RootState) => state.articleReducer);


    return(
        <div className='home'>
            <h1 className='home-title item'>Recent Articles</h1>
            
            {articles.length !== 0 && articles.map(article =>{
                return <Article articleInList={article} key={article.articleId}/>
            })}


        </div>
    )
}

export default Home