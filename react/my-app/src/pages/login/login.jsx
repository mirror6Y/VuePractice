import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import Login from './login'
import './login.less';
import logo from './images/log.jpg';
import { reqLogin } from '../../api/api'


class login extends Component {

    formRef = React.createRef();

    onFinish = async values => {
        console.log(values);
        const { username, password } = values;
        // try {
        // const response = await reqLogin(username, password);
        // const result = response.data;
        // if (result.status === 200) {
        //     message.success("登录成功");
        //     this.props.history.replace('/');
        // }else{
        //     message.error("登录失败");
        // }
        this.props.history.replace('/');

    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {


        return (
            <div className="login">
                <header className="login-header">
                    <h1>CityMis</h1>
                    <img src={logo} alt="logo"></img>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号!'
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!'
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">忘记密码</a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

export default login;