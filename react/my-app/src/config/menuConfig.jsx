import {
    AppstoreOutlined,
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';
import React from 'react';

const menuList=[
    {
        title:"首页",
        key:"home",
        url:"/home",
        icon:<PieChartOutlined />
    },
    {
        title:"系统信息",
        key:"system",
        icon:<MailOutlined />,
        children:[
            {
                title:"用户管理",
                key:"user",
                url:"/system/user",
                icon:""
            },
            {
                title:"角色管理",
                key:"role",
                url:"/system/role",
                icon:""
            }
        ]
    },
    {
        title:"基础信息",
        key:"basic",
        icon:<AppstoreOutlined />,
        children:[
            {
                title:"教师信息",
                key:"teacher",
                url:"",
                icon:""
            },
            {
                title:"学生信息",
                key:"student",
                url:"",
                icon:""
            }
        ]
    }
]

export default  menuList