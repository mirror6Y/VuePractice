import React, { Component } from 'react';
import { Card, Button, Table, Modal, notification, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

// import LinkButton from '../../../components/button'
import { reqUserList, reqUserAdd, reqUserDel, reqUserEdit } from '../../../api/api.js'
import UserAdd from './userAdd'
import UserEdit from './userEdit'

class User extends Component {

    addChild = React.createRef();
    editChild = React.createRef();

    state = {
        userList: [
            // {
            //     key: '1',
            //     account: '1',
            //     name: 'John Brown',
            //     college: 32,
            //     address: 'New York Park',
            // },
            // {
            //     key: '2',
            //     account: '2',
            //     name: 'Jim Green',
            //     college: 40,
            //     address: 'London Park',
            // },
        ],
        //复选框 选择的用户
        user: {},
        // 0 不显示添加和修改组件 1 显示添加 2显示修改
        showStatus: 0
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
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <Space>
                            <Button onClick={() => this.showEdit(user)}>编辑</Button>
                            {/* <Button onClick={() => this.showInfoModal(record)}>详情</Button>
                            <Button onClick={() => this.toggleShowCreateModal(true, record)}>编辑</Button> */}
                            <Button type='danger' onClick={() => this.deleteUser(user.id)}>删除</Button>
                        </Space>
                    </span>
                )
            }
        ]
    }

    getUserList = async () => {
        const result = await reqUserList();

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

    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    //显示添加组件
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    //显示编辑组件
    showEdit = (user) => {
        //保存对象
        this.editData = user;
        console.log("::" + JSON.stringify(user))
        this.setState({
            showStatus: 2
        })
    }

    //添加信息
    addUser = async () => {

        this.setState({ showStatus: 0 });

        const data = this.addChild.current.addRef.current.getFieldsValue();
        this.addChild.current.addRef.current.resetFields();

        const result = await reqUserAdd(data);
        if (result.code === 200) {
            notification.success({
                duration: 2,
                message: '提示',
                description: result.msg
            });

            this.getUserList();
        } else {
            notification.error({
                duration: null,
                message: '提示',
                description: result.msg
            })
        }

    }

    //编辑信息
    editUser = async () => {

        this.setState({ showStatus: 0 });

        const data = this.editChild.current.editRef.current.getFieldsValue();
        console.log("编辑后的数据：" + JSON.stringify(data))
        this.editChild.current.editRef.current.resetFields();

        const result = await reqUserEdit(data);
        if (result.code === 200) {

            notification.success({
                duration: 2,
                message: '提示',
                description: result.msg
            });
            this.getUserList();
        } else {
            notification.error({
                duration: null,
                message: '提示',
                description: result.msg
            })
        }

    }

    //删除信息
    deleteUser = (index) => {

        Modal.confirm({
            title: '提示',
            okText: '确定',
            cancelText: '取消',
            icon: <QuestionCircleOutlined />,
            content: '您确定删除此条内容吗？',
            onOk: async () => {

                const result = await reqUserDel(index);
                if (result.code === 200) {

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
        })
    }

    componentWillMount() {
        this.initColumn();
    }

    componentDidMount() {
        this.getUserList();
    }

    render() {

        const editData = this.editData;
        const { userList, user, showStatus } = this.state;

        const title = (
            <span>
                <Space>
                    <Button type="primary" onClick={this.showAdd}>新增</Button>
                    <Button type="primary" disabled={!user.id}>批量删除</Button>
                </Space>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    rowSelection={{ type: "checkout" }}
                    columns={this.columns}
                    onRow={this.onRow}
                    dataSource={userList} />
                <Modal visible={showStatus === 1} title="添加用户" okText='确定'
                    cancelText='取消' onOk={this.addUser} onCancel={this.handleCancel} >
                    <UserAdd ref={this.addChild}></UserAdd>
                </Modal>
                <Modal visible={showStatus === 2} title="编辑用户" okText='确定'
                    cancelText='取消' onOk={this.editUser} onCancel={this.handleCancel} >
                    <UserEdit ref={this.editChild} userData={editData}></UserEdit>
                </Modal>
            </Card >
        );
    }
}

export default User;