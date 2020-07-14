import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import './nav.less';
import logo from '../../assets/images/log.jpg';
import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;
class Nav extends Component {

    state = {
        collapsed: false,
    };

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.childern) {
                return (
                    <Menu.Item key={item.key} >
                        {item.icon}
                        <Link to={item.url}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {/* <Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item>
                        <Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item> */}
                        {this.getMenuNodes(item.childern)}
                    </SubMenu>
                )
            }

        })
    }

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
                        {
                            this.getMenuNodes(menuList)
                        }


                        {/* <Menu.Item key="1" >
                            <PieChartOutlined /><Link to='/home'>首页</Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<MailOutlined />} title="系统信息">
                            <Menu.Item key="5"><Link to='/system/user'>用户管理</Link></Menu.Item>
                            <Menu.Item key="6"><Link to='/system/role'>角色管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="基础信息">
                            <Menu.Item key="9">教师信息</Menu.Item>
                            <Menu.Item key="10">学生信息</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </div>
            </div>

        );
    }
}

export default Nav