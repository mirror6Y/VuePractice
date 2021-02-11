import ajax from './ajax'
import jsonp from 'jsonp'

//登录
export const reqLogin = (username, password) => ajax('/api/login', { username, password }, 'GET');

//天气
export const reqWeather = (cityCode) => {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=5b7a9d03558f93310350bc0849f3488f`;
        jsonp(url, {}, (error, data) => {
            if (!error && data.status === "1" && data.lives.length > 0) {
                const { weather, reporttime } = data.lives[0];
                resolve({ weather, reporttime })
            } else {
                console.log("获取天气信息失败")
            }
        })
    })


}

// 用户列表
export const reqUserList=(data)=>ajax('/api/system/user/getUserPage', data,'GET')

//添加用户
export const reqUserAdd=(data)=>ajax('/api/system/user/addUser', data,'POST')

//删除用户
export const reqUserDelete=(data)=>ajax('/api/system/user/deleteUser',data,'DELETE')

//编辑用户
export const reqUserEdit=(data)=>ajax('/api/system/user/updateUser', data,'PUT')

//编辑用户状态
export const reqUserStatusEdit=(data)=>ajax('/api/system/user/updateStatus', data,'PUT')

//--------------------------角色模块--------------------------------------------

// 角色列表(添加用户时使用)
export const reqRoleList=()=>ajax('/api/system/role/getRoleList', null,'GET')

//添加角色
export const reqRoleAdd=(data)=>ajax('/api/system/role/addRole', data,'POST')