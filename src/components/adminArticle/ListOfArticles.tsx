import * as React from 'react'
import * as ReactDom from 'react-dom'
import './ListOfArticles.scss'
import ArticleRow from './ArticleRow'
import {NavLink} from 'react-router-dom'
import CreateNewArticle from './create/CreateNewArticle'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../../reducers/rootReducer'

const ListOfArticles = () => {
    
    const {articles, loading} = useSelector((state: RootState) => state.articleReducer);

    const dispatch = useDispatch()

    return(
        <div className='list'>
            <div className='list-title'>
                <h1>My Articles</h1>
                
                <NavLink to='/newArticle' className='to-create'>
                    <button>
                        Create new article
                    </button>
                </NavLink>
            </div>

            <div className='list-articles'>
                <ul className='list-article-title'>

                    <input type="checkbox"/>

                    <li className='article-title'>Article title</li>
                    <li className='article-perex'>Perex</li>
                    <li>Author</li>
                    <li># of comments</li>
                    <li>Actions</li>

                </ul>
                <div className='hr'></div>
                { loading ? <div>LOADING!</div>
                
                : articles?.map(article =>{
                    return <ArticleRow article={article} key={article.articleId}/>
                })}
            </div>
        </div>
    )
}

export default ListOfArticles