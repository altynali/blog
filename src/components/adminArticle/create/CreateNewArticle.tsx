import * as React from 'react'
import * as ReactDom from 'react-dom'
import {useState} from 'react'
import './CreateNewArticle.scss'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {createNewArticle} from '../../../actions/articleActions'
import {useSelector, useDispatch} from 'react-redux'

const headers = {
    'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
    'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
    Authorization: localStorage.getItem('access_token')
}

const CreateNewArticle = () => {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [img, setImg] = useState<FormDataEntryValue>()

    const history = useHistory();
    const dispatch = useDispatch();


    const submitHandler = () => {
        
        if(!title.trim().length || !content.trim().length){
            alert('Please enter a title and content')
            return;
        }

        dispatch(createNewArticle(title, content))

        setTitle('')
        setContent('')
        setImg(null)
        //history.push('/')

        //window.location.reload(); 
    }

    const fileSelectHandler = (e) => {
        //i couldn't have passed the validation, 
               
        let file = e.target.files[0];

        var formdata = new FormData();
        formdata.append("image", e.target.files[0])
        
            axios.post('https://fullstack.exercise.applifting.cz/images', 
            {image: [{items: formdata}]}, /*
                                          i have tried 1){image: [{items: file}]}
                                          2){image: [{items: formdata}]}
                                          3){formdata}
                                          4){file}
                                          and with FileReader onload function.
                                          But access was denied(500 validation error).
                                          That's the reason why i have an image of the cat everywhere.
                                          */
            {
            headers: {
                'X-API-KEY': '371abad5-b7bf-4b12-93fc-2f8ed1c068fb',
                Authorization: localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data; boundary=' + Math.random().toString().substr(2)
            }
            })
            .then((response) => {
                console.log(response);
                
                //handle success
            }).catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
            
        
        
        
    }

    return(
        <div className='new-article'>
            <div className='new-content'>

            <div className='new-content-title'>
                <h1>Create New Article</h1>
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
                            onChange={fileSelectHandler}
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

export default CreateNewArticle