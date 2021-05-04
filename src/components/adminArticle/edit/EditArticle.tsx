import * as React from 'react'
import * as ReactDom from 'react-dom'
import {useState, useEffect} from 'react'
import '../create/CreateNewArticle.scss'
import {useHistory} from 'react-router-dom'
import {createNewArticle} from '../../../actions/articleActions'
import {useSelector, useDispatch} from 'react-redux'
import { useLocation, useParams} from 'react-router-dom'
import {RootState} from '../../../reducers/rootReducer'
import {renderArticleId, editArticle} from '../../../actions/articleActions'
import axios from 'axios'

const EditArticle = () => {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [img, setImg] = useState<FormDataEntryValue>()

    const history = useHistory();
    const dispatch = useDispatch();

    let { id } = useParams();
    const {article} = useSelector((state: RootState) => state.articleReducer);

    useEffect(() =>{
        dispatch(renderArticleId(id))
    }, [id])
    
    useEffect(() =>{
        setTitle(article?.title)
        setContent(article?.content)
    }, [article])


    const submitHandler = () => {
        
        if(!title.trim().length || !content.trim().length){
            alert('Please enter a title and content')
            return;
        }

        dispatch(editArticle(article, title, content))

        //alert('Article edited')
        history.push('/')
        
    }


    return(
        <div className='new-article'>
            <div className='new-content'>

            <div className='new-content-title'>
                <h1>Edit Article</h1>
                <button onClick={submitHandler}>Publish article</button>
            </div>
            
            <form>
                <div className='new-title'>
                <label>
                    Article Title
                </label>
                    <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder='My First Article'
                    />
                </div>

                <div>
                    <label>
                        Featured image
                    </label>
                    <label className='new-img-file'>
                        Upload an Image
                            <input
                            type="file"
                            name="image"
                            className='new-img'
                            //onChange={fileSelectHandler}
                            />
                    </label>
                    </div>

                <div className='new-perex'>
                <label>
                    Content
                </label>
                    <textarea
                    name="title"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                    placeholder='Supports markdown. Yay!'>
                    </textarea>
                </div>
            </form>
            {}
            </div>
        </div>
    )    
}

export default EditArticle