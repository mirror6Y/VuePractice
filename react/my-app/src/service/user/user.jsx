import React, { Component } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import axios from 'axios';

import UserDetail from './UserDetail'
import UserAdd from './UserAdd'


class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            // loading: false,
            isLoaded: false,
            selectedRows: [],
            selectedRowKeys: [],
        };

        this.onDelete = this.onDelete.bind(this);
        this.appendPerson = this.appendPerson.bind(this);
        this.deleteBatchUser = this.deleteBatchUser.bind(this);

        this.columns = [
            { title: '主键', dataIndex: 'id', key: 'id' },
            { title: '账号', dataIndex: 'account', key: 'account', width: '8%' },
            { title: '姓名', dataIndex: 'name', key: 'name', width: '15%' },
            { title: '性别', dataIndex: 'gender', key: 'gender', width: '10%' },
            { title: '手机号码', dataIndex: 'tel', key: 'tel', width: '15%', },
            { title: '电子邮箱', dataIndex: 'email', key: 'email', width: '15%' },
            { title: '是否启用', dataIndex: 'enabled', key: 'enabled', width: '20%' },
            {
                title: '操作', dataIndex: '', key: 'operation', width: '32%', render: (text, record, index) => (
                    <span>
                        <UserDetail className="user_details" pass={record} />
                        <Popconfirm title="删除不可恢复，你确定要删除吗?" >
                            <a title="用户删除" className="mgl10" onClick={this.onDelete.bind(this, index)}>
                                <DeleteTwoTone /></a>
                        </Popconfirm>
                        <Button size="small" onClick={() => this.editHandle(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.onDelete(record.id)}>
                            <Button size="smallButton" ><DeleteTwoTone />删除</Button>
                        </Popconfirm>
                        <span className="ant-divider" />
                    </span>
                )
            },
        ];

    }

    componentDidMount() {
        console.log('getUserList');
        const url = "/system/user/getUserList";
        const _this = this;
        axios.get(url)
            .then(function (response) {
                _this.setState({
                    users: response.data.data.records,
                    isLoaded: true
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //得到子元素传过来的值
    appendPerson(event) {
        let array = [];
        let count = 0;
        this.state.users.forEach(function (element) {
            Object.keys(element).some(function (key) {
                if (key === 'nid') {
                    count++;
                    array[count] = element.nid
                }
            })
        })
        let sortData = array.sort();//对遍历得到的数组进行排序
        let MaxData = sortData[(this.state.users.length) - 1]//取最后一位下标的值
        event.key = MaxData + 1;
        event.nid = MaxData + 1;
        this.setState({
            users: [...this.state.users, event]
        })

    }

    getUserMsg = (result, msg) => {
        console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        // this.setState({
        //     childrenMsg: msg
        // })
    }

    onDelete(index) {
        console.log("deleteUser:" + index)
        const url = "/system/user/deleteUser/" + index;
        axios.delete(url)
            .then(response => { this.init() })
            .catch(function (error) {
                console.log(error);
            })
    }

    deleteBatchUser() {

        console.log("111" + this.state.selectedRowKeys)
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
        console.log('selectedRowKeys changed: ', selectedRowKeys);

    };

    render() {

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // const hasSelected = selectedRowKeys.length > 0;

        return (

            <div >

                <UserAdd parent={this} />
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.deleteBatchUser} >
                        <DeleteTwoTone />批量删除
                    </Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={this.state.users}
                />
            </div>

        );
    }
}

export default User;