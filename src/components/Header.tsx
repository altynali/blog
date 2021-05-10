import * as React from 'react'
import * as ReactDom from 'react-dom'
import logo from '../images/index1.svg'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from './../reducers/rootReducer'
import './Header.scss'
import {adminLogout} from '../actions/loginActions'
import { useHistory } from "react-router-dom";


const Header: React.FC = () => {
    
    const {isLoggedIn} = useSelector((state: RootState) => state.loginReducer);

    const classes = [];

    const dispatch = useDispatch()
    const history = useHistory();

    const logOut = () => {
        dispatch(adminLogout())
        history.push('/');
    }

    {isLoggedIn ? classes?.push('logged-in-right'): classes?.push('header-right')}

    
    return(
        <div className='header'>
            <div className='header-left'>
                <img src={logo} className='header-logo' alt=""/>
                <NavLink to='/' className='header-link header-link-0'>Recent Articles</NavLink>
                <NavLink to='' className='header-link header-link-1'>About</NavLink>
            </div>
            
            <div className={classes[0]}>
                {isLoggedIn 
                ? (
                <div className='logged-in'>
                    <NavLink to='/list' className='header-link header-link-1'>My Articles</NavLink>
                    <NavLink to='/newArticle' className='header-link header-link-1 header-create'>Create New Article</NavLink>
                    <span onClick={logOut} className='header-link header-link-2 logout'>Log Out</span>
                </div>
                )
                : <NavLink to='/login' className='header-link header-link-2'>Log In</NavLink>
                }
                
                
            </div>
        </div>
    )
}

export default Header
