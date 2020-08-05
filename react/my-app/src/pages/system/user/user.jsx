import React, { Component } from 'react';
import { Card, Button, Table, Modal, notification, Space, Switch, Form, Row, Col, Select, Input, DatePicker } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

import { formatDate } from '../../../utils/dateUtil'
// import LinkButton from '../../../components/button'
import { reqUserList, reqUserAdd, reqUserDelete, reqUserEdit, reqUserSearch } from '../../../api/api.js'
import UserAdd from './userAdd'
import UserEdit from './userEdit'
import UserSearch from './userSearch'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
class User extends Component {

    addChild = React.createRef();
    editChild = React.createRef();
    formRef = React.createRef();

    state = {
        userList: [],
        //复选框 选择的用户
        user: {},
        selectedRowKeys: [],
        // 0 不显示添加和修改组件 1 显示添加 2显示修改
        showStatus: 0
    }

    initColumn = () => {
        this.columns = [
            // {
            //     title: '主键',
            //     dataIndex: 'id',
            // },
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
                dataIndex: 'enabled',
                render: () => (
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                )
            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
                render: (value) => {
                    return formatDate(value);
                }
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <Space>
                            <Button onClick={() => this.showEdit(user)}>编辑</Button>
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

    //列表搜索
    search = async () => {
        const data = this.formRef.current.getFieldsValue();
        const result = await reqUserSearch(data);
        if (result.code === 200) {
            const data = result.data.records;
            this.setState({ userList: data })
        } else {
            notification.error({
                duration: null,
                message: '提示',
                description: result.msg
            })
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
                var id = new Array(index);
                const result = await reqUserDelete(id);
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
        })
    }

    deleteBatch = () => {

        Modal.confirm({
            title: '提示',
            okText: '确定',
            cancelText: '取消',
            icon: <QuestionCircleOutlined />,
            content: '您确定删除勾选内容吗？',
            onOk: async () => {

                const ids = this.state.selectedRowKeys;

                const result = await reqUserDelete(ids);
                if (result.code === 200) {
                    notification.success({
                        duration: 2,
                        message: '提示',
                        description: result.msg
                    });
                    this.setState({
                        selectedRowKeys: []
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
        const { userList, user, showStatus, selectedRowKeys } = this.state;

        const title = (
            <span>
                <Space>
                    <Button type="primary" onClick={this.showAdd}>新增</Button>
                    <Button type="danger" disabled={!selectedRowKeys.length} onClick={this.deleteBatch}>批量删除</Button>
                </Space>
            </span>
        )

        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => this.setState({ selectedRowKeys }),
            // getCheckboxProps: (record) => ({
            //     disabled: record.id === this.props.user.id
            // })
        }

        return (
            <Card>
                <Form
                    // onFinish={this.search}
                    ref={this.formRef}
                    style={{ marginBottom: 16 }}
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <FormItem name="name" label="用户姓名">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem name="tel" label="手机号码" >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem name="enabled" label="启用状态">
                                <Select >
                                    <Option value="0">启用</Option>
                                    <Option value="1">禁用</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem name="gmtCreate" label="创建时间" >
                                <RangePicker />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <Space>
                                <Button type="primary" onClick={this.search}>搜索</Button>
                                <Button onClick={() => { this.formRef.current.resetFields(); }}>重置 </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
                <span >
                    <Space>
                        <Button type="primary" onClick={this.showAdd}>新增</Button>
                        <Button type="danger" disabled={!selectedRowKeys.length} onClick={this.deleteBatch}>批量删除</Button>
                    </Space>
                </span>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    rowKey="id"
                    onRow={this.onRow}
                    dataSource={userList}
                    style={{ marginTop: 10 }} />
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