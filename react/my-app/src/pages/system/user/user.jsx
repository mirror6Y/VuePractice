import React, { Component } from 'react';
import { Card, Button, Table, Modal, notification } from 'antd'

import { reqUserList, reqUserAdd } from '../../../api/api.js'
import UserAdd from './userAdd'

class User extends Component {

    child = React.createRef();


    state = {
        userList: [
            {
                key: '1',
                account: '1',
                name: 'John Brown',
                college: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                account: '2',
                name: 'Jim Green',
                college: 40,
                address: 'London Park',
            },
        ],
        //复选框 选择的用户
        user: {},
        isShowAdd: false
    }

    initColumn = () => {
        this.columns = [
            {
                title: '主键',
                dataIndex: 'id',
            },
            {
                title: '账号',
                dataIndex: 'account',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '部门',
                dataIndex: 'college',
            },
            {
                title: '手机号码',
                dataIndex: 'tel'
            },
            {
                title: '是否启用',
                dataIndex: 'enabled'
            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
            }
        ]
    }

    getUserList = async () => {
        const result = await reqUserList();
        console.log("getUserList:" + result.data.records)
        if (result.code === 200) {
            const data = result.data.records;
            this.setState({ userList: data })
        }
    }

    onRow = (user) => {
        return {
            onClick: event => {
                console.log(user);
            }
        }
    }

    addUser = async () => {
        const data = this.child.current.addRef.current.getFieldsValue();
        console.log(data)
        const result = await reqUserAdd(data);
        if (result.code === 200) {
            this.setState({ isShowAdd: false })
            notification.success({
                duration: 1,
                message: '提示',
                description: result.msg
            });
            this.getUserList();

        } else {
            notification.error({
                duration: 1,
                message: '提示',
                description: result.msg
            })
        }
    }

    componentWillMount() {
        this.initColumn();
    }

    componentDidMount() {
        this.getUserList();
    }

    render() {

        const { userList, user, isShowAdd } = this.state;
        const title = (
            <span>
                <Button type="primary" onClick={() => { this.setState({ isShowAdd: true }) }}>新增</Button>
                <Button type="primary" disabled={!user.id}>批量删除</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    rowSelection={{ type: "checkout" }}
                    columns={this.columns}
                    onRow={this.onRow}
                    dataSource={userList} />
                <Modal visible={isShowAdd} title="添加用户" okText='确定'
                    cancelText='取消' onOk={this.addUser} onCancel={() => {
                        this.setState({ isShowAdd: false })
                        // this.props.form.resetFields()
                    }} >
                    <UserAdd ref={this.child}></UserAdd>
                </Modal>
            </Card>
        );
    }
}

export default User;