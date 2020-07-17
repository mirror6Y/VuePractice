import ajax from './ajax'
import jsonp from 'jsonp'

// export function reqLogin(username, password) {
//     ajax('/login', { username, password }, 'GET');
// },

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'GET');

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
export const reqUserList=()=>ajax('/system/user/getUserList', null,'GET')

//添加用户
export const reqUserAdd=(data)=>ajax('/system/user/addUser', {data},'POST')


// 角色列表
export const reqRoleList=()=>ajax('/system/role/getRoleList', null,'GET')