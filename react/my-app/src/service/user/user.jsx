import React, { Component } from 'react';
import { Table,Button,Input,Popconfirm } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {

            dataSource: [
                { key: 1, nid: 1, name: 'tab', gender: '男', age: 22, schoolname: '第1中学', description: '热爱班级活动，尊敬老师' },
                { key: 2, nid: 2, name: 'shift', gender: '男', age: 22, schoolname: '第2中学', description: '热爱班级活动，尊敬老师' },
                { key: 6, nid: 6, name: 'ctrl', gender: '男', age: 22, schoolname: '第3中学', description: '热爱班级活动，尊敬老师' },
                { key: 4, nid: 4, name: 'caps lock', gender: '男', age: 22, schoolname: '第4中学', description: '热爱班级活动，尊敬老师' },
                { key: 5, nid: 5, name: 'enter', gender: '女', age: 22, schoolname: '第5中学', description: '热爱班级活动，尊敬老师' }
            ],
            index: '',
            PersonCount: 0,
            selectedRowKeys: [],
            selectedRows: [],
            record: 'abc'

        };

        this.onDelete = this.onDelete.bind(this);
        this.appendPerson = this.appendPerson.bind(this);
        this.handleSelectedDelete = this.handleSelectedDelete.bind(this);

        this.columns = [
            { title: '编号', dataIndex: 'nid', key: 'nid', width: '8%' },
            { title: '姓名', dataIndex: 'name', key: 'name', width: '15%' },
            { title: '性别', dataIndex: 'gender', key: 'gender', width: '10%' },
            { title: '年龄', dataIndex: 'age', key: 'age', width: '15%', },
            { title: '学校', dataIndex: 'schoolname', key: 'schoolname', width: '15%' },
            { title: '在校表现', dataIndex: 'description', key: 'description', width: '20%' },
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

    //得到子元素传过来的值
    appendPerson(event) {
        let array = [];
        let count = 0;
        this.state.dataSource.forEach(function (element) {
            Object.keys(element).some(function (key) {
                if (key === 'nid') {
                    count++;
                    array[count] = element.nid
                }
            })
        })
        let sortData = array.sort();//对遍历得到的数组进行排序
        let MaxData = sortData[(this.state.dataSource.length) - 1]//取最后一位下标的值
        event.key = MaxData + 1;
        event.nid = MaxData + 1;
        this.setState({
            dataSource: [...this.state.dataSource, event]
        })

    }

    onDelete(index) {
        console.log(index)
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
        this.setState({ dataSource });
    }

    handleSelectedDelete() {
        if (this.state.selectedRowKeys.length > 0) {
            console.log(...this.state.selectedRowKeys)
            const dataSource = [...this.state.dataSource]
            dataSource.splice(this.state.selectedRows, this.state.selectedRows.length)
            this.setState({ dataSource });
        }
        else {

        }
    }

    render() {
        return (

            <div className="div_body">
                <div id="div_left"></div>
                <div id="div-right">
                    <div className="table_oftop">
                        <Button type="primary" icon="search" style={{ float: "right", marginLeft: 10 }}>查询</Button>
                        <Input placeholder="input search text" style={{ width: 300, float: "right" }} />
                        <div id="add_delete">
                            <Button type="primary" className="selectedDelete" onClick={this.handleSelectedDelete}>删除所选</Button>
                        </div>
                    </div>
                    <Table columns={this.columns}
                        dataSource={this.state.dataSource}
                        className="table"
                        // rowSelection={rowSelection}
                        scroll={{ y: 400 }} />

                </div>
            </div>

        );
    }
}

export default User;