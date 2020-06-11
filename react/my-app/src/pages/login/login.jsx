import React, { Component } from 'react';
import './login.less'
import logo from './images/log.jpg'

class login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <h1>CityMis</h1>
                    <img src={logo} alt="logo"></img>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                </section>
            </div>
        );
    }
}

export default login;