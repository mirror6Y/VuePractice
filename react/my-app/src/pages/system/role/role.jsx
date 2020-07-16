import React, { Component } from 'react';
import { Card, Button, Table } from 'antd'

import { reqRoleList } from '../../../api/api.js'

class Role extends Component {

    state = {
        roleList: [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ]
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '描述',
                dataIndex: 'age',
            },
            {
                title: '排序码',
                dataIndex: 'address',
            },
            {
                title: '启用状态',
                dataIndex: 'age',
            },
            {
                title: '创建时间',
                dataIndex: 'address',
            }
        ]
    }

    getRoleList = async () => {
        const result = await reqRoleList();
        if (result.state === 200) {
            const data = result.data;
            this.setState({ data })
        }
    }

    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role);
            }
        }
    }

    componentWillMount() {
        this.initColumn();
    }

    componentDidMount() {
        // this.getRoleList();
    }

    render() {

        const { roleList } = this.state;
        const title = (
            <span>
                <Button type="primary">新增</Button>
            </span>
        )

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ];

        return (
            <Card title={title}>
                <Table
                    rowSelection={{ type: "checkout" }}
                    columns={this.columns}
                    onRow={this.onRow}
                    dataSource={roleList} />
            </Card>
        );
    }
}

export default Role;