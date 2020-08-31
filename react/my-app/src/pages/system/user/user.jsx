import React, { Component } from 'react';
import { Card, Button, Table, Modal, notification, Space, Switch, Form, Row, Col, Select, Input, DatePicker } from 'antd'
import { QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { formatDate, parseDate } from '../../../utils/dateUtil'
// import LinkButton from '../../../components/button'
import { reqUserList, reqUserAdd, reqUserDelete, reqUserEdit, reqUserStatusEdit, reqUserSearch } from '../../../api/api.js'
import UserAdd from './userAdd'
import UserEdit from './userEdit'

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
        selectedRowKeys: [],
        // 0 不显示添加和修改组件 1 显示添加 2显示修改
        showStatus: 0,
        pagination: {
            total: 0,
            current: 1,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50, 100],
            showQuickJumper: true,
            showSizeChanger: true
        },

    }

    initColumn = () => {
        this.columns = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return (
                        <span>{(this.state.pagination.current - 1) * this.state.pagination.pageSize + (index + 1)}</span>
                    )
                }
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
                dataIndex: 'enabled',
                render: (text, record, index) => (
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={text === 0 ? 1 : 0} defaultChecked onChange={() => this.onChange(text, record)} />
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

    getUserList = async (current = 1, pageSize = 10) => {
        const { pagination } = this.state;

        const data = this.formRef.current.getFieldsValue();
        data.pageNum = current;
        data.pageSize = pageSize;

        const result = await reqUserSearch(data);

        if (result.code === 200) {
            const data = result.data.records;
            this.setState({
                userList: data,
                pagination: {
                    ...pagination,
                    total: result.data.total,
                    current: current,
                    pageSize: pageSize
                }
            })
        }
    }

    //列表搜索
    search = async () => {
        const data = this.formRef.current.getFieldsValue();
        if (data.gmtCreate) {
            data.gmtCreate = parseDate(data.gmtCreate[0]._d) + "&" + parseDate(data.gmtCreate[1]._d)
        }
        const result = await reqUserSearch(data);
        if (result.code === 200) {
            const data = result.data.records;
            this.setState({ userList: data })
        }
    }


    //table分页
    onTableChange = async (page) => {
        await this.setState({
            pagination: page
        })
        this.getUserList(page.current, page.pageSize);
    }

    //修改用户状态
    onChange = async (text, record) => {

        Modal.confirm({
            title: '提示',
            okText: '确定',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            content: '您确定修改用户状态吗？',
            onOk: async () => {
                if (record.enabled === 0) {
                    record.enabled = 1
                } else {
                    record.enabled = 0
                }
                const result = await reqUserStatusEdit(record);
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
        this.setState({
            showStatus: 2
        })
    }

    //添加验证
    handleOk = () => {
        const ref = this.addChild.current.addRef.current;
        ref.validateFields()
            .then(values => {
                ref.resetFields();
                this.addUser(values);
                this.setState({ showStatus: 0 });
            })
            .catch(errorInfo => {
                console.log(errorInfo)
            });
    }

    //添加方法
    addUser = async (data) => {
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


    //编辑验证
    handleEdit = () => {
        const ref = this.editChild.current.editRef.current;
        ref.validateFields()
            .then(values => {
                ref.resetFields();
                this.editUser(values);
                this.setState({ showStatus: 0 });
            })
            .catch(errorInfo => {
                console.log(errorInfo)
            });
    }

    //编辑信息
    editUser = async (data) => {
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
        const { userList, showStatus, selectedRowKeys, pagination } = this.state;

        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => this.setState({ selectedRowKeys })
        }

        return (
            <Card>
                <Form
                    ref={this.formRef}
                    style={{ marginBottom: 16 }}
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <FormItem name="name" label="用户姓名">
                                <Input placeholder="请输入账号" />
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem name="tel" label="手机号码" >
                                <Input placeholder="请输入手机号码" />
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem name="enabled" label="启用状态">
                                <Select placeholder="请选择">
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
                    dataSource={userList}
                    pagination={pagination}
                    onChange={this.onTableChange}
                    style={{ marginTop: 10 }} />
                <Modal visible={showStatus === 1} title="添加用户" okText='确定'
                    cancelText='取消' onOk={this.handleOk} onCancel={this.handleCancel} >
                    <UserAdd ref={this.addChild}></UserAdd>
                </Modal>
                <Modal visible={showStatus === 2} title="编辑用户" okText='确定'
                    cancelText='取消' onOk={this.handleEdit} onCancel={this.handleCancel} >
                    <UserEdit ref={this.editChild} userData={editData}></UserEdit>
                </Modal>
            </Card >
        );
    }
}

export default User;