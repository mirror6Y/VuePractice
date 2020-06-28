import ajax from './ajax'

// export function reqLogin(username, password) {
//     ajax('/login', { username, password }, 'GET');
// },

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'GET');