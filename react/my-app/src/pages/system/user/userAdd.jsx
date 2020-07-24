import React, { Component } from 'react';
import { Form, Input,  Radio , Checkbox, Row, Col} from 'antd'
const FormItem = Form.Item;
// const Option = Select.Option;

class UserAdd extends Component {

    addRef = React.createRef();

    render() {

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };

        return (

            <Form {...formItemLayout} ref={this.addRef}  >

                <FormItem name="account" label="账号" rules={[
                    {
                        required: true,
                        message: '请输入账号',
                    },
                ]} >
                    <Input placeholder="请输入账号" />
                </FormItem>

                <FormItem name="name" label="姓名" rules={[
                    {
                        required: true,
                        message: '请输入姓名',
                    },
                ]} >
                    <Input placeholder="请输入姓名" />
                </FormItem>

                <FormItem name="gender" label="性别">
                    <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="0">女</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem name="tel" label="手机号码" >
                    <Input placeholder="请输入手机号码" />
                </FormItem>

                <FormItem name="email" label="电子邮箱" >
                    <Input placeholder="请输入电子邮箱" />
                </FormItem>

                <Form.Item name="roleIds" label="角色">
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}>
                                <Checkbox
                                    value="1"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    普通角色
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="2"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    学生管理员
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="3"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    教师管理员
                                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

            </Form>
        );
    }
}

export default UserAdd;