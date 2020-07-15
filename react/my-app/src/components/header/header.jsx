import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { reqWeather } from '../../api/api'
import { formatDate } from '../../utils/dateUtil'
import memoryUtil from '../../utils/memoryUtil'
import menuList from '../../config/menuConfig'
import './header.less'

class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()),
        weather: ""
    }

    getTime = () => {
        setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({ currentTime })
        }, 1000)
    }

    getWeather = async () => {
        const { weather } = await reqWeather(330100);
        this.setState({ weather })
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.url === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.url === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title;
    }

    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    render() {

        const { currentTime, weather } = this.state;
        // const { username } = memoryUtil.user.username;
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，超级管理员</span>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);