import * as React from 'react'
import * as ReactDom from 'react-dom'
import editIcon from '../../images/edit.svg'
import deleteIcon from '../../images/delete.svg'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {deleteArticle} from '../../actions/articleActions'
import {RootState} from '../../reducers/rootReducer'

type Props = {
    article: Record<string, any>
}

const ArticleRow: React.FC<Props> = ({
    article
}) => {

    const dispatch = useDispatch()    

    const {countOfComments} = useSelector((state: RootState) => state.commentReducer);
     console.log(countOfComments);

    return(
    <div>
            <ul>
                <input type="checkbox"/>

                    <li className='article-title'>
                        <NavLink to={{
                        pathname: `/whole/${article.articleId}`
                        }} >
                            {article.title}
                        </NavLink>
                    </li>
                    
                    <li className='article-perex'>{article.perex}</li>
                    <li>Elisabeth Strain</li>
                    <li>{countOfComments[article.articleId]}</li>
                    <li className='article-buttons'>
                        
                        <NavLink  
                            to={{
                            pathname: `/list/edit/${article.articleId}`
                            }}
                            onClick={() => window.location.reload()}
                            >
                                <img src={editIcon}
                                alt='edit' className='edit'/>
                        </NavLink>
                        <span onClick={() => dispatch(deleteArticle(article.articleId))} >
                            <img src={deleteIcon} alt='delete' className='delete'/>
                        </span>
                        
                    </li>

            </ul>
        <div className="hr"></div>
    </div>
    )
}

export default ArticleRow