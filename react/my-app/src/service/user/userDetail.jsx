import React from 'react'
import { Modal } from 'antd'

class UserDeatil extends React.Component {

    state = {}

    handleOkOrCancel() {
        this.props.toggleVisible(false)
    }

    render() {

        return (
            <div>
                <Modal title="详情" visible={this.props.visible}
                    onOk={this.props.onCancel} onCancel={this.props.onCancel}>
                    <p>账号：   {this.props.userInfo.account}</p>
                    <p>姓名：   {this.props.userInfo.name}</p>
                    <p>性别：    {this.props.userInfo.gender}</p>
                    <p>角色：    </p>
                    <p>手机号码：      {this.props.userInfo.tel}</p>
                    <p>电子邮箱：   {this.props.userInfo.email}</p>
                    <p>所在部门：   </p>
                </Modal>
            </div>
        )

    }

}

export default UserDeatil;