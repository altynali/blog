import * as React from 'react'
import {useRef, useState} from 'react'
import * as ReactDom from 'react-dom'
import './Login.scss'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import {RootState} from '../../reducers/rootReducer'
import {adminLoggedIn, adminLogout, autoLogout} from '../../actions/loginActions'

const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {isLoggedIn} = useSelector((state: RootState) => state.loginReducer);

    const usernameAdmin = 'alina.altynbaeva.00@mail.ru'
    const passwordAdmin = '1234567890'

    const dispatch = useDispatch()

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(email);
        console.log(password);

        if(email === usernameAdmin && password === passwordAdmin){

            dispatch(adminLoggedIn())
            dispatch(autoLogout())
            console.log('if', isLoggedIn);
            history.push('/');
        }
        else{
            dispatch(adminLogout())
            console.log('else', isLoggedIn);
            history.push('/');
        }
        

        setEmail('')
        setPassword('')
    }

    return(
    <div className='login'>
        <div className="login-content">
            <h1>Log In</h1>
            
            <form onSubmit={(e) => {submitHandler(e)}}>
                <div className='login-email'>
                <label>
                    Email
                </label>
                    <input className='input'
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />
                </div>

                <div className='login-password'>
                <label>
                    Password
                </label>
                    <input className='input'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <button>Log In</button>
            </form>

        </div>
    </div>
    )
    
}

export default Login