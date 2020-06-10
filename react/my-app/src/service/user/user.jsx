import React, { Component } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import axios from 'axios';

import UserDetail from './UserDetail'
import UserAdd from './UserAdd'
import { formatDate } from '../../util/dateUtil'



class User extends Component {

    state = {
        users: [],
        usersLoading: false,
        selectedRowKeys: [],
        //添加模态框
        isShowCreateModal: false,
        //详情模态框
        isShowInfoModal: false,
        userInfo: {},
        updateInfo: {}
    };

    componentDidMount() {
        this.getUserList();
    }

    getUserList = () => {
        console.log('getUserList');
        const url = "/system/user/getUserList";
        const _this = this;
        axios.get(url)
            .then(function (response) {
                _this.setState({
                    users: response.data.data.records,
                    usersLoading: true
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onDelete(index) {
        console.log("deleteUser:" + index)
        const url = "/system/user/deleteUser/" + index;
        axios.delete(url)
            .then(() => { this.getUserList() })
            .catch(function (error) {
                console.log(error);
            })
    }

    batchDeletion = () => {

        console.log("批量删除" + this.state.selectedRowKeys)
    }

    toggleShowCreateModal = (visible, record) => {
        // console.log("addOrUpdate" + record);
        this.setState({
            isShowCreateModal: visible,
            updateInfo: record
        })
    }


    showInfoModal = (record) => {
        console.log("info" + record);
        this.setState({
            isShowInfoModal: true,
            userInfo: record
        })
    }

    closeInfoModal = () => {
        this.setState({
            isShowCreateModal: false,
            isShowInfoModal: false,
            userInfo: {}
        })
    }


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {

        const { userInfo, updateInfo, isShowInfoModal, selectedRowKeys, isShowCreateModal } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const columns = [
            { title: '主键', dataIndex: 'id', key: 'id' },
            { title: '账号', dataIndex: 'account', key: 'account' },
            { title: '姓名', dataIndex: 'name', key: 'name' },
            // { title: '性别', dataIndex: 'gender', key: 'gender', render: (text) => text == '1' ? '男' : '女', width: '10%' },
            { title: '部门', dataIndex: 'college', key: 'college' },
            { title: '手机号码', dataIndex: 'tel', key: 'tel' },
            // { title: '电子邮箱', dataIndex: 'email', key: 'email' },
            { title: '是否启用', dataIndex: 'enabled', key: 'enabled' },
            {
                title: '创建时间', dataIndex: 'gmtCreate', key: 'gmtCreate', render: (value) => {
                    return formatDate(new Date(value));
                }
            },
            {
                title: '操作', dataIndex: '', key: 'operation', width: '32%', render: (text, record, index) => (
                    <div style={{ textAlign: 'left' }}>
                        {/* <span> */}
                        {/* <UserDetail className="user_details" pass={record} /> */}
                        {/* <Popconfirm title="删除不可恢复，你确定要删除吗?" >
                                <a title="用户删除" className="mgl10" onClick={this.onDelete.bind(this, index)}>
                                </a>
                            </Popconfirm> */}
                        <Button size="smallButton" onClick={() => this.showInfoModal(record)}>详情</Button>
                        <span className="ant-divider" />
                        <Button size="smallButton" onClick={() => this.toggleShowCreateModal(true, record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.onDelete(record.id)}>
                            <Button size="smallButton" >删除</Button>
                        </Popconfirm>

                        {/* </span> */}
                    </div>
                )
            },
        ];

        return (

            <div >
                <div style={{ marginBottom: 16 }}>

                    <Button type='primary' onClick={() => this.toggleShowCreateModal(true, "add")}>新增</Button>&emsp;
                    <Button type="danger" onClick={this.batchDeletion} disabled={!selectedRowKeys.length}  >批量删除</Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.users}
                />
                <UserAdd visible={isShowCreateModal} updateInfo={updateInfo} toggleVisible={this.toggleShowCreateModal} onCancel={this.closeInfoModal} />
                <UserDetail visible={isShowInfoModal} userInfo={userInfo} onCancel={this.closeInfoModal} />
            </div>
            // onRegister={this.getUsers}

        );
    }
}

export default User;