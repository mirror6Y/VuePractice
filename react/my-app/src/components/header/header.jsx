import React, { Component } from 'react';
import './header.less'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，超级管理员</span>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2019-07-15 10:55:20</span>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;