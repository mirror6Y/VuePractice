import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';
import './nav.less';
import logo from '../../assets/images/log.jpg';


const { SubMenu } = Menu;
class Nav extends Component {

    state = {
        collapsed: false,
    };

    render() {
        return (
            <div>
                <div className="nav">
                    <Link to='/home' className="nav-header">
                        <img src={logo} alt="logo"></img>
                        <h1>CityMis后台</h1>
                    </Link>

                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item key="1" >
                            <PieChartOutlined /><Link to='/home'>首页</Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<MailOutlined />} title="系统信息">
                            <Menu.Item key="5"><Link to='/system/user'>用户管理</Link></Menu.Item>
                            <Menu.Item key="6"><Link to='/system/role'>角色管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="基础信息">
                            <Menu.Item key="9">教师信息</Menu.Item>
                            <Menu.Item key="10">学生信息</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>

        );
    }
}

export default Nav