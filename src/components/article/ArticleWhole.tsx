import * as React from 'react'
import * as ReactDom from 'react-dom'
import cat from '../../images/img.png'
import './ArticleWhole.scss'
import { useParams} from 'react-router-dom'
import {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../../reducers/rootReducer';
import {renderArticleId} from '../../actions/articleActions'
import Comments from '../comments/Comments'

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

const ArticleWhole: React.FC = () => {
    
    const dispatch = useDispatch()
    let { id } = useParams();
    
    useEffect(() =>{
        dispatch(renderArticleId(id))
    }, [id])

    const {article, articles} = useSelector((state: RootState) => state.articleReducer);
    
    dateFromISO(article?.createdAt)


    // var cnt;

    // const commentCount = (len: number) => {
    //     cnt = len;
    //     cnt++;
    // }
    // console.log(cnt);
    
    const items = [];

    const resentArticles = articles.filter(item => item?.articleId !== article?.articleId)

    console.log(resentArticles);
    

    for(let i = 0; i < 4; i++){
        items.push(
            <div className='whole-right-text'>
                <h4>{resentArticles[i]?.title}</h4>
                <p>{resentArticles[i]?.perex}</p>
            </div>
        )
    }

    return(
    <div className="whole">
        <div className="whole-left">
            <h1 className='whole-title'>{article?.title}</h1>
            
            <div className='article-nametime'>
                    <span>Author Author</span><span className='article-date'>{year}/{month}/{day}</span>
            </div>
            <img src={cat} alt=""/>
            <div className='whole-text'>
                <p>
                {article?.content}
                </p>
            </div>

            <div className='hr'></div>
            
            
            <Comments article={article}/>

            

        </div>
        <div className='vr'></div>

        <div className='whole-right'>
            <h2>Related articles</h2>
            {items}
        </div>
    </div>
    )
}

export default ArticleWhole