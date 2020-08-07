import React, { Component } from 'react';
import { Card, Button, Table } from 'antd'

import { reqRoleList } from '../../../api/api.js'

class Role extends Component {

    state = {
        roleList: []
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '排序码',
                dataIndex: 'sort',
            },
            {
                title: '启用状态',
                dataIndex: 'enabled',
            },
            {
                title: '创建时间',
                dataIndex: 'gmtCreate',
            }
        ]
    }

    getRoleList = async () => {
        const result = await reqRoleList();
        if (result.code === 200) {
            const data = result.data.records;
            this.setState({ roleList: data })
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
        this.getRoleList();
    }

    render() {

        const { roleList } = this.state;
        const title = (
            <span>
                <Button type="primary">新增</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    rowKey="id"
                    rowSelection={{ type: "checkout" }}
                    columns={this.columns}
                    onRow={this.onRow}
                    dataSource={roleList} />
            </Card>
        );
    }
}

export default Role;