import React, { Component } from 'react';
import { Form, Row, Col, Select, Input, Button, DatePicker, Space } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;
class UserSearch extends Component {

    searchRef = React.createRef();

    render() {

        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        return (
            <Form
                onFinish={onFinish}
                ref={this.searchRef}
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

                    {/* <Col span={4}>
                        <FormItem name="dept" label="部门">
                            <Select >
                                <Option value="0">信息部</Option>
                                <Option value="1">行政部</Option>
                            </Select>
                        </FormItem>
                    </Col> */}

                    <Col span={5}>
                        <FormItem name="roleIds" label="启用状态">
                            <Select >
                                <Option value="0">启用</Option>
                                <Option value="1">禁用</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem name="" label="创建时间" >
                            <RangePicker />
                        </FormItem>
                    </Col>

                    <Col
                        span={24}
                    // style={{
                    //     textAlign: 'right',
                    // }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button onClick={() => { }}>重置 </Button>
                        </Space>


                    </Col>
                </Row>
            </Form>
        );
    }
}

export default UserSearch;