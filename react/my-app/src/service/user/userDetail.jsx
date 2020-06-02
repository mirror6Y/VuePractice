import React from 'react'
import { Modal, Button } from 'antd'
/*
 
 */
class UserDeatil extends React.Component {

    state = {}

    handleOkOrCancel() {
        this.props.toggleVisible(false)

    }

    render() {
        // const { visible } = this.props;
console.log(this.props);
        return (
            <div>
                {/* <Button size="smallButton" onClick={this.handlePopup}>详情</Button> */}
                <Modal title="详情" visible={this.props.visible}
                    onOk={this.props.onCancel} onCancel={this.props.onCancel}>
                    <p>账号：   {this.props.userInfo.account}</p>
                    <p>姓名：   {this.props.userInfo.name}</p>
                    <p>性别：    {this.props.userInfo.gender}</p>
                    <p>联系方式：      {this.props.userInfo.tel}</p>
                    <p>电子邮箱：   {this.props.userInfo.eamil}</p>
                </Modal>
            </div>
        )
    }

}

export default UserDeatil;