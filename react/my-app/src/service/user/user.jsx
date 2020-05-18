import React, { Component } from 'react';
import { Table, Button, Input, Popconfirm } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoaded: false

        };

        this.onDelete = this.onDelete.bind(this);
        this.appendPerson = this.appendPerson.bind(this);
        this.handleSelectedDelete = this.handleSelectedDelete.bind(this);

        this.columns = [
            { title: '账号', dataIndex: 'account', key: 'account', width: '8%' },
            { title: '姓名', dataIndex: 'name', key: 'name', width: '15%' },
            { title: '性别', dataIndex: 'gender', key: 'gender', width: '10%' },
            { title: '手机号码', dataIndex: 'tel', key: 'tel', width: '15%', },
            { title: '电子邮箱', dataIndex: 'email', key: 'email', width: '15%' },
            { title: '是否启用', dataIndex: 'enabled', key: 'enabled', width: '20%' },
            {
                title: '操作', dataIndex: '', key: 'operation', width: '32%', render: (text, record, index) => (
                    <span>
                        <Popconfirm title="删除不可恢复，你确定要删除吗?" >
                            <a title="用户删除" className="mgl10" onClick={this.onDelete.bind(this, index)}>
                                <SmileOutlined /></a>


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
                console.log(response.data.data.records)

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

    onDelete(index) {
        console.log(index)
        const users = [...this.state.users];
        users.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
        this.setState({ users });
    }

    handleSelectedDelete() {
        if (this.state.selectedRowKeys.length > 0) {
            console.log(...this.state.selectedRowKeys)
            const users = [...this.state.users]
            users.splice(this.state.selectedRows, this.state.selectedRows.length)
            this.setState({ users });
        }
        else {

        }
    }

    render() {
        return (

            <div >
                {/* <div id="div_left"></div>
                <div id="div-right"> */}
                {/* <div className="table_oftop">
                        <Button type="primary" icon="search" style={{ float: "right", marginLeft: 10 }}>查询</Button>
                        <Input placeholder="input search text" style={{ width: 300, float: "right" }} />
                        <div id="add_delete">
                            <Button type="primary" className="selectedDelete" onClick={this.handleSelectedDelete}>删除所选</Button>
                        </div>
                    </div> */}
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加
                    </Button>
                <Table columns={this.columns}
                    dataSource={this.state.users}
                />

                {/* </div> */}
            </div>

        );
    }
}

export default User;