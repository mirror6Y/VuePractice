import React from 'react'
import { Modal, Button } from 'antd'
/*
 
 */
class UserDeatil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

        this.handlePopup = this.handlePopup.bind(this);
        this.handleOkOrCancel = this.handleOkOrCancel.bind(this);
    }

    handlePopup() {
        this.setState({
            visible: true
        });
    }

    handleOkOrCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                <Button size="smallButton" onClick={this.handlePopup}>详情</Button>
                <Modal title={this.props.pass.name} visible={this.state.visible}
                    onOk={this.handleOkOrCancel} onCancel={this.handleOkOrCancel}>
                    <p>账号：   {this.props.pass.account}</p>
                    <p>姓名：   {this.props.pass.name}</p>
                    <p>性别：    {this.props.pass.gender}</p>
                    <p>联系方式：      {this.props.pass.tel}</p>
                    <p>电子邮箱：   {this.props.pass.email}</p>
                </Modal>
            </div>
        )
    }

}

export default UserDeatil;