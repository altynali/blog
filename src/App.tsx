import * as React from 'react'
import * as ReactDom from 'react-dom'
import "./style.scss";
import {useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import 'regenerator-runtime/runtime.js'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/login/Login';
import ArticleWhole from './components/article/ArticleWhole'
import ListOfArticles from './components/adminArticle/ListOfArticles';
import CreateNewArticle from './components/adminArticle/create/CreateNewArticle';
import { useDispatch, useSelector } from "react-redux";
import {fetchArticles} from './actions/articleActions';
import {RootState} from './reducers/rootReducer'
import {login} from './auth/authApiKey'
import EditArticle from './components/adminArticle/edit/EditArticle';


const App = () => {


    const {isLoggedIn} = useSelector((state: RootState) => state.loginReducer);
    const dispatch = useDispatch();
    
    if(localStorage.getItem("access_token") === null){
        login()
        setTimeout(() =>{
          localStorage.removeItem('access_token')
        }, 3600000)   
    }


    useEffect(() => {
        dispatch(fetchArticles())
    }, [])
        
        
    return (
    <div className="app">
        
        <Header />

        {isLoggedIn ? 
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/list" component={ListOfArticles}></Route>    
            <Route exact path="/newArticle" component={CreateNewArticle}></Route>
            <Route path="/whole/:id" children={<ArticleWhole />}></Route>
            <Route path="/list/edit/:id" children={<EditArticle/>}></Route>
        </Switch> 
        :
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>        
            <Route path="/whole/:id" children={<ArticleWhole />}></Route>
        </Switch>
        }
    
    </div>
    )
}

export default App