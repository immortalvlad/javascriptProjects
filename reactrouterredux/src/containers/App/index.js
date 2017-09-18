import React, { Component } from 'react';
import { 
//    Link, 
    Route,
    Switch,
    NavLink,
//    Redirect
    } from 'react-router-dom';
    
import Home from '../../components/Home'
import Admin from '../../components/Admin';
import Genre from '../../containers/Genre';
import List from '../../components/List';
import NotFound from '../../components/NotFound';
import Login from '../../containers/LoginPage';
import requireAuthentication from '../../containers/AuthenticatedComponent';

import './styles.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.match.url;
//        this.checkLogin = this.checkLogin.bind(this);
    }
//    checkLogin() {
//        const login = window.localStorage.getItem('rr_login');
//        if (login === 'admin') {
//          console.log('пропусти');
//          return true;
//        }
//        return false;
//     }
    render() {
       
        return (
                <div className='container'>
                    <ul className='nav nav-pills'>
                        <li><NavLink exact to={`${this.url}`} activeClassName='active'>Home</NavLink></li>
                        <li><NavLink exact to={`${this.url}admin`} activeClassName='active'>Админка</NavLink></li>
                        <li><NavLink to={`${this.url}list`} activeClassName='active'>Список жанров</NavLink></li>
                        <li><NavLink to='/login'>Войти</NavLink></li>
                    </ul>
                    
                    <Switch>
                        <Route exact path={`${this.url}`} component={Home} />
                        <Route  path={`${this.url}admin`} component={requireAuthentication(Admin)}/>
                        <Route path={`${this.url}genre`} component={Genre} />
                        <Route path={`${this.url}list`} component={List} />
                        <Route path={`${this.url}login`} component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                )
    }
}