import React from 'react';
import { Form, Input, Button, Select, Modal, Radio } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class UserAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleOk = this.handleOk.bind(this)
        // this.handleClear = this.handleClear.bind(this)
    }

    handleAdd() {
        this.setState({
            visible: true
        });
    }

    //提交表单
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // //console.log('接收的值：',values);
                // this.setState({
                //     visible: false
                // })
                // this.props.form.resetFields();//清空提交的表单
                // //当值传递到父元素后，通过回调函数触发appendPerson方法将参数values带到父元素
                // this.props.callback(values);

                this.props.parent.getUserMsg(this, this.state.msg)
            }
        })
    }


    handleOk = () => {
        this.setState({ loading: true });

        // this.props
        var data = this.props.form.getFieldsValue;
console.log(data)
        this.props.parent.getUserMsg(this, data)
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {


        const { visible, loading } = this.state;


        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };

        return (
            <div>
                <Button type="primary" onClick={this.handleAdd}>添加</Button>

                <Modal visible={this.state.visible} title="添加用户" onCancel={this.handleOk} onOk={this.handleSubmit} footer={[
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>Submit</Button>,
                    <Button key="back" onClick={this.handleCancel}>Return</Button>,
                ]}>

                    <Form onSubmit={this.handleSubmit}>

                        <FormItem {...formItemLayout} name="account" label="账号" rules={[
                            {
                                required: true,
                                message: '请输入账号',
                            },
                        ]} >
                            <Input placeholder="请输入账号" />
                        </FormItem>

                        <FormItem {...formItemLayout} name="name" label="姓名" rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            },
                        ]} >
                            <Input placeholder="请输入姓名" />
                        </FormItem>

                        <FormItem {...formItemLayout} name="gender" label="性别">
                            <Radio.Group>
                                <Radio value="1">男</Radio>
                                <Radio value="0">女</Radio>
                            </Radio.Group>
                        </FormItem>

                        <FormItem {...formItemLayout} name="tel" label="手机号码" >
                            <Input placeholder="请输入手机号码" />
                        </FormItem>

                        <FormItem {...formItemLayout} name="email" label="电子邮箱" >
                            <Input placeholder="请输入电子邮箱" />
                        </FormItem>

                        <FormItem {...formItemLayout} name="select" label="角色" hasFeedback
                            rules={[{ required: true, message: '请选择角色!' }]}
                        >
                            <Select placeholder="请选择角色">
                                <Option value="1">普通用户</Option>
                                <Option value="2">管理员</Option>
                            </Select>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UserAdd;