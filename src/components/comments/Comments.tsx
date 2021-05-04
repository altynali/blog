import * as React from 'react'
import {useState} from 'react'
import './Comments.scss'
import {useDispatch, useSelector} from 'react-redux'
import {createNewComment} from '../../actions/commentActions'
import {RootState} from '../../reducers/rootReducer'
import upvote from '../../images/upvote.png'
import downvote from '../../images/downvote.png'
import {upVote, downVote} from '../../actions/commentActions'

type Props = {
    article: Record<string, any>
}

function getLocalISOTime(twDate) {
    var tzoffset = (new Date(twDate)).getTimezoneOffset() * 60000; //offset in milliseconds
    
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
// => '2015-01-26T06:40:36.181'
    return localISOTime;
}

const Comments: React.FC<Props
> = ({
    article
}) => {


    const [comment, setComment] = useState<string>('')
    const dispatch = useDispatch()


    
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        if(!comment.trim().length){
            return;
        }

        dispatch(createNewComment(comment, article.articleId, article.comments.length))

        setComment('')
        console.log(article.comments.length + 1);
        
        //window.location.reload()
    }

        var month, day, hour, today, todayHour, resultDay;

        function dateFromISO(isostr) {

            var datetime = new Date(isostr)
            var todayFull = new Date()

            //console.log(isostr);
            

            month = datetime.getMonth() + 1
            if(month < 10){
                month = '0' + month
            }
            day = datetime.getDate()

            today = todayFull.getDate()
            todayHour = todayFull.getHours()

            
            if(day === today - 1){
                resultDay = 'Yesterday'
            }
            else if(day < today){
                resultDay = `created at ${day}/${month}`
            }
            else{
                hour = getLocalISOTime(isostr);
                //console.log(hour);
                
                hour = hour.substring(11, 13);
                resultDay = `${todayHour-hour} hours ago`   
                //console.log(todayHour, hour);
                             
            }        

        }
    

    
    return(
        <div>
            <h2>Comments ({article?.comments.length})</h2>

            <form onSubmit={(e) => submitHandler(e)}>
                <div className='new-title'>
                    <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={(e) => {setComment(e.target.value)}}
                    placeholder='Join the conversation'
                    />
                </div>
            </form>

            <div className='comment-block'>
                {article?.comments.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
                .map((comment => {
                    
                        dateFromISO(comment.createdAt)

                        var finalScore;

                        if(comment.score === 0){
                            finalScore = '0'
                        }
                        else if(comment.score > 0){
                            finalScore = '+' + comment.score
                        }
                        else{
                            finalScore = comment.score
                        }

                        return (
                            <div className='comment' key={comment.commentId}>
                                <span className='comment-author'>{comment.author}</span>
                                <span className='comment-time'>{resultDay}</span>

                                <p>{comment.content}</p>

                                <div className='comment-vote'>                                    
                                    <span>{finalScore}</span>
                                    <span onClick={() => {dispatch(upVote(comment.commentId)); window.location.reload()}}>
                                        <img src={upvote} alt=""/>
                                    </span>
                                    <span onClick={() => {dispatch(downVote(comment.commentId)); window.location.reload()}}>
                                        <img src={downvote} alt=""/>
                                    </span>
                                </div>
                            </div>
                            )
                }))}
            </div>
        </div>
    )
}

export default Comments